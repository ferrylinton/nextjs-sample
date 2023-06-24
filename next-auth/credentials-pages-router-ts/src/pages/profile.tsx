
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react"

export default function ProfilePage() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <main className='flex flex-col h-[calc(100vh-50px)] items-center justify-center'>
      <div className="text-3xl">Welcome <span className="font-bold">{session?.user?.username} !!</span></div>
    </main>
  )
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getSession({ req: context.req });
//   console.log(session);

//   if (!session) {
//     context.res.writeHead(302, { Location: "/login" });
//     context.res.end();

//     return { props: {} };
//   }

//   return {
//     props: {},
//   };
// };