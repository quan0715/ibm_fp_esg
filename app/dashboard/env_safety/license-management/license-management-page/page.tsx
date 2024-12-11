"use server";

import LicenseKPICard from "../_cards/LicenseKPICard";
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
  const facList = ["2220 安全衛生處", "2221 環境保護處"];
  const airPollutionLicenses = [
    "固定汙染源操作許可證",
    "固定汙染源生煤使用許可證",
    "固定汙染源石油交販賣許可證",
    "固定汙染源石油焦使用許可證",
    "其他易致空氣汙染物使用許可證",
    "燃料使用許可證",
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
        </div>
      </Card>
      <Label>全公司污染許可證 KPI</Label>
      <div
        className={
          "w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 grid-rows-[auto_1fr] gap-x-2.5 gap-y-[1em]"
        }
      >
        {data.kpiData.license.map((kpi, i) => {
          return <LicenseKPICard key={kpi.pollutionType} kpi={kpi} />;
        })}
      </div>
      <Card className={cn(["flex flex-col h-fit"])}>
        <CardHeader className="space-y-0 border-b p-0">
          <div className="gap-1 px-6 py-5 flex flex-row justify-between items-center">
            <CardTitle className="text-xl">許可證統計</CardTitle>
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
          <Tabs defaultValue={"空汙"}>
            <TabsList>
              <TabsTrigger value="空汙">
                <span>空汙</span>
              </TabsTrigger>
              <TabsTrigger value="水汙">
                <span>水汙</span>
              </TabsTrigger>
              <TabsTrigger value="廢棄物">
                <span>廢棄物</span>
              </TabsTrigger>
              <TabsTrigger value="毒化物">
                <span>毒化物</span>
              </TabsTrigger>
              <TabsTrigger value="海汙">
                <span>海汙</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value={"空汙"}>
              <ScrollArea
                className={
                  "flex-1 grow flex flex-col justify-center items-start"
                }
              >
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableCell>部門</TableCell>
                      {airPollutionLicenses.map((license) => (
                        <TableCell key={license}>{license}</TableCell>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {facList.map((fac) => {
                      return (
                        <TableRow key={fac}>
                          <TableCell>{fac}</TableCell>
                          {airPollutionLicenses.map((license) => (
                            <TableCell key={license}>0</TableCell>
                          ))}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </TabsContent>
            <TabsContent value={"水汙"}>
              <Label>水汙表格</Label>
              <NoData />
            </TabsContent>
            <TabsContent value={"廢棄物"}>
              <Label>廢棄物表格</Label>
              <NoData />
            </TabsContent>
            <TabsContent value={"毒化物"}>
              <Label>海汙表格</Label>
              <NoData />
            </TabsContent>
            <TabsContent value={"海汙"}>
              <Label>海汙表格</Label>
              <NoData />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

Page.getInitialProps = async () => ({});

export default Page;
