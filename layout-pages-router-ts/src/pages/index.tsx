import LocaleSwitcher from '@/components/LocaleSwitcher';
import IdIcon from '@/icons/IdIcon';
import { NextPageWithLayout } from '@/types/app-type';

const HomePage: NextPageWithLayout = () => {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-2 mt-[60px]`}>
      <LocaleSwitcher/>
    </main>
  )
}

export default HomePage;