import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import { Layout } from "@/components";
import "@/styles/global.css";
import { StoreProvider } from "@/hooks/useStore";
import { AppInit } from "@/components/AppInit";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

interface AppPropsWithLayout {
  Component: NextPageWithLayout
  pageProps: any
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page: ReactElement) =>
    <StoreProvider>
      <AppInit>
        <Layout>{page}</Layout>
      </AppInit>
    </StoreProvider>
  );


  return getLayout(<Component {...pageProps} />)
}
