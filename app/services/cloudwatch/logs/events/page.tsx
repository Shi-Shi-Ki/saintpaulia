import { GetLogEventsCommandInput } from "@aws-sdk/client-cloudwatch-logs"
import LogEventList from "~/app/actions/services/cloudwatch/logs/events/events"
import { CloudwatchLogsEvents } from "~/app/actions/services/cloudwatch/logs/events/schema"
import PollingProcessing from "~/component/organism/PollingProcessing"
import LogEventsTableContainer from "./LogEventsTableContainer"

interface PageProps {
  searchParams: {
    logGroup?: string
    logStream?: string
  }
}

export default async function page({ searchParams }: PageProps) {
  const query = await searchParams
  if (!query.logGroup || !query.logStream) {
    return (
      <div>
        <p>no log events.</p>
      </div>
    )
  }
  const logEventParam: GetLogEventsCommandInput = {
    logGroupName: query.logGroup,
    logStreamName: query.logStream,
  }

  let initialData: CloudwatchLogsEvents | undefined = undefined
  try {
    initialData = await LogEventList(logEventParam)
  } catch (error) {
    console.error(error)
  }

  return (
    <div>
      <PollingProcessing<CloudwatchLogsEvents>
        initialData={initialData}
        pollingKey="cloudwatch-logs-group"
        pollingFunction={LogEventList.bind(null, logEventParam)}
        Component={LogEventsTableContainer}
      />
    </div>
  )
}
