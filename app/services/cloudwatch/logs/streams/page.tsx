import { CloudwatchLogsStreams } from "~/app/actions/services/cloudwatch/logs/streams/schema"
import { LogStreamList } from "~/app/actions/services/cloudwatch/logs/streams/streams"
import PollingProcessing from "~/component/organism/PollingProcessing"
import LogStreamsTableContainer from "./LogStreamsTableContainer"
import { DescribeLogStreamsCommandInput } from "@aws-sdk/client-cloudwatch-logs"
import { buildBreadcrumbs } from "~/lib/config/route-schema"
import BreadcrumbSetter from "~/component/atoms/BreadcrumbSetter"

interface PageProps {
  searchParams: {
    logGroup?: string
  }
}

export default async function CloudwatchLogsLogStreamPage({ searchParams }: PageProps) {
  const query = await searchParams
  if (!query.logGroup) {
    return (
      <div>
        <p>no set log group!</p>
      </div>
    )
  }
  const logStreamParam: DescribeLogStreamsCommandInput = {
    logGroupName: query.logGroup,
    orderBy: "LastEventTime",
  }

  let initialData: CloudwatchLogsStreams | undefined = undefined
  try {
    initialData = await LogStreamList(logStreamParam)
  } catch (error) {
    console.error(error)
  }

  const currentCrumbs = buildBreadcrumbs("CLOUDWATCH_STREAMS", query)

  return (
    <div>
      <BreadcrumbSetter crumbs={currentCrumbs} />
      <PollingProcessing<CloudwatchLogsStreams>
        initialData={initialData}
        pollingKey="cloudwatch-logs-streams"
        pollingFunction={LogStreamList.bind(null, logStreamParam)}
        Component={LogStreamsTableContainer}
      />
    </div>
  )
}
