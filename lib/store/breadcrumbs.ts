import { create } from "zustand"

export type BreadcrumbItem = {
  label: string
  href: string
}

interface BreadcrumbState {
  crumbs: BreadcrumbItem[]
  setCrumbs: (crumbs: BreadcrumbItem[]) => void
}

export const useBreadcrumbStore = create<BreadcrumbState>((set) => ({
  crumbs: [],
  setCrumbs: (crumbs) => set({ crumbs }),
}))
