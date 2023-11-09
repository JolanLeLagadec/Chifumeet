import Navbar from '@/components/layout/Navbar'
import { roboto } from './fonts'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import SidebarMenu from '@/components/layout/SidebarMenu'
import Footer from '@/components/layout/Footer'
import { GeistSans, GeistMono } from 'geist/font'



export const metadata = {
  title: 'Chifumeet',
}

export default function RootLayout({ children }) {

  return (
    <html className={`${GeistSans.variable} ${GeistMono.variable}`} lang="en">
      <body className={roboto.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Navbar />       
          <main className='relative dark:bg-gradient-to-b from-background to-slate-900'>
            <SidebarMenu />
            {children}   
          </main> 
          <Footer />    
        </ThemeProvider>

      </body>
    </html>
  )
}
