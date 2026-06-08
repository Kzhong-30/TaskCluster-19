import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'
import { generateCSSVars } from '@/store/theme'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const defaultCSSVars = generateCSSVars('#4f46e5', 'system-ui', 8)

const themeInitScript = `
(function(){
  try{
    var m=localStorage.getItem('docgen-theme-mode');
    if(m==='dark'||(!m&&window.matchMedia('(prefers-color-scheme:dark)').matches)){
      document.documentElement.classList.add('dark');
    }
    var c=localStorage.getItem('docgen-theme-css');
    if(c){
      var p=JSON.parse(c);
      var r=document.documentElement;
      for(var k in p){if(p.hasOwnProperty(k))r.style.setProperty(k,p[k])}
    }
  }catch(e){}
})()
`

export const metadata: Metadata = {
  title: 'DocGen - 组件文档',
  description: '自动文档站点生成工具',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" style={defaultCSSVars as React.CSSProperties}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${inter.variable} font-body`}>
        <ThemeProvider>
          <Sidebar />
          <div className="flex-1 ml-64">
            <Header />
            <main className="p-6 min-h-screen">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
