"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const localStackUrlName = "local-stack-url"

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
}

export async function setting(url: string) {
  const cookieStore = await cookies()

  cookieStore.set(localStackUrlName, url, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60,
  })

  redirect("/")
}

export async function getUrl() {
  const cookieStore = await cookies()

  const urlCookie = cookieStore.get(localStackUrlName)

  return urlCookie ? urlCookie.value : null
}

export async function reset() {
  const cookieStore = await cookies()
  cookieStore.delete("local-stack-url")
  redirect("/setting")
}
