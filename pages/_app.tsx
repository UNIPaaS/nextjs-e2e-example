import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import { Layout } from "@/components";
import "@/styles/global.css";
import { StoreProvider } from "@/hooks/useStore";

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
      <Layout>{page}</Layout>
    </StoreProvider>
  );


  return getLayout(<Component {...pageProps} />)
}
