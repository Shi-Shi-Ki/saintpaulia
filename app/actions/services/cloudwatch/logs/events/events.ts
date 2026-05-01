"use server"

import { connection } from "@actions/services/common"
import {
  CloudWatchLogsClient,
  GetLogEventsCommand,
  GetLogEventsCommandInput,
} from "@aws-sdk/client-cloudwatch-logs"
import { CloudwatchLogsEvent, CloudwatchLogsEventSchema } from "./schema"

export default async function LogEventList(commandParam: GetLogEventsCommandInput) {
  const client = await connection(CloudWatchLogsClient)
  try {
    const command = new GetLogEventsCommand(commandParam)
    const response = await client.send(command)
    if (!response.events) {
      return []
    }
    const logEvents = response.events.map((event): CloudwatchLogsEvent => {
      const data = {
        ingestionTime: event.ingestionTime ?? 0,
        message: event.message ?? "",
        timeStamp: event.timestamp ?? 0,
      }
      return CloudwatchLogsEventSchema.parse(data)
    })

    return logEvents
  } catch (e) {
    console.error(e)
    throw e
  }
}
