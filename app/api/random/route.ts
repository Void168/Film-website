import prismadb from '@/app/libs/prismadb';
import serverAuth from '@/app/libs/serverAuth';
import { NextResponse } from 'next/server';

export default async function GET() {
    try {
      await serverAuth();

      const movieCount = await prismadb.movie.count();
      const randomIndex = Math.floor(Math.random() * movieCount);

      const randomMovie = await prismadb.movie.findMany({
        take: 1,
        skip: randomIndex,
      });

      return NextResponse.json(randomMovie[0]);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: `Something went wrong: ${error}` });
    }
}