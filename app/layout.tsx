import { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Footer from "@/components/footer"
import Head from "next/head"

// Importing fonts with correct variables
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

// Metadata for the page
export const metadata: Metadata = {
  title: "Mochilada - Viagens Econômicas",
  description: "Mochilada: Roteiros econômicos para sua próxima aventura",
  openGraph: {
    title: "Mochilada - Viagens Econômicas",
    description:
      "Encontre os melhores roteiros de viagem baratos e dicas para curtir com pouco dinheiro",
    images: [
      {
        url: "/images/og-image.jpg", // Optional: Image for social sharing
        width: 1200,
        height: 630,
        alt: "Mochilada - Viagens Econômicas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@MochiladaApp",
    title: "Mochilada - Viagens Econômicas",
    description:
      "Encontre os melhores roteiros de viagem baratos e dicas para curtir com pouco dinheiro",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <Head>
        <meta name="apple-mobile-web-app-title" content="Mochilada" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  )
}
