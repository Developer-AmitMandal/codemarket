import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CodeMarket - Buy and Contribute to Project Source Code for Students and Developers',
  description: 'Discover a wide variety of project source code for Python, MERN, React Native, Java, HTML, CSS, PHP, and more at CodeMarket. Join our coding community, download, and contribute to these projects to enhance your coding skills. Explore endless possibilities with CodeMarket. Happy coding!',
  openGraph: {
    type: 'website',
    url: 'https://codemarket-store.vercel.app',
  },
}

// Define default SEO configuration for your entire site


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <meta property="og:title" content="Code Market" />
        <meta property="og:description" content="CodeMarket - Buy and Contribute to Project Source Code for Students and Developers" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codemarket-store.vercel.app" />
        <meta property="og:site_name" content="codemarket" />  {/* Use og:site_name instead of site_name */}
      </Head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
