import '@/styles/globals.css';
import type { AppProps as NextAppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Layout from '@/components/layout';
import { Session } from 'next-auth/core/types';
import { ResultProps } from '@/lib/api/player';
import { MetaProps } from '@/components/layout/meta';

type AppProps<P = any> = {
  pageProps: P;
} & Omit<NextAppProps<P>, "pageProps">;

type CustomAppProps = {
  session: Session;
  clusterStillProvisioning?: boolean;
  totalPlayers: number;
  results: ResultProps[];
  meta : MetaProps

  

}

export default function MyApp({
  Component,
  pageProps,
}: AppProps<CustomAppProps>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
