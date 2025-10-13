import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'porto-agil',
  description: 'Created for my Portofolio',
  generator: 'porto.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
