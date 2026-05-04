import { BreadcrumbItem } from "@lib/store/breadcrumbs"

interface RouteDefinition {
  id: string
  parentId?: string
  baseLabel: string
  basePath: string
  queryKeys?: string[] // この階層のURLを作るのに必要なクエリキーのリスト
  labelSuffixKey?: string // ラベルの後ろにくっつける動的な値のキー
}

export const ROUTE_SCHEMA: Record<string, RouteDefinition> = {
  HOME: { id: "HOME", baseLabel: "Home", basePath: "/" },
  CLOUDWATCH_LOGS: {
    id: "CLOUDWATCH_LOGS",
    parentId: "HOME",
    baseLabel: "Log Groups",
    basePath: "/services/cloudwatch/logs",
  },
  CLOUDWATCH_STREAMS: {
    id: "CLOUDWATCH_STREAMS",
    parentId: "CLOUDWATCH_LOGS",
    baseLabel: "Streams",
    basePath: "/services/cloudwatch/logs/streams",
    queryKeys: ["logGroup"],
    labelSuffixKey: "logGroup",
  },
  CLOUDWATCH_EVENTS: {
    id: "CLOUDWATCH_EVENTS",
    parentId: "CLOUDWATCH_STREAMS",
    baseLabel: "Events",
    basePath: "/services/cloudwatch/logs/events",
    queryKeys: ["logGroup", "logStream"],
    labelSuffixKey: "logStream",
  },
  DYNAMODB_TABLES: {
    id: "DYNAMODB_TABLES",
    parentId: "HOME",
    baseLabel: "Log Groups",
    basePath: "/services/dynamodb/tables",
  },
}

export function buildBreadcrumbs(
  targetId: keyof typeof ROUTE_SCHEMA,
  rawParams?: Record<string, string | undefined>
): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = []
  let currentId: string | undefined = targetId

  while (currentId && ROUTE_SCHEMA[currentId]) {
    const route: RouteDefinition = ROUTE_SCHEMA[currentId]

    // ラベルの自動組み立て
    let label = route.baseLabel
    if (route.labelSuffixKey && rawParams?.[route.labelSuffixKey]) {
      label = `${label}: ${rawParams[route.labelSuffixKey]}`
    }

    // URLの自動組み立て（この階層が必要とするキーだけをrawParamsから抽出）
    let href = route.basePath
    if (route.queryKeys && rawParams) {
      const validQuery: Record<string, string> = {}
      route.queryKeys.forEach((key) => {
        if (rawParams[key]) validQuery[key] = rawParams[key]!
      })

      const queryString = new URLSearchParams(validQuery).toString()
      if (queryString) href = `${href}?${queryString}`
    }

    crumbs.unshift({ label, href })
    currentId = route.parentId
  }

  return crumbs
}
