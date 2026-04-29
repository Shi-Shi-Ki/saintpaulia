"use client"

import React from "react"

export interface ITableColumnDef<T> {
  header: string
  accessor: (row: T) => React.ReactNode
}

export interface ITable<T> {
  data: T[]
  columns: ITableColumnDef<T>[]
}

export default function Table<T>({ data, columns }: ITable<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            {columns.map((column, idx) => (
              <th key={idx}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data ? (
            data.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col, idx) => (
                  <td key={idx}>{col.accessor(row)}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>no data...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
