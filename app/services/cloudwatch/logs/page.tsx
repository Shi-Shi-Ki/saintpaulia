import { LogGroupList } from "~/app/actions/services/cloudwatch/logs/groups"
import PollingProcessing from "~/component/organism/PollingProcessing"
import LogGroupTableContainer from "./LogGroupTableContainer"
import { CloudwatchLogsGroups } from "~/app/actions/services/cloudwatch/logs/schema"
import { buildBreadcrumbs } from "~/lib/config/route-schema"
import BreadcrumbSetter from "~/component/atoms/BreadcrumbSetter"

export default async function CloudwatchLogsLogGroupPage() {
  let initialData: CloudwatchLogsGroups | undefined = undefined
  try {
    initialData = await LogGroupList()
  } catch (error) {
    console.error(error)
  }

  const currentCrumbs = buildBreadcrumbs("CLOUDWATCH_LOGS")

  return (
    <div>
      <BreadcrumbSetter crumbs={currentCrumbs} />
      <PollingProcessing<CloudwatchLogsGroups>
        initialData={initialData}
        pollingKey="cloudwatch-logs-groups"
        pollingFunction={LogGroupList}
        Component={LogGroupTableContainer}
      />
    </div>
  )
}
