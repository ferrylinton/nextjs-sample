import SecureLayout from '@/components/layout/SecureLayout';
import { NextPageWithLayout } from '@/types/app-type';
import { ReactElement } from 'react';

const ProfilePage: NextPageWithLayout = () => {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >

    </main>
  )
}

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <SecureLayout>{page}</SecureLayout>
  )
}
export default ProfilePage;