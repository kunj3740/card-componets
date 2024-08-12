import prismadb from "@/lib/prismadb";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { question, answer , adminId} = await req.json();
    if (!question || !answer ) {
      return new NextResponse("Missing question or answer", { status: 400 });
    }

 

    const flashcard = await prismadb.flashcard.create({
      data: {
        question,
        answer,
        adminId 
      },
    });

    return NextResponse.json(flashcard);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
