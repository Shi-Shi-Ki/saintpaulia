import { z } from "zod"

export const CloudwatchLogsEventSchema = z.object({
  ingestionTime: z.number(),
  message: z.string(),
  timeStamp: z.number(),
})
export type CloudwatchLogsEvent = z.infer<typeof CloudwatchLogsEventSchema>

export const CloudwatchLogsEventsSchema = CloudwatchLogsEventSchema.array()
export type CloudwatchLogsEvents = z.infer<typeof CloudwatchLogsEventsSchema>
