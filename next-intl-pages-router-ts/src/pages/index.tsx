import { GetStaticPropsContext } from "next";
import pick from 'lodash/pick';
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

export default function HomePage() {

  const { locale } = useRouter();
  const t = useTranslations('Index');

  return (
    <main className='flex flex-col h-[calc(100vh-50px)] items-center justify-center'>
      <div className="text-3xl">locale: {locale}</div>
      <div className='text-xl'>{t('hello')}</div>
    </main>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {

  const messages = pick((await import(`../../messages/${locale}.json`)), ['Index']);

  return {
    props: {
      messages
    }
  };
}