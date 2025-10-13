import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/context/language-context'

export const metadata: Metadata = {
  title: 'Nugraha FX - Geospatial Full Stack Developer',
  description: 'Portfolio of Nugraha FX - Geospatial Full Stack Developer specializing in web development and GIS solutions',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
