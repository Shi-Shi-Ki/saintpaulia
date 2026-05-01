"use client"

import React, { useMemo } from "react"
import { PollingChildProps } from "~/component/organism/PollingProcessing"
import Table, { ITableColumnDef } from "~/component/atoms/Table"
import {
  CloudwatchLogsGroup,
  CloudwatchLogsGroups,
} from "~/app/actions/services/cloudwatch/logs/schema"
import Link from "next/link"

export default function LogGroupTableContainer({ data }: PollingChildProps<CloudwatchLogsGroups>) {
  const dataRows = useMemo<ITableColumnDef<CloudwatchLogsGroup>[]>(
    () => [
      {
        header: "ロググループ名",
        accessor: (row) => {
          const encodedGroupName = encodeURIComponent(row.name)
          const href = `/services/cloudwatch/logs/streams?logGroup=${encodedGroupName}`
          return (
            <Link href={href} className="link link-primary font-bold hover:text-primary-focus">
              {row.name}
            </Link>
          )
        },
      },
      { header: "ログクラス", accessor: (row) => row.class },
      { header: "保持期間", accessor: (row) => row.retentionInDays },
      { header: "削除保護", accessor: (row) => row.deletionProtection },
      { header: "bearerトークン認証", accessor: (row) => row.bearerTokenAuthentication },
      { header: "データ保護", accessor: (row) => row.dataProtectionStatus },
      { header: "arn", accessor: (row) => row.logGroupArn },
    ],
    []
  )

  return <Table<CloudwatchLogsGroup> columns={dataRows} data={data} />
}
