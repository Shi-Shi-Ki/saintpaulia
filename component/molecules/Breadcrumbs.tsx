"use client"

import Link from "next/link"
import { useBreadcrumbStore } from "@lib/store/breadcrumbs"

export default function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbStore((state) => state.crumbs)

  if (breadcrumbs.length <= 1) {
    return null
  }

  return (
    <div className="text-sm breadcrumbs px-6 py-2 bg-base-200/50 border-b border-base-300">
      <ul>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1
          return (
            <li key={crumb.href}>
              {isLast ? (
                <span className="font-bold text-base-content">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="text-primary hover:text-primary-focus">
                  {crumb.label}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
