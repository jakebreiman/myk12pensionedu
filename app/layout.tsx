import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { UTMCapture } from "@/components/UTMCapture"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "My K12 Pension Edu",
  description:
    "Schedule a one-on-one pension consultation. Educational information for current and former K-12 school employees.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-[#1a1a1a] antialiased min-h-screen flex flex-col">
        <UTMCapture />
        <Header />
        <div className="flex-1 bg-[#d1d5db] py-6 px-4">
          <div className="max-w-[1020px] mx-auto bg-white rounded-xl shadow-sm">
            {children}
          </div>
        </div>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
