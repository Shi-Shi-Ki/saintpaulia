import { KeyType, TableStatus } from "@aws-sdk/client-dynamodb"
import { z } from "zod"

export const DynamoDbKeyDetailSchema = z.object({
  attributeName: z.string(),
  keyType: z.enum(KeyType),
})
export type DynamoDbKeyDetail = z.infer<typeof DynamoDbKeyDetailSchema>
export const DynamoDbKeyDetailsSchema = DynamoDbKeyDetailSchema.array()
export type DynamoDbKeyDetails = z.infer<typeof DynamoDbKeyDetailsSchema>

export const DynamoDbGlobalSecondaryIndexSchema = z.object({
  indexName: z.string(),
  keySchema: DynamoDbKeyDetailsSchema,
})
export type DynamoDbGlobalSecondaryIndex = z.infer<typeof DynamoDbGlobalSecondaryIndexSchema>
export const DynamoDbGlobalSecondaryIndexesSchema = DynamoDbGlobalSecondaryIndexSchema.array()
export type DynamoDbGlobalSecondaryIndexes = z.infer<typeof DynamoDbGlobalSecondaryIndexesSchema>

export const DynamoDbTableSchema = z.object({
  name: z.string(),
  status: z.enum(TableStatus),
  primaryKey: z.string(),
  sortKey: z.string(),
  globalSecondaryIndexes: DynamoDbGlobalSecondaryIndexesSchema,
  provisionedThroughput: z.object({
    readCapacityUnits: z.number(),
    writeCapacityUnits: z.number(),
  }),
  tableArn: z.string(),
})
export type DynamoDbTable = z.infer<typeof DynamoDbTableSchema>

export const DynamoDbTablesSchema = DynamoDbTableSchema.array()
export type DynamoDbTables = z.infer<typeof DynamoDbTablesSchema>
