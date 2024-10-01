import { getTranslations } from 'next-intl/server';
import * as todoService from "@/services/todo-service";

export default async function Home() {
  const t = await getTranslations('common');
  const todoes = await todoService.find();
  console.log(todoes);


  return <h1>{t('home')}</h1>;
}
