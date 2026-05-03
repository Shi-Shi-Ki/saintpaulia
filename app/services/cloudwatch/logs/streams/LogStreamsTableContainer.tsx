"use client"

import Link from "next/link"
import { useMemo } from "react"
import {
  CloudwatchLogsStream,
  CloudwatchLogsStreams,
} from "~/app/actions/services/cloudwatch/logs/streams/schema"
import Table, { ITableColumnDef } from "~/component/atoms/Table"
import { PollingChildProps } from "~/component/organism/PollingProcessing"
import { timezoneSchema } from "~/lib/timezone"
import { convertJsDateToFormatDateString } from "~/lib/utils"

export default function LogStreamsTableContainer({
  data,
}: PollingChildProps<CloudwatchLogsStreams>) {
  const dataRows = useMemo<ITableColumnDef<CloudwatchLogsStream>[]>(
    () => [
      {
        header: "ストリーム名",
        accessor: (row) => {
          const encodedGroupName = encodeURIComponent(row.logGroupName)
          const encodedStreamName = encodeURIComponent(row.name)
          const href = `/services/cloudwatch/logs/events?logGroup=${encodedGroupName}&logStream=${encodedStreamName}`
          return (
            <Link href={href} className="link link-primary font-bold hover:text-primary-focus">
              {row.name}
            </Link>
          )
        },
      },
      {
        header: "作成時間",
        accessor: (row) => {
          if (!row.creationTime) {
            return "" // todo async/awaitしないといけない??
          }
          return convertJsDateToFormatDateString(
            new Date(row.creationTime),
            "yyyy-MM-dd HH:ii:ss",
            timezoneSchema.parse("Asia/Tokyo") // todo
          )
        },
      },
      { header: "最初のイベントのタイムスタンプ", accessor: (row) => row.firstEventTimestamp },
      { header: "最後のイベントのタイムスタンプ", accessor: (row) => row.lastEventTimestamp },
      { header: "最終取得時間", accessor: (row) => row.lastIngestionTime },
      { header: "アップロードした時間", accessor: (row) => row.uploadSequenceToken },
      { header: "arn", accessor: (row) => row.logGroupArn },
    ],
    []
  )

  return <Table<CloudwatchLogsStream> columns={dataRows} data={data} />
}
