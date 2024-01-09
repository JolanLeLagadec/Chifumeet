import Navbar from '@/components/layout/Navbar'
import { roboto } from './fonts'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import SidebarMenu from '@/components/layout/SidebarMenu'
import Footer from '@/components/layout/Footer'
import { GeistSans, GeistMono } from 'geist/font'
import toast, { Toaster } from 'react-hot-toast'



export const metadata = {
  title: 'Chifumeet',
}

export default function RootLayout({ children }) {

  return (
    <html className={`${GeistSans.variable} ${GeistMono.variable}`} lang="en">
      <body className={`${roboto.className} max-w-xl mx-auto min-h-screen`}>
        <Toaster />
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navbar />
          <main className='relative dark:bg-gradient-to-b from-background to-slate-900 h-full'>
            <SidebarMenu />
            {children}
          </main>
          <Footer />
        </ThemeProvider>

      </body>
    </html>
  )
}
