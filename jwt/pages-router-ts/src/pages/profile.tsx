
import { GetServerSideProps, GetServerSidePropsContext } from "next";


export default function ProfilePage() {


  return (
    <main className='flex flex-col h-[calc(100vh-50px)] items-center justify-center'>
      <div className="text-3xl">Welcome <span className="font-bold"> !!</span></div>
    </main>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // const session = await getSession({ req: context.req });
  // console.log(session);

  // if (!session) {
  //   context.res.writeHead(302, { Location: "/login" });
  //   context.res.end();

  //   return { props: {} };
  // }

  return {
    props: {},
  };
};