import { NextRequest, NextResponse } from "next/server"

export default function proxy(request: NextRequest) {
  // 1. クッキーから 'url' を取得
  const urlCookie = request.cookies.get("local-stack-url")?.value

  // 2. 現在アクセスしようとしているパスを取得
  const { pathname } = request.nextUrl

  // 3. 条件判定：Cookieがなく、かつ現在のパスが '/setting' ではない場合
  // ※ 無限ループを防ぐために '/setting' へのアクセス時は除外することが必須です
  if (!urlCookie && !pathname.startsWith("/setting")) {
    // リダイレクト先のURLを構築
    const settingUrl = new URL("/setting", request.url)

    // '/setting' へリダイレクト
    return NextResponse.redirect(settingUrl)
  }

  // 条件に引っかからなければ、そのままページを表示（処理を継続）
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
