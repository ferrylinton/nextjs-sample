import PublicLayout from '@/components/layout/PublicLayout'
import '@/styles/globals.css'
import { AppPropsWithLayout } from '@/types/app-type'

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <PublicLayout>{page}</PublicLayout>)
  return getLayout(<Component {...pageProps} />)
}
