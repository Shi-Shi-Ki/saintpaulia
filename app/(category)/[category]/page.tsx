"use client"

import { useParams } from "next/navigation"

export default function CategoryPage() {
  const params = useParams()
  return (
    <div>
      <p>category page. [{params.category}]</p>
    </div>
  )
}
