import { getSession } from "next-auth/react";

export default function Index() {
  return null;
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  return {
    redirect: {
      destination: session ? "/home" : "/auth/login",
      permanent: false,
    },
  };
}
