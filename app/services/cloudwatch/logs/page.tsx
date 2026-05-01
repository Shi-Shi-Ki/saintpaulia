import { LogGroupList } from "~/app/actions/services/cloudwatch/logs/groups"
import PollingProcessing from "~/component/organism/PollingProcessing"
import LogGroupTableContainer from "./LogGroupTableContainer"
import { CloudwatchLogsGroups } from "~/app/actions/services/cloudwatch/logs/schema"

export default async function CloudwatchLogsLogGroupPage() {
  let initialData: CloudwatchLogsGroups | undefined = undefined
  try {
    initialData = await LogGroupList()
  } catch (error) {
    console.error(error)
  }

  return (
    <div>
      <PollingProcessing<CloudwatchLogsGroups>
        initialData={initialData}
        pollingKey="cloudwatch-logs-group"
        pollingFunction={LogGroupList}
        Component={LogGroupTableContainer}
      />
    </div>
  )
}
