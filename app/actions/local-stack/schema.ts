import { z } from "zod"

const statusType = ["running", "available", "disabled"] as const
export type statusTypes = keyof typeof statusType

export const OriginalLocalStackStatusSchema = z.object({
  services: z.record(z.string(), z.enum(statusType)),
  edition: z.string(),
  version: z.string(),
})
export type OriginalLocalStackStatus = z.infer<typeof OriginalLocalStackStatusSchema>

export const LocalStackStatusDetailSchema = z.object({
  status: z.enum(statusType),
  image: z.string(),
})
export type LocalStackStatusDetail = z.infer<typeof LocalStackStatusDetailSchema>

export const LocalStackStatusSchema = z.object({
  // services: z.record(z.string(), z.object(LocalStackStatusDetailSchema)),
  services: z.record(
    z.string(),
    z.object({
      status: z.enum(statusType),
      image: z.string(),
    })
  ),
  edition: z.string(),
  version: z.string(),
})
export type LocalStackStatus = z.infer<typeof LocalStackStatusSchema>
