import NavBar from "@/components/navBar"

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <div className={`antialiased`}>{children}</div>
      </main>
    </>
  )
}
