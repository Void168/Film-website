import prismadb from '@/app/libs/prismadb'
import serverAuth from '@/app/libs/serverAuth'
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        await serverAuth()

        const body = await request.json();

        const { movieId } = body.query

        if (typeof movieId !== 'string' || !movieId) {
            throw new Error('Invalid ID')
        }

        const movie = await prismadb.movie.findUnique(({
            where: {
                id: movieId
            }
        }))

        if (!movie) {
            throw new Error('Invalid ID')
        }

        return NextResponse.json(movie);
    } catch (error) {
        console.log(error)

        return NextResponse.json({ error: `Something went wrong: ${error}` });
    }
}