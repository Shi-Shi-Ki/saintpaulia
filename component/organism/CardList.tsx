"use client"

import { useMemo } from "react"
import { PollingChildProps } from "./PollingProcessing"
import Card from "../molecules/Card"
import { LocalStackStatus } from "~/app/actions/local-stack/schema"

type ServiceStatus = "running" | "available" | "disabled"

export default function CardList({
  data,
  error,
  isLoading,
  isValidating,
}: PollingChildProps<LocalStackStatus>) {
  const services = useMemo(() => {
    const groups: Record<
      string,
      { serviceName: string; status: ServiceStatus; imagePath: string }[]
    > = {
      running: [],
      available: [],
      disabled: [],
    }
    if (!data) {
      return groups
    }
    Object.entries(data.services).forEach(([name, services]) => {
      if (services.status === "running") {
        groups.running.push({
          serviceName: name,
          status: services.status,
          imagePath: services.image,
        })
      } else if (services.status === "available") {
        groups.available.push({
          serviceName: name,
          status: services.status,
          imagePath: services.image,
        })
      } else if (services.status === "disabled") {
        groups.disabled.push({
          serviceName: name,
          status: services.status,
          imagePath: services.image,
        })
      }
    })
    return groups
  }, [data])

  if (error) {
    return (
      <div>
        <p>error!!!</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <p>loading...</p>
      </div>
    )
  }

  const groupOrder = ["running", "available", "disabled"]
  return (
    <div className="flex flex-col gap-12">
      {isValidating && (
        <div className="fixed top-4 right-4 text-primary">
          <span className="loading loading-spinner loading-sm"></span>
        </div>
      )}
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
              {service.map(({ serviceName, status, imagePath }) => {
                const displayName = serviceName.replace(/([A-Z])/g, " $1").trim()
                return (
                  <Card
                    title={displayName.toLocaleUpperCase()}
                    status={status}
                    imagePath={imagePath}
                    key={serviceName}
                  />
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
