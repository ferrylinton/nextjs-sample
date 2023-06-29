
import { useAppContext } from "@/app-context";


export default function ProfilePage() {

  const { user } = useAppContext();

  return (
    <main className='flex flex-col h-[calc(100vh-50px)] items-center justify-center'>
      <div className="text-3xl">Welcome <span className="font-bold">{user?.username} !!</span></div>
    </main>
  )
}