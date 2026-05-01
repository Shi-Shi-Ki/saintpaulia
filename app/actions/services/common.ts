import { getUrl } from "@actions/setting"

interface Credentials {
  endpoint: string
  region: string
  credentials: {
    accessKeyId: string
    secretAccessKey: string
  }
}

async function credentials(): Promise<Credentials> {
  const url = await getUrl()

  return {
    endpoint: url ?? "http://localhost:4566",
    region: "ap-northeast-1",
    credentials: { accessKeyId: "dummy", secretAccessKey: "dummy" },
  }
}

export async function connection<T>(ClientClass: new (config: Credentials) => T) {
  return new ClientClass(await credentials())
}
