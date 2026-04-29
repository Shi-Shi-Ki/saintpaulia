"use client"

import { z } from "zod"
import { LocalStackStatusSchema } from "~/app/actions/local-stack/schema"
import Image from "next/image"

type ServiceData = z.infer<typeof LocalStackStatusSchema>["services"][string]
type ServiceStatus = ServiceData["status"]

interface ICard {
  title: string
  status: ServiceStatus
  // Image?: React.ReactNode
  imagePath: string
}

export default function Card({ title, status, imagePath }: ICard) {
  const statusMap: Record<ServiceStatus, { badge: string; dot: string; text: string }> = {
    running: { badge: "badge-success", dot: "bg-success", text: "running" },
    available: { badge: "badge-info", dot: "bg-info", text: "available" },
    disabled: { badge: "badge-neutral", dot: "bg-neutral-content", text: "disabled" },
  }
  const currentStatus = statusMap[status] || statusMap.disabled

  return (
    <div className="card bg-base-300 w-105 h-40 shadow-lg relative overflow-hidden flex-row items-center rounded-3xl p-0">
      <div className="flex-1 card-body p-8 z-10">
        <h2 className="card-title text-2xl font-extrabold tracking-tight text-base-content">
          {title}
        </h2>
        <div
          className={`badge ${currentStatus.badge} badge-ghost badge-lg gap-2.5 p-5 mt-3 rounded-full bg-base-content/5 border-none text-base-content`}
        >
          <div className={`status status-xs ${currentStatus.dot}`}></div>
          {currentStatus.text}
        </div>
      </div>
      <div className="absolute -right-6 -bottom-6 w-1/2 h-full overflow-hidden flex items-end justify-end z-0">
        {/* todo */}
        <Image
          className="opacity-15 rotate-12"
          src={imagePath}
          alt="logo"
          width={128}
          height={128}
          priority
        />
      </div>
    </div>
  )
}
