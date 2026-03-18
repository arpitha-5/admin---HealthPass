import type { Metadata, Viewport } from "next"
import { Poppins } from "next/font/google"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryProvider } from "@/components/providers/query-provider"
import { ToastProvider } from "@/components/providers/toast-provider"
import { ErrorBoundary } from "@/components/providers/error-boundary"
import "./globals.css"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "HealthPass - Admin Dashboard",
    template: "%s | HealthPass",
  },
  description: "Health-related admin dashboard for managing patients, appointments, and medical records",
  keywords: ["healthcare", "admin", "dashboard", "patients", "appointments", "medical"],
  authors: [{ name: "HealthPass" }],
  icons: {
    icon: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#DC2626" },
    { media: "(prefers-color-scheme: dark)", color: "#B91C1C" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <ErrorBoundary>
          <TooltipProvider>
            <QueryProvider>
              <ToastProvider>
                {children}
              </ToastProvider>
            </QueryProvider>
          </TooltipProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
