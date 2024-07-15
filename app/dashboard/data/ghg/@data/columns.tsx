"use client";

import { ColumnDef } from "@tanstack/react-table";

// define table column type

export type TestRawData = {
  id: string;
  loc: string;
  date: string;
  dayAccumulateData: number;
  monthAccumulateData: number;
  yearAccumulateData: number;
};

export const columns: ColumnDef<TestRawData>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "loc",
    header: "Location",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "dayAccumulateData",
    header: "當日累積數據",
  },
  {
    accessorKey: "monthAccumulateData",
    header: "當月累積數據",
  },
  {
    accessorKey: "yearAccumulateData",
    header: "當年度累積數據",
  },
];
