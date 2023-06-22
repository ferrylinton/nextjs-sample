import { pick } from 'lodash';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React from 'react'

type Props = {}

export default function AboutPage({}: Props) {
    const { locale } = useRouter();
    const t = useTranslations('About');
  
    return (
      <main className='flex flex-col min-h-screen items-center justify-center'>
        <div className="text-3xl">locale: {locale}</div>
        <div className='text-xl'>{t('aboutpage')}</div>
      </main>
    )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {

    const messages = pick((await import(`../../messages/${locale}.json`)), ['About']);
  
    return {
      props: {
        messages
      }
    };
  }