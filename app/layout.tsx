import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/context/language-context'
import { Toaster } from '@/components/ui/toaster'

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
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  )
}
