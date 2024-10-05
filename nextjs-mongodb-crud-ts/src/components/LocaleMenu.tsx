'use client';

import { useClickOutside } from '@/hooks/useClickOutside';
import { Locale } from '@/i18n/config';
import { EnglishIcon } from '@/icons/EnglishIcon';
import { IndonesiaIcon } from '@/icons/IndonesiaIcon';
import { setUserLocale } from '@/services/locale';
import { useLocale } from 'next-intl';
import { useRef, useState } from 'react';


export const LocaleMenu = () => {

  const locale = useLocale();

  const [checked, setChecked] = useState<boolean>(false);

  const ref = useRef<HTMLUListElement>(null);

  useClickOutside(ref, () => {
    if(checked){
      setChecked(false);
    }
  })

  const setLocale = (nextLocale: string) => {
    setUserLocale(nextLocale as Locale);
    setChecked(false);
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const getCurrentLocale = () => {
    return locale === "id" ? <IndonesiaIcon /> : <EnglishIcon />
  }


  return (
    <>
      <label className="dropdown">
        <div className="dd-button">
          {getCurrentLocale()}
          <div className="dd-button-arrow"></div>
        </div>
        <input type="checkbox" className="dd-input" id="test" checked={checked} onChange={onChangeHandler} />
        <ul className="dd-menu" ref={ref}>
          <li>
            <a onClick={(e) => {
              e.preventDefault();
              setLocale('en');
            }}>
              <EnglishIcon />
              <span>English</span>
            </a>
          </li>
          <li>
            <a onClick={(e) => {
              e.preventDefault();
              setLocale('id')
            }}>
              <IndonesiaIcon />
              <span>Indonesia</span>
            </a>
          </li>
        </ul>
      </label>
    </>
  )
}
