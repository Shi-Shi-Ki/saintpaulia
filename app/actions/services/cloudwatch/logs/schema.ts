import { DataProtectionStatus, LogGroupClass } from "@aws-sdk/client-cloudwatch-logs"
import { z } from "zod"

export const CloudwatchLogsGroupSchema = z.object({
  name: z.string(),
  class: z.enum(LogGroupClass),
  deletionProtection: z.boolean(),
  bearerTokenAuthentication: z.boolean(),
  dataProtectionStatus: z.enum(DataProtectionStatus),
  retentionInDays: z.number(),
  logGroupArn: z.string(),
})
export type CloudwatchLogsGroup = z.infer<typeof CloudwatchLogsGroupSchema>

export const CloudwatchLogsGroupsSchema = CloudwatchLogsGroupSchema.array()
export type CloudwatchLogsGroups = z.infer<typeof CloudwatchLogsGroupsSchema>
