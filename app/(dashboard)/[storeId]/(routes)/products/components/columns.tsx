"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type ProductColumn = {
  id: string;
  name: string;
  description: string;
  phoneContact: string;
  address: string;
  price: string;
  size: string;
  category: string;
  roomName: string;
  bathroomValue: number;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Tên Sản Phẩm",
  },
  {
    accessorKey: "description",
    header: "Mô Tả",
  },
  {
    accessorKey: "phoneContact",
    header: "Liên Hệ",
  },
  {
    accessorKey: "address",
    header: "Địa Chỉ",
  },
  {
    accessorKey: "isArchived",
    header: "Đã Lưu Trữ",
  },
  {
    accessorKey: "isFeatured",
    header: "Đặc Sắc",
  },
  {
    accessorKey: "price",
    header: "Giá",
  },
  {
    accessorKey: "category",
    header: "Thể Loại",
  },
  {
    accessorKey: "size",
    header: "Kích Thước",
  },
  {
    accessorKey: "roomName",
    header: "Loại Phòng Ngủ",
  },
  {
    accessorKey: "bathroomValue",
    header: "Số Phòng Vệ Sinh",
  },
  {
    accessorKey: "createdAt",
    header: "Ngày Tạo",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
