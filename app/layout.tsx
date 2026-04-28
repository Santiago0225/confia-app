import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Confía - Gestión Laboral Doméstica',
  description: 'Plataforma de gestión laboral doméstica',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6 ml-64 mt-16 min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
