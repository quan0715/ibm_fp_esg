"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  BaseLine,
  PollutionData,
  Root,
  PollutionType,
} from "../_fake_data_type";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { LuArrowLeft, LuArrowRight, LuDownload } from "react-icons/lu";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
// get pollution type list
export default function Component({
  pollutionData,
  baseLine,
  className,
}: {
  pollutionData: PollutionData[];
  baseLine: BaseLine[];
  className?: string;
}) {
  // count data range
  const pollutionTypeList: PollutionType[] = [
    "TSP",
    "SOx",
    "NOx",
    "VOCs",
    "CO",
  ];
  const dataTargetList = ["排放量", "單位產品排放量"];
  const [availableTime, setAvailableTime] = useState<string[]>(
    Array.from(
      new Set(
        pollutionData.map((data) => `${data.year}/${data.month}`),
      ).values(),
    ),
  );
  const [pollutionFilterList, setPollutionFilterList] =
    useState<PollutionType[]>(pollutionTypeList);
  const [dataTargetFilter, setDataTargetFilter] = useState<string>(
    dataTargetList[0],
  );
  const [startTime, setStartTime] = useState<string>(availableTime[0]);
  const [endYear, setEndTime] = useState<string>(
    availableTime[availableTime.length - 1],
  );

  function getLineChartData() {
    const filteredData = pollutionData.filter((data) => {
      let time = `${data.year}/${data.month}`;
      return (
        parseInt(time.split("/")[0]) >= parseInt(startTime.split("/")[0]) &&
        parseInt(time.split("/")[0]) <= parseInt(endYear.split("/")[0]) &&
        parseInt(time.split("/")[1]) >= parseInt(startTime.split("/")[1]) &&
        parseInt(time.split("/")[1]) <= parseInt(endYear.split("/")[1])
      );
    });
    // convert data to table format
    // {time: "2021/1", TSP: 100, SOx: 200, NOx: 300, VOCs: 400, CO: 500}
    let tableData: any = {};
    filteredData.forEach((data) => {
      let time = `${data.year}/${data.month}`;
      if (!tableData[time]) {
        tableData[time] = {
          time: time,
          TSP: 0,
          SOx: 0,
          NOx: 0,
          VOCs: 0,
          CO: 0,
        };
      }
      tableData[time][data.pollution] = data.emission;
    });
    return Object.values(tableData);
  }
  console.log(getLineChartData());

  const editPollutionFilter = (pollution: PollutionType) => {
    if (pollutionFilterList.includes(pollution)) {
      setPollutionFilterList(
        pollutionFilterList.filter((type) => type !== pollution),
      );
    } else {
      setPollutionFilterList([...pollutionFilterList, pollution]);
    }
  };
  return (
    <Card className={cn(["flex flex-col h-fit", className])}>
      <CardHeader className="space-y-0 border-b p-0">
        <div className="gap-1 px-6 py-5 flex flex-row justify-between">
          <CardTitle className="text-xl">空汙指標統計</CardTitle>
          <Button variant={"outline"}>
            <div
              className={"flex flex-row justify-center items-center space-x-1"}
            >
              <LuDownload />
              <span>圖表下載</span>
            </div>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-2 justify-start">
        <div>
          <Label>污染物篩選</Label>
          <div className={"flex flex-row gap-4 justify-start items-center p-2"}>
            {pollutionTypeList.map((pollutionType) => {
              return (
                <Badge
                  key={pollutionType}
                  variant={
                    pollutionFilterList.includes(pollutionType)
                      ? "default"
                      : "secondary"
                  }
                  onClick={() => editPollutionFilter(pollutionType)}
                  className={"cursor-pointer"}
                >
                  <span className={"text-md select-none"}>{pollutionType}</span>
                </Badge>
              );
            })}
          </div>
        </div>
        <div>
          <Label>資料類別</Label>
          <div className={"flex flex-row gap-4 justify-start items-center p-2"}>
            {dataTargetList.map((dataTarget) => {
              return (
                <Badge
                  key={dataTarget}
                  variant={
                    dataTarget === dataTargetFilter ? "default" : "secondary"
                  }
                  onClick={() => setDataTargetFilter(dataTarget)}
                  className={"cursor-pointer"}
                >
                  <span className={"text-md select-none"}>{dataTarget}</span>
                </Badge>
              );
            })}
          </div>
        </div>
        <div>
          <Label>資料時間（年月）</Label>
          <div
            className={"flex flex-row justify-start items-center space-x-2 p-2"}
          >
            <Select
              onValueChange={(value) => {
                setStartTime(value as string);
              }}
            >
              <SelectTrigger className={"max-w-52"}>
                <Label>起始年月</Label>
                <SelectValue placeholder={"起始年月"} />
              </SelectTrigger>
              <SelectContent>
                {availableTime.map((time) => {
                  return (
                    <SelectItem
                      key={time}
                      value={time}
                      className={"cursor-pointer"}
                    >
                      {time}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <LuArrowRight />
            <Select
              onValueChange={(value) => {
                setEndTime(value as string);
              }}
            >
              <SelectTrigger className={"max-w-52"}>
                <Label>結束年月</Label>
                <SelectValue placeholder={"起始年月"} />
              </SelectTrigger>
              <SelectContent>
                {availableTime.map((time) => {
                  return (
                    <SelectItem
                      key={time}
                      value={time}
                      className={"cursor-pointer"}
                    >
                      {time}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className={"w-full flex flex-row items-center justify-center"}>
          <div className={"flex-1 "}>
            <Label>污染物折線圖數據</Label>
            <ChartContainer
              className={"w-full h-[400px] p-4"}
              config={{
                TSP: {
                  label: "TSP",
                  color: "#2563eb",
                },
                SOx: {
                  label: "SOx",
                  color: "#f87171",
                },
                NOx: {
                  label: "NOx",
                  color: "#f59e0b",
                },
                VOCs: {
                  label: "VOCs",
                  color: "#34d399",
                },
                CO: {
                  label: "CO",
                  color: "#f472b6",
                },
              }}
            >
              <LineChart data={getLineChartData()}>
                <CartesianGrid vertical={true} />
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                {pollutionFilterList.map((pollutionType) => {
                  return (
                    <Line
                      key={pollutionType}
                      type="monotone"
                      dataKey={pollutionType}
                      stroke={`var(--color-${pollutionType})`}
                      dot={false}
                    />
                  );
                })}
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </div>
        <div
          className={
            "w-full flex border-2 h-[400px] justify-center items-center"
          }
        >
          表格預留位置
        </div>
      </CardContent>
    </Card>
  );
}
