import type React from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { Provider } from "react-redux"
import { store } from "@/lib/store"
import "bootstrap/dist/css/bootstrap.min.css"
import "@/app/globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <Provider store={store}>{children}</Provider>
        </ClerkProvider>
      </body>
    </html>
  )
}

