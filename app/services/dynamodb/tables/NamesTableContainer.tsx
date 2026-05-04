"use client"

import { useMemo } from "react"
import { DynamoDbTable, DynamoDbTables } from "~/app/actions/services/dynamodb/tables/schema"
import Table, { ITableColumnDef } from "~/component/atoms/Table"
import { PollingChildProps } from "~/component/organism/PollingProcessing"

export default function NamesTableContainer({ data }: PollingChildProps<DynamoDbTables>) {
  const dataRows = useMemo<ITableColumnDef<DynamoDbTable>[]>(
    () => [
      { header: "テーブル名", accessor: (row) => row.name },
      { header: "ステータス", accessor: (row) => row.status },
      { header: "プライマリーキー", accessor: (row) => row.primaryKey },
      { header: "ソートキー", accessor: (row) => row.sortKey },
      {
        header: "グローバルセカンダリーインデックス",
        accessor: (row) => JSON.stringify(row.globalSecondaryIndexes, null, 2),
      },
      {
        header: "読み込みキャパシティ",
        accessor: (row) => row.provisionedThroughput.readCapacityUnits,
      },
      {
        header: "書き込みキャパシティ",
        accessor: (row) => row.provisionedThroughput.writeCapacityUnits,
      },
      { header: "arn", accessor: (row) => row.tableArn },
    ],
    []
  )

  return <Table<DynamoDbTable> columns={dataRows} data={data} />
}
