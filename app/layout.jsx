import Navbar from '@/components/Navbar'
import { roboto } from './fonts'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import SidebarMenu from '@/components/SidebarMenu'


export const metadata = {
  title: 'Chifumeet',

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        
        <ThemeProvider attribute="class" defaultTheme="system">
        <Navbar />
          <main className=' min-h-screen relative dark:bg-background'>
          <SidebarMenu />
            {children}
          </main>
        </ThemeProvider>   
      </body>
    </html>
  )
}
