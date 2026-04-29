import { getUrl } from "../setting"

export async function connectionInfo() {
  const url = await getUrl()

  return {
    // endpoint: url ?? "http://localhost:4566",
    // endpoint: "http://host.docker.internal:4566",
    // endpoint: "http://127.0.0.1:4566",
    endpoint: "http://localhost:4566",
    region: "ap-northeast-1",
    credentials: { accessKeyId: "dummy", secretAccessKey: "dummy" },
  }
}
