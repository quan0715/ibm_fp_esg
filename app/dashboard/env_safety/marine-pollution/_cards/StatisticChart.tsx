"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Root } from "../_fake_data_type";
import { Button } from "@/components/ui/button";

import {
  LuArrowLeft,
  LuArrowRight,
  LuCalendar,
  LuDownload,
  LuLineChart,
  LuTable,
  LuUpload,
  LuUploadCloud,
} from "react-icons/lu";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFilter, useMultipleFilter } from "@/app/dashboard/_hooks/useFilter";
import { randomUUID } from "node:crypto";
import Image from "next/image";

// get pollution type list
export default function Component({
  className,
  data,
}: {
  className?: string;
  data: Root;
}) {
  const factoryLocations = data.kpiData.map((kpi) => kpi.location);
  const factoryLocationFilter = useMultipleFilter<string>(
    factoryLocations,
    factoryLocations,
  );
  const getMaterialData = () => {
    return data.materials.filter((material) =>
      factoryLocationFilter.isSetFilter(material.materialLocation),
    );
  };
  const [materialData, setMaterialData] = useState(getMaterialData());

  useEffect(() => {
    console.log("update material data");
    setMaterialData(getMaterialData());
  }, [factoryLocationFilter.filters]);

  const columns = [
    { name: "資材類型", key: "materialType" },
    { name: "資材類別", key: "materialCategory" },
    { name: "資材項目", key: "materialItem" },
    { name: "賳材規格", key: "materialSpecification" },
    { name: "單位", key: "unit" },
    { name: "庫存", key: "inventory" },
    { name: "清點時間", key: "inspectionDate" },
    { name: "清點狀況", key: "cleanStatus" },
    { name: "維護狀況", key: "maintenanceStatus" },
  ];

  return (
    <Card className={cn(["flex flex-col h-fit", className])}>
      <CardHeader className="space-y-0 border-b p-0">
        <div className="gap-1 px-6 py-5 flex flex-row justify-between items-center">
          <CardTitle className="text-xl">海汙緊急應變器材清單</CardTitle>
          <div
            className={"flex flex-row space-x-2 justify-center items-center"}
          >
            <Button variant={"outline"}>
              <div
                className={
                  "flex flex-row justify-center items-center space-x-1"
                }
              >
                <LuDownload />
                <span>圖表下載</span>
              </div>
            </Button>
            <Button variant={"outline"}>
              <div
                className={
                  "flex flex-row justify-center items-center space-x-1"
                }
              >
                <LuUploadCloud />
                <span>資料上傳</span>
              </div>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-2 justify-start">
        <div>
          <Label>廠區篩選</Label>
          <div className={"flex flex-row gap-4 justify-start items-center p-2"}>
            {factoryLocations.map((loc) => {
              return (
                <Badge
                  key={loc}
                  variant={
                    factoryLocationFilter.isSetFilter(loc)
                      ? "default"
                      : "secondary"
                  }
                  onClick={() => factoryLocationFilter.handleFilterChange(loc)}
                  className={"cursor-pointer"}
                >
                  <span className={"text-md select-none"}>{loc}</span>
                </Badge>
              );
            })}
          </div>
        </div>
        <div>
          <Tabs defaultValue="this_year" className="">
            <TabsList>
              <TabsTrigger value="this_year">
                <div className={"inline-flex items-center"}>
                  <LuTable />
                  今年度清單
                </div>
              </TabsTrigger>
              <TabsTrigger value="historical">
                <div className={"inline-flex items-center"}>
                  <LuLineChart />
                  歷史圖表資料
                </div>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="this_year">
              <ScrollArea
                className={
                  "flex-1 grow flex flex-col justify-center items-start"
                }
              >
                <Label>今年度清單</Label>
                <Table>
                  <TableHeader>
                    <TableRow>
                      {columns.map((col) => {
                        return (
                          <TableHead key={col.key} className="min-w-[100px]">
                            {col.name}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {materialData.map((material, index) => {
                      return (
                        <TableRow
                          key={
                            index +
                            material.materialItem +
                            material.materialLocation
                          }
                        >
                          {columns.map((col) => {
                            const key = col.key as keyof typeof material;
                            const value = material[key];
                            return typeof value === "boolean" ? (
                              <TableCell key={col.key + material.materialItem}>
                                {value ? "V" : "X"}
                              </TableCell>
                            ) : (
                              <TableCell key={col.key}>{value}</TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="historical">
              <Label>歷史圖表資料</Label>
              <div
                className={
                  "w-full flex flex-col items-center justify-center relative "
                }
              >
                <Image
                  height={400}
                  width={400}
                  src={"/no_data.png"}
                  alt={"no-data"}
                />
                <p className={"absolute bottom-10 text-gray-500 font-semibold"}>
                  暫無資料
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
