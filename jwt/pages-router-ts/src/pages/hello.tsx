
import { callHeloApi } from "@/libs/client-api";
import { getIp, getToken } from "@/libs/server-util";
import { GetServerSidePropsContext } from "next";

type Props = {
  message: string | null
}

export default function HelloPage({ message }: Props) {

  return (
    <main className='flex flex-col h-[calc(100vh-50px)] items-center justify-center'>
      <div className="text-3xl">{message}</div>
    </main>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let message: string | null = null;

  try {
    const token = getToken(context);
    console.log(token);
    console.log(`${process.env.NEXT_PUBLIC_HOST}/api/hello`);
    console.log(getIp(context));
    const response = await callHeloApi(token as string, getIp(context));

    if (response.status === 200 && response.data) {
      message = response.data.message;
    }

  } catch (error: any) {
    message = error.message
  }

  return {
    props: {
      message
    }
  }
}