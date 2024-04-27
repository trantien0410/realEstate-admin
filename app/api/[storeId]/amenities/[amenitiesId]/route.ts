import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; amenitiesId: string } }
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

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const amenities = await prismadb.amenities.updateMany({
      where: {
        id: params.amenitiesId,
      },
      data: {
        roomName,
        roomValue,
        bathroomName,
        bathroomValue,
      },
    });
    return NextResponse.json(amenities);
  } catch (error) {
    console.log("[AMENITIES_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { amenitiesId: string } }
) {
  try {
    if (!params.amenitiesId) {
      return new NextResponse("Amenities id is required", { status: 400 });
    }

    const amenities = await prismadb.amenities.findUnique({
      where: {
        id: params.amenitiesId,
      },
    });
    return NextResponse.json(amenities);
  } catch (error) {
    console.log("[AMENITIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; amenitiesId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.amenitiesId) {
      return new NextResponse("Amenities id is required", { status: 400 });
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

    const amenities = await prismadb.amenities.deleteMany({
      where: {
        id: params.amenitiesId,
      },
    });
    return NextResponse.json(amenities);
  } catch (error) {
    console.log("[AMENITIES_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
