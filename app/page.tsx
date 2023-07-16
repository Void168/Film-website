"use client";

import { getSession } from "next-auth/react";
import { NextPageContext } from "next";
import Navbar from "./components/navbar/Navbar";
import BillBoard from "./components/billboard/BillBoard";
import MovieList from "./components/movielist/MovieList";
import useMovieList from "./hooks/useMovieList";

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
  const { data: movies = [] } = useMovieList();
  return (
    <div>
      <Navbar />
      <BillBoard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
      </div>
    </div>
  );
}
