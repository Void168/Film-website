import prismadb from "@/app/libs/prismadb";
import serverAuth from "@/app/libs/serverAuth";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await serverAuth();
    const url = new URL(req.url);
    const movieId = url.pathname.slice(12, url.pathname.length);

    if (!movieId || typeof movieId !== "string") {
      throw new Error("Invalid Id");
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    return NextResponse.json(movie);
  } catch (error: any) {
    throw new Error(error);
  }
}
