"use client"

import useSWR from "swr"

export interface PollingChildProps<T> {
  data: T
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

  if (error) {
    return (
      <>
        <p>error...</p>
      </>
    )
  }

  if (isLoading || !data) {
    return (
      <div className="flex justify-center p-12">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  return (
    <div>
      {isValidating && (
        <div className="absolute -top-8 right-0 text-primary z-10">
          <span className="loading loading-spinner loading-sm"></span>
        </div>
      )}
      <Component data={data} />
    </div>
  )
}
