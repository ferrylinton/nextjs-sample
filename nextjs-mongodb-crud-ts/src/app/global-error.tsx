'use client';

import { ErrorPageProps } from '@/types/error-page-type';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect } from 'react';

export default function GlobalErrorPage({ error, reset }: ErrorPageProps) {

  const t = useTranslations("common");

  useEffect(() => {
    console.log("global-error-page");
    console.error(error)
  }, [error])

  return (
    <div className="error-box">
      <p>{error.message}</p>
      <div className='buttons' style={{justifyContent: 'center'}}>
        <Link href={"/"} className="btn btn-primary">
          {t("home")}
        </Link>
        <button className="btn btn-secondary" onClick={() => reset()}>
          {t("tryAgain")}
        </button>
      </div>
    </div>
  )
}