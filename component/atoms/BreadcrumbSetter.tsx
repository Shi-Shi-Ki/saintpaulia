"use client"

import { useEffect } from "react"
import { BreadcrumbItem, useBreadcrumbStore } from "@lib/store/breadcrumbs"

export default function BreadcrumbSetter({ crumbs }: { crumbs: BreadcrumbItem[] }) {
  const setCrumbs = useBreadcrumbStore((state) => state.setCrumbs)

  const serializedCrumbs = JSON.stringify(crumbs)
  // このページが開かれた瞬間に、ストアのパンくずを全上書きする
  // ブラウザバックで戻ってきた時も再度これが実行される
  useEffect(() => {
    // 文字列から配列に戻してセットする
    setCrumbs(JSON.parse(serializedCrumbs))
  }, [serializedCrumbs, setCrumbs])

  return null
}
