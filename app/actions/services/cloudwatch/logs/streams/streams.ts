"use server"

import {
  CloudWatchLogsClient,
  DescribeLogStreamsCommand,
  DescribeLogStreamsCommandInput,
} from "@aws-sdk/client-cloudwatch-logs"
import { connection } from "@actions/services/common"
import { CloudwatchLogsStream, CloudwatchLogsStreamSchema } from "./schema"

export async function LogStreamList(commandParam: DescribeLogStreamsCommandInput) {
  const client = await connection(CloudWatchLogsClient)
  const command = new DescribeLogStreamsCommand(commandParam)
  try {
    const response = await client.send(command)
    if (!response.logStreams) {
      return []
    }
    const logStreams = response.logStreams.map((logStream): CloudwatchLogsStream => {
      const data = {
        name: logStream.logStreamName ?? "",
        creationTime: logStream.creationTime ?? 0,
        firstEventTimestamp: logStream.firstEventTimestamp ?? 0,
        lastEventTimestamp: logStream.lastEventTimestamp ?? 0,
        lastIngestionTime: logStream.lastIngestionTime ?? 0,
        uploadSequenceToken: logStream.uploadSequenceToken ?? "",
        logGroupArn: logStream.arn ?? "",
        logGroupName: commandParam.logGroupName ?? "",
      }
      return CloudwatchLogsStreamSchema.parse(data)
    })

    return logStreams
  } catch (e) {
    console.error(e)
    throw e
  }
}
