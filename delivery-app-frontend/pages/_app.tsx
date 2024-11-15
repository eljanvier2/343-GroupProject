import Layout from '@/components/Layout/layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Instrument_Sans } from 'next/font/google'
import Head from 'next/head'
import { useState } from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'

export const Instrument = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export default function App ({ Component, pageProps }: AppProps): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  return (
    <div>
      <Head>
        <title>{'Drone Delivery'}</title>
      </Head>
      <ParallaxProvider>
        <main className={`${Instrument.className} bg-customWhite h-full`}>
          <Layout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
            <Component {...pageProps} />
          </Layout>
        </main>
      </ParallaxProvider>
    </div>
  )
}
