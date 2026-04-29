import React from "react"
import { logGroupList } from "~/app/actions/services/cloudwatch/logs/groups"
import PollingProcessing from "~/component/organism/PollingProcessing"
import LogGroupTableContainer from "./LogGroupTableContainer"
import { CloudwatchLogsGroups } from "~/app/actions/services/cloudwatch/logs/schema"

export default async function CloudwatchLogsLogGroupPage() {
  let initialData: CloudwatchLogsGroups | undefined = undefined
  try {
    initialData = await logGroupList()
  } catch (error) {
    console.error(error)
  }

  return (
    <div>
      <PollingProcessing<CloudwatchLogsGroups>
        initialData={initialData}
        pollingKey="localstack-status"
        pollingFunction={logGroupList}
        Component={LogGroupTableContainer}
      />
    </div>
  )
}
