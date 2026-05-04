"use server"

import { DynamoDBClient, ListTablesCommand, DescribeTableCommand } from "@aws-sdk/client-dynamodb"
import { connection } from "@actions/services/common"
import {
  DynamoDbGlobalSecondaryIndex,
  DynamoDbGlobalSecondaryIndexes,
  DynamoDbKeyDetail,
  DynamoDbTables,
  DynamoDbTablesSchema,
} from "./schema"

export async function DynamoDbTableList() {
  const client = await connection(DynamoDBClient)
  const command = new ListTablesCommand({})
  try {
    const response = await client.send(command)
    if (!response.TableNames) {
      return []
    }

    const dynamoDbTables: DynamoDbTables = []
    for (const tableName of response.TableNames) {
      const command = new DescribeTableCommand({ TableName: tableName })
      try {
        const response = await client.send(command)
        if (!response.Table) {
          continue
        }

        const tableDetail = response.Table

        let primaryKeys: (string | undefined)[] = []
        let sortKeys: (string | undefined)[] = []
        if (tableDetail.KeySchema) {
          primaryKeys = tableDetail.KeySchema.filter(
            (key) => key.KeyType === "HASH" && key.AttributeName
          ).map((key) => key.AttributeName)
          sortKeys = tableDetail.KeySchema.filter((key) => key.KeyType === "RANGE").map(
            (key) => key.AttributeName
          )
        }
        let globalSecondaryIndexes: DynamoDbGlobalSecondaryIndexes = []
        if (tableDetail.GlobalSecondaryIndexes) {
          globalSecondaryIndexes = tableDetail.GlobalSecondaryIndexes.filter(
            (gsi) => gsi.IndexName
          ).map((gsi): DynamoDbGlobalSecondaryIndex => {
            const keySchema = gsi.KeySchema?.filter((ks) => ks.AttributeName).map(
              (ks): DynamoDbKeyDetail => {
                return {
                  attributeName: ks.AttributeName ?? "",
                  keyType: ks.KeyType ?? "HASH",
                }
              }
            )

            return {
              indexName: gsi.IndexName ?? "",
              keySchema: keySchema ?? [],
            }
          })
        }

        dynamoDbTables.push({
          name: tableName,
          status: tableDetail.TableStatus ?? "ACTIVE",
          globalSecondaryIndexes: globalSecondaryIndexes,
          primaryKey: primaryKeys.join(","),
          sortKey: sortKeys.join(","),
          provisionedThroughput: {
            readCapacityUnits: tableDetail.ProvisionedThroughput?.ReadCapacityUnits ?? 0,
            writeCapacityUnits: tableDetail.ProvisionedThroughput?.WriteCapacityUnits ?? 0,
          },
          tableArn: tableDetail.TableArn ?? "",
        })
      } catch (e) {
        console.warn(e)
        continue
      }
    }
    return DynamoDbTablesSchema.parse(dynamoDbTables)
  } catch (e) {
    console.error(e)
    throw e
  }
}
