"use server"

import { CloudWatchLogsClient, DescribeLogGroupsCommand } from "@aws-sdk/client-cloudwatch-logs"
import { connectionInfo } from "../../common"
import { CloudwatchLogsGroup, CloudwatchLogsGroupsSchema } from "./schema"

async function connection() {
  return new CloudWatchLogsClient(await connectionInfo())
}

export async function logGroupList() {
  const client = await connection()
  const command = new DescribeLogGroupsCommand({})
  try {
    const response = await client.send(command)
    if (!response.logGroups) {
      return []
    }

    const logGroups = response.logGroups.map((logGroup): CloudwatchLogsGroup => {
      return {
        name: logGroup.logGroupName ?? "",
        class: logGroup.logGroupClass ?? "STANDARD",
        deletionProtection: logGroup.deletionProtectionEnabled ?? false,
        bearerTokenAuthentication: logGroup.bearerTokenAuthenticationEnabled ?? false,
        dataProtectionStatus: logGroup.dataProtectionStatus ?? "DISABLED",
        retentionInDays: logGroup.retentionInDays ?? 0,
        logGroupArn: logGroup.logGroupArn ?? "",
      }
    })

    return CloudwatchLogsGroupsSchema.parse(logGroups)
  } catch (e) {
    console.error("error:", e)
    throw e
  }
}
