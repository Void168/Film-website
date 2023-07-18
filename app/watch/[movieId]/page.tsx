"use client";

import React from "react";

import useMovie from "../../hooks/useMovie";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/navigation";

interface WatchParams {
  movieId?: string;
}

const Watch = ({ params }: { params: WatchParams }) => {
  const { data: movie } = useMovie(params?.movieId);
  const router = useRouter();

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft
          className="text-white cursor-pointer"
          size={40}
          onClick={() => router.push('/')}
        />
        <p className="text-white text-xl md:text-3xl font-bold">
          <span className="font-light">Watching: </span>
          {movie?.title}
        </p>
      </nav>
      <video
        autoPlay={true}
        controls
        className="h-full w-full"
        src={movie?.videoUrl}
      ></video>
    </div>
  );
};

export default Watch;
