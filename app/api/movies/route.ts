import prismadb from "@/app/libs/prismadb";
import serverAuth from "@/app/libs/serverAuth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await serverAuth();

    const movies = await prismadb.movie.findMany()

    return NextResponse.json(movies);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: `Something went wrong: ${error}` });
  }
}
