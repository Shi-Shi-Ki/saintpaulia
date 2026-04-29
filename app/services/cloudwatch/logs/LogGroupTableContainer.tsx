"use client"

import React, { useMemo } from "react"
import { PollingChildProps } from "~/component/organism/PollingProcessing"
import Table, { ITableColumnDef } from "~/component/atoms/Table"
import {
  CloudwatchLogsGroup,
  CloudwatchLogsGroups,
} from "~/app/actions/services/cloudwatch/logs/schema"

export default function LogGroupTableContainer({
  data,
  error,
  isLoading,
  isValidating,
}: PollingChildProps<CloudwatchLogsGroups>) {
  const dataRows = useMemo<ITableColumnDef<CloudwatchLogsGroup>[]>(
    () => [
      { header: "ロググループ名", accessor: (row) => row.name },
      { header: "ログクラス", accessor: (row) => row.class },
      { header: "保持期間", accessor: (row) => row.retentionInDays },
      { header: "削除保護", accessor: (row) => row.deletionProtection },
      { header: "bearerトークン認証", accessor: (row) => row.bearerTokenAuthentication },
      { header: "データ保護", accessor: (row) => row.dataProtectionStatus },
      { header: "arn", accessor: (row) => row.logGroupArn },
    ],
    []
  )

  if (!data) {
    return (
      <div>
        <p>no data...</p>
      </div>
    )
  }

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

  return (
    <>
      {isValidating && (
        <div className="absolute -top-8 right-0 text-primary">
          <span className="loading loading-spinner loading-sm"></span>
        </div>
      )}
      <Table<CloudwatchLogsGroup> columns={dataRows} data={data} />
    </>
  )
}
