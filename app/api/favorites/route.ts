import prismadb from "@/app/libs/prismadb";
import serverAuth from "@/app/libs/serverAuth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const currentUser = await serverAuth();

    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favouriteIds,
        },
      },
    });
      
      return NextResponse.json(favoriteMovies)
  } catch (error) {
      console.log(error)
      return NextResponse.json({ error: `Something went wrong: ${error}` });
  }
}
