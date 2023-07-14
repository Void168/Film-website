import { NextResponse } from "next/server";
import serverAuth from "@/app/libs/serverAuth";

export async function GET() {
  try {
    const currentUser = await serverAuth();

    return NextResponse.json(currentUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: `Something went wrong: ${error}` });
  }
}