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
    const sortedEvents = response.events.sort((a, b) => {
      const timeA = a.timestamp ?? 0
      const timeB = b.timestamp ?? 0
      return timeB - timeA // 降順 (新しい順)
    })
    const logEvents = sortedEvents.map((event): CloudwatchLogsEvent => {
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
