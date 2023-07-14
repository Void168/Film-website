"use client";

import { getSession, signOut } from "next-auth/react";
import { NextPageContext } from "next";
import useCurrentUser from "./hooks/useCurrentUser";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data } = useCurrentUser();
  return (
    <div>
      Netflix
      <p>{data?.name}</p>
      <button onClick={() => signOut()} className="h-10 w-full bg-white">
        Logout
      </button>
    </div>
  );
}
