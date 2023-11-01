import { Roboto, Epilogue } from 'next/font/google'
 
export const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ["100", "300", "400", "500", "700", "900"]
})
 
export const epilogue = Epilogue({
  subsets: ['latin'],
  display: 'swap'
})