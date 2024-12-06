"use server";

import StaffKPICard from "../_cards/StaffKPICard";
import data from "../_fake_data.json";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LuDownload,
  LuLineChart,
  LuTable,
  LuUploadCloud,
} from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Root } from "@/app/dashboard/env_safety/license-management/_fake_data_type";

const NoData = () => {
  return (
    <div
      className={"w-full flex flex-col items-center justify-center relative "}
    >
      <Image height={400} width={400} src={"/no_data.png"} alt={"no-data"} />
      <p className={"absolute bottom-10 text-gray-500 font-semibold"}>
        暫無資料
      </p>
    </div>
  );
};

async function Page() {
  const locations = ["麥寮一廠", "麥寮二廠", "麥寮三廠"];
  const departments = [
    "烯烴部",
    "保養中心",
    "碼槽處",
    "公用部",
    "公務部",
    "煉油部",
  ];
  const facList = ["全", "2220安全衛生處", "2221環境保護處"];
  const airPollutionLicenses = [
    "固定汙染源操作許可證",
    "固定汙染源生煤使用許可證",
    "固定汙染源石油交販賣許可證",
    "固定汙染源石油焦使用許可證",
    "其他易致空氣汙染物使用許可證",
    "燃料使用許可證",
  ];

  const columns = [
    { name: "管制編號", key: "permitId" },
    { name: "設置類別", key: "permitType" },
    { name: "證照等級", key: "licenseGrade" },
    { name: "法定人數", key: "staffRequired" },
    { name: "實際人數", key: "staffAssigned" },
    { name: "部門代號", key: "responsibleStaff", subKey: "department" },
    { name: "專責人員", key: "responsibleStaff", subKey: "staffId" },
    { name: "取得證照等級", key: "responsibleStaff", subKey: "licenseGrade" },
    { name: "證照生效日", key: "responsibleStaff", subKey: "expirationDate" },
  ];

  return (
    <div className="p-4 max-w-full w-full flex flex-col space-y-4">
      <Card>
        <div
          className={
            "w-full flex flex-row items-center justify-start space-x-4 p-4"
          }
        >
          <Label>篩選列表</Label>
          <Select defaultValue={"麥寮一廠"}>
            <SelectTrigger className="w-[180px]">
              <Label>廠區</Label>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select defaultValue="烯烴部">
            <SelectTrigger className="w-[180px]">
              <Label>事業部</Label>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {departments.map((department) => (
                <SelectItem key={department} value={department}>
                  {department}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select defaultValue="全">
            <SelectTrigger className="w-[180px]">
              <Label>部門</Label>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {facList.map((fac) => (
                <SelectItem key={fac} value={fac}>
                  {fac}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>
      <Label>全公司污染許可證 KPI</Label>
      <div
        className={
          "w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 grid-rows-[auto_1fr] gap-x-2.5 gap-y-[1em]"
        }
      >
        {data.kpiData.responsibleStaff.map((kpi, i) => {
          return <StaffKPICard key={kpi.location} kpi={kpi} />;
        })}
      </div>
      <Card className={cn(["flex flex-col h-fit"])}>
        <CardHeader className="space-y-0 border-b p-0">
          <div className="gap-1 px-6 py-5 flex flex-row justify-between items-center">
            <CardTitle className="text-xl">環保專責負責人清單</CardTitle>
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
          <ScrollArea
            className={"flex-1 grow flex flex-col justify-center items-start"}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell key={col.name}>{col.name}</TableCell>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.permits.map((permit) => {
                  const staffList = permit.responsibleStaff;
                  return staffList.map((staff, index) => {
                    return (
                      <TableRow key={index}>
                        {columns.map((col) => {
                          const key = col.key as keyof typeof permit;
                          const subKey = col.subKey as keyof typeof staff;
                          const value =
                            col.subKey !== undefined
                              ? staff[subKey]
                              : permit[key];
                          return col.subKey !== undefined || index === 0 ? (
                            <TableCell key={col.name}>
                              {value as string}
                            </TableCell>
                          ) : (
                            <TableCell key={col.name}>
                              {/*{value as string}*/}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  });
                })}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

Page.getInitialProps = async () => ({});

export default Page;
