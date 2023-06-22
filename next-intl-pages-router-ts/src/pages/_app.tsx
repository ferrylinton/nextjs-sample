import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { NextIntlProvider } from 'next-intl';
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextIntlProvider messages={pageProps.messages}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NextIntlProvider>
  );
}
