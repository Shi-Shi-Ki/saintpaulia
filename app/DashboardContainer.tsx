"use client"

import { useMemo } from "react"
import { PollingChildProps } from "../component/organism/PollingProcessing"
import Card from "../component/molecules/Card"
import { LocalStackStatus } from "~/app/actions/local-stack/schema"
import Link from "next/link"

type ServiceStatus = "running" | "available" | "disabled"

export default function DashboardContainer({ data }: PollingChildProps<LocalStackStatus>) {
  const services = useMemo(() => {
    const groups: Record<
      string,
      { serviceName: string; status: ServiceStatus; imagePath: string; linkPath: string }[]
    > = {
      running: [],
      available: [],
      disabled: [],
    }

    Object.entries(data.services).forEach(([name, services]) => {
      if (services.status === "running") {
        groups.running.push({
          serviceName: name,
          status: services.status,
          imagePath: services.image,
          linkPath: services.link,
        })
      } else if (services.status === "available") {
        groups.available.push({
          serviceName: name,
          status: services.status,
          imagePath: services.image,
          linkPath: services.link,
        })
      } else if (services.status === "disabled") {
        groups.disabled.push({
          serviceName: name,
          status: services.status,
          imagePath: services.image,
          linkPath: services.link,
        })
      }
    })
    return groups
  }, [data])

  const groupOrder = ["running", "available", "disabled"]
  return (
    <div className="flex flex-col gap-12">
      {groupOrder.map((groupName) => {
        const service = services[groupName]
        if (service.length < 1) {
          return null
        }
        return (
          <section key={groupName}>
            <h1 className="text-xl font-bold mb-6 text-base-content/60 tracking-tight">
              {groupName}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.map(({ serviceName, status, imagePath, linkPath }) => {
                const displayName = serviceName.replace(/([A-Z])/g, " $1").trim()
                return (
                  <Link key={serviceName} href={linkPath}>
                    <Card
                      title={displayName.toLocaleUpperCase()}
                      status={status}
                      imagePath={imagePath}
                      key={serviceName}
                    />
                  </Link>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
