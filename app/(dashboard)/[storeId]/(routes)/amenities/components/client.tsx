"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { AmenitiesColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface AmenitiesClientProps {
  data: AmenitiesColumn[];
}

export const AmenitiesClient: React.FC<AmenitiesClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Tiện nghi (${data.length})`}
          description="Quản lý tiện nghi cho cửa hàng của bạn"
        />
        <Button onClick={() => router.push(`/${params.storeId}/amenities/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm Mới
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="Lệnh gọi API cho Tiện nghi" />
      <Separator />
      <ApiList entityName="amenities" entityIdName="amenitiesId" />
    </>
  );
};
