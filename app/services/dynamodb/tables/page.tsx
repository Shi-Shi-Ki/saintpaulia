import { DynamoDbTables } from "~/app/actions/services/dynamodb/tables/schema"
import { DynamoDbTableList } from "~/app/actions/services/dynamodb/tables/tables"
import BreadcrumbSetter from "~/component/atoms/BreadcrumbSetter"
import { buildBreadcrumbs } from "~/lib/config/route-schema"
import NamesTableContainer from "./NamesTableContainer"
import PollingProcessing from "~/component/organism/PollingProcessing"

export default async function DynamoDbTablesPage() {
  let initialData: DynamoDbTables | undefined = undefined
  try {
    initialData = await DynamoDbTableList()
  } catch (error) {
    console.error(error)
  }

  const currentCrumbs = buildBreadcrumbs("DYNAMODB_TABLES")

  return (
    <div>
      <BreadcrumbSetter crumbs={currentCrumbs} />
      <PollingProcessing<DynamoDbTables>
        initialData={initialData}
        pollingKey="dynamodb-tables"
        pollingFunction={DynamoDbTableList}
        Component={NamesTableContainer}
      />
    </div>
  )
}
