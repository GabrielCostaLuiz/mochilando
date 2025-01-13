// import Footer from "@/components/footer"
import NavBar from "@/components/navBar"
import Providers from "./providers"

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Providers>
        <header>
          <NavBar />
        </header>
        <main>
          <div className={`antialiased`}>{children}</div>
        </main>
        {/* <Footer /> */}
      </Providers>
    </>
  )
}
