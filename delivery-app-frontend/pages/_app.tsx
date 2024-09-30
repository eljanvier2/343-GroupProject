import Layout from "@/components/Layout/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Instrument_Sans } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";

export const Instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{"Drone Delivery"}</title>
      </Head>
      <main className={`${Instrument.className} bg-customWhite h-full`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </div>
  );
}
