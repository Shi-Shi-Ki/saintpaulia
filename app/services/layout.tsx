export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <p>service page header</p>
      </header>

      <main className="flex-1 flex flex-col">{children}</main>

      <footer>
        <p>service page footer</p>
      </footer>
    </>
  )
}
