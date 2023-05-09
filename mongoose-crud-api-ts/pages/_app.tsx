import { getLogger } from '@/utils/logger';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const logger = getLogger("App");

  logger.info("starting App...");
  return <Component {...pageProps} />
}
