"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type AmenitiesColumn = {
  id: string;
  roomName: string;
  roomValue: number;
  bathroomName: string;
  bathroomValue: number;
  createdAt: string;
};

export const columns: ColumnDef<AmenitiesColumn>[] = [
  {
    accessorKey: "roomName",
    header: "Kiểu phòng ngủ",
  },
  {
    accessorKey: "roomValue",
    header: "Kiểu phòng ngủ bằng số",
  },
  {
    accessorKey: "roomName",
    header: "Kiểu phòng vệ sinh",
  },
  {
    accessorKey: "roomValue",
    header: "Kiểu phòng vệ sinh bằng số",
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
