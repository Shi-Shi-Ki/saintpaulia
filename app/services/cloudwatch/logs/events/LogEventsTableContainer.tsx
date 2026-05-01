"use client"

import React, { useMemo } from "react"
import {
  CloudwatchLogsEvent,
  CloudwatchLogsEvents,
} from "~/app/actions/services/cloudwatch/logs/events/schema"
import Table, { ITableColumnDef } from "~/component/atoms/Table"
import { PollingChildProps } from "~/component/organism/PollingProcessing"
import { timezoneSchema } from "~/lib/timezone"
import { convertJsDateToFormatDateString } from "~/lib/utils"

const formatLogMessage = (message: string) => {
  try {
    const parsed = JSON.parse(message)
    return JSON.stringify(parsed, null, 2)
  } catch {
    return message
  }
}

export default function LogEventsTableContainer({ data }: PollingChildProps<CloudwatchLogsEvents>) {
  const dataRows = useMemo<ITableColumnDef<CloudwatchLogsEvent>[]>(
    () => [
      {
        header: "message",
        accessor: (row) => (
          <div className="collapse collapse-arrow bg-base-100 border border-base-200 rounded-box shadow-sm max-w-3xl xl:max-w-5xl">
            <input type="checkbox" />
            <div className="collapse-title text-sm font-mono truncate">{row.message}</div>
            <div className="collapse-content bg-base-200/50 border-t border-base-200">
              <pre className="p-4 text-xs overflow-x-auto whitespace-pre-wrap break-all text-base-content/80 font-mono mt-2 rounded-xl bg-base-300">
                <code>{formatLogMessage(row.message)}</code>
              </pre>
            </div>
          </div>
        ),
      },
      {
        header: "ingestionTime",
        accessor: (row) => (
          <span className="whitespace-nowrap">
            {convertJsDateToFormatDateString(
              new Date(row.ingestionTime),
              "yyyy-MM-dd HH:ii:ss",
              timezoneSchema.parse("Asia/Tokyo") // todo
            )}
          </span>
        ),
      },
      {
        header: "timeStamp",
        accessor: (row) => (
          <span className="whitespace-nowrap">
            {convertJsDateToFormatDateString(
              new Date(row.timeStamp),
              "yyyy-MM-dd HH:ii:ss",
              timezoneSchema.parse("Asia/Tokyo") // todo
            )}
          </span>
        ), // todo
      },
    ],
    []
  )

  return (
    <Table<CloudwatchLogsEvent>
      columns={dataRows}
      data={data}
      wrapperClassName="max-h-[calc(100vh-50px)] rounded-box border border-base-300"
    />
  )
}
