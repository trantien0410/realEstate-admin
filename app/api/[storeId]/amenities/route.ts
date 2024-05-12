import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { roomName, roomValue, bathroomName, bathroomValue } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!roomName) {
      return new NextResponse("Room Name is required", { status: 400 });
    }
    if (!roomValue) {
      return new NextResponse("Room Value is required", { status: 400 });
    }
    if (!bathroomName) {
      return new NextResponse("Bathroom Name is required", { status: 400 });
    }
    if (!bathroomValue) {
      return new NextResponse("Bathroom Value is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const amenities = await prismadb.amenities.create({
      data: {
        roomName,
        roomValue,
        bathroomName,
        bathroomValue,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(amenities);
  } catch (error) {
    console.log("[AMENITIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const amenities = await prismadb.amenities.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(amenities, {
      headers: corsHeaders,
    });
  } catch (error) {
    console.log("[AMENITIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
