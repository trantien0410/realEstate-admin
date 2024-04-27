import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { AmenitiesColumn } from "./components/columns";
import { AmenitiesClient } from "./components/client";

const AmenitiesPage = async ({ params }: { params: { storeId: string } }) => {
  const amenities = await prismadb.amenities.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedAmenities: AmenitiesColumn[] = amenities.map((item) => ({
    id: item.id,
    roomName: item.roomName,
    roomValue: item.roomValue,
    bathroomName: item.bathroomName,
    bathroomValue: item.bathroomValue,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AmenitiesClient data={formattedAmenities} />
      </div>
    </div>
  );
};

export default AmenitiesPage;
