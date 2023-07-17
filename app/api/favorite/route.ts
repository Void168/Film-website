import { without } from "lodash";

import prismadb from "@/app/libs/prismadb";
import serverAuth from "@/app/libs/serverAuth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const currentUser = await serverAuth();

    const { movieId } = body;

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      throw new Error("Invalid ID");
    }

    const user = await prismadb.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favouriteIds: {
          push: movieId,
        },
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: `Something went wrong: ${error}` });
  }
}

export async function DELETE(request: Request) {
  try {
    const currentUser = await serverAuth();

    const body = await request.json();
    const { movieId } = body;

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      throw new Error("Invalid ID");
    }

    const updatedFavoriteIds = without(currentUser.favouriteIds, movieId);

    const updatedUser = await prismadb.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favouriteIds: updatedFavoriteIds,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: `Something went wrong: ${error}` });
  }
}
