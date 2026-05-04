import { z } from "zod"

export const CloudwatchLogsStreamSchema = z.object({
  name: z.string(),
  creationTime: z.number(),
  firstEventTimestamp: z.number(),
  lastEventTimestamp: z.number(),
  lastIngestionTime: z.number(),
  uploadSequenceToken: z.string(),
  logGroupArn: z.string(),
  logGroupName: z.string(),
})
export type CloudwatchLogsStream = z.infer<typeof CloudwatchLogsStreamSchema>

export const CloudwatchLogsStreamsSchema = CloudwatchLogsStreamSchema.array()
export type CloudwatchLogsStreams = z.infer<typeof CloudwatchLogsStreamsSchema>
