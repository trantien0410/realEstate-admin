import prismadb from "@/lib/prismadb";
import { AmenitiesForm } from "./components/amenities-form";


const AmenitiesPage = async ({ params }: { params: { amenitiesId: string } }) => {
  const amenities = await prismadb.amenities.findUnique({
    where: {
      id: params.amenitiesId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AmenitiesForm initialData={amenities} />
      </div>
    </div>
  );
};

export default AmenitiesPage;
