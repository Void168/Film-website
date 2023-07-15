"use client";

import { getSession } from "next-auth/react";
import { NextPageContext } from "next";
import Navbar from "./components/navbar/Navbar";
import BillBoard from "./components/billboard/BillBoard";

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
  return (
    <div>
      <Navbar />
      <BillBoard />
    </div>
  );
}
