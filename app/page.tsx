import PollingProcessing from "~/component/organism/PollingProcessing"
import CardList from "~/component/organism/CardList"
import { status } from "~/app/actions/local-stack/status"
import { LocalStackStatus } from "./actions/local-stack/schema"

export default async function DashBoard() {
  let initialData: LocalStackStatus | undefined = undefined
  try {
    initialData = await status()
  } catch (error) {
    console.error(error)
  }

  return (
    <div className="min-h-screen bg-base-200 p-8 md:p-12 text-base-content">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* ヘッダー部分 */}
        <header className="flex justify-between items-center bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">LocalStack Viewer</h1>
            <p className="text-base-content/60 mt-2 text-sm">
              This service allows you to visually utilize services within local-stack.
            </p>
          </div>
        </header>

        {/* メインのポーリング＆リスト表示エリア */}
        <main className="p-2">
          <PollingProcessing<LocalStackStatus>
            initialData={initialData} // nullが返る可能性がある場合は undefined に変換
            pollingKey="localstack-status"
            pollingFunction={status}
            Component={CardList}
          />
        </main>
      </div>
    </div>
  )
}
