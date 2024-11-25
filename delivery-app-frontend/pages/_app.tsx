import Layout from "@/components/Layout/layout";
import { User } from "@/data";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Instrument_Sans } from "next/font/google";
import Head from "next/head";
import { useState } from "react";
import { ParallaxProvider } from "react-scroll-parallax";

export const Instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  return (
    <div>
      <Head>
        <title>{"Drone Delivery"}</title>
      </Head>
      <ParallaxProvider>
        <main className={`${Instrument.className} bg-customWhite h-full`}>
          <Layout
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            setUser={setUser}
            user={user}>
            <Component
              {...pageProps}
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
              user={user}
              setUser={setUser}
            />
          </Layout>
        </main>
      </ParallaxProvider>
    </div>
  );
}
