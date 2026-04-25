"use client"

import useSWR from "swr"

export interface PollingChildProps<T> {
  data: T | undefined
  error: unknown
  isLoading: boolean // データのフェッチが開始され、まだキャッシュにデータがない（dataがundefined）状態でtrueとなる
  isValidating: boolean // いわゆるロード中のフラグ
}

interface IPollingProcessingProps<T> {
  initialData?: T
  pollingKey: string
  pollingFunction: () => Promise<T>
  refreshInterval?: number
  revalidateOnFocus?: boolean
  Component: React.ComponentType<PollingChildProps<T>>
}

export default function PollingProcessing<T>({
  initialData,
  pollingKey,
  pollingFunction,
  refreshInterval = 5000,
  revalidateOnFocus = true,
  Component,
}: IPollingProcessingProps<T>) {
  const { data, error, isLoading, isValidating } = useSWR<T>(pollingKey, pollingFunction, {
    fallbackData: initialData,
    refreshInterval: refreshInterval,
    revalidateOnFocus: revalidateOnFocus,
  })

  return <Component data={data} error={error} isLoading={isLoading} isValidating={isValidating} />
}
