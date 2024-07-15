"use client";

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardHeader,
} from "../../../_components/DashboardCard";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useState } from "react";
import { late } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const tempRawData = [
  {
    id: "1",
    loc: "A",
    date: "2024-01-01",
    dayAccumulateData: 10000,
    monthAccumulateData: 10000,
    yearAccumulateData: 10000,
  },
  {
    id: "2",
    loc: "B",
    date: "2024-01-01",
    dayAccumulateData: 10000,
    monthAccumulateData: 10000,
    yearAccumulateData: 10000,
  },
  {
    id: "3",
    loc: "C",
    date: "2024-01-01",
    dayAccumulateData: 10000,
    monthAccumulateData: 10000,
    yearAccumulateData: 10000,
  },
  {
    id: "3",
    loc: "C",
    date: "2024-01-01",
    dayAccumulateData: 10000,
    monthAccumulateData: 10000,
    yearAccumulateData: 10000,
  },
  {
    id: "3",
    loc: "C",
    date: "2024-01-01",
    dayAccumulateData: 10000,
    monthAccumulateData: 10000,
    yearAccumulateData: 10000,
  },
];

function FilterEntry({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <section className="w-full flex flex-col">
      <p className="text-sm font-thin">{name}</p>
      {children}
    </section>
  );
}

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 1, 1),
    to: new Date(),
  });

  return (
    <div className={cn("grid grid-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function CheckBoxList() {}

const phaseData = [
  {
    id: "p1",
    label: "p1",
  },
  {
    id: "p2",
    label: "p2",
  },
  {
    id: "p3",
    label: "p3",
  },
];

const columnData = [
  {
    id: "s1Ps2",
    label: "Scope 1 + Scope 2",
  },
  {
    id: "s1",
    label: "Scope 1",
  },
  {
    id: "s2",
    label: "Scope 2",
  },
  {
    id: "C02",
    label: "CO2",
  },
  {
    id: "CH4",
    label: "CH4",
  },
  {
    id: "N20",
    label: "N20",
  },
  {
    id: "HFCs",
    label: "HFCs",
  },
  {
    id: "PFCs",
    label: "PFCs",
  },
  {
    id: "SFG",
    label: "SFG",
  },
  {
    id: "NF3",
    label: "NF3",
  },
];

export default function Data() {
  return (
    <div className={"w-full h-svh grid grid-cols-4 grid-rows-1 gap-4"}>
      <div className="col-span-1">
        <DashboardCard className="w-full h-full">
          <DashboardCardHeader title={"篩選列表"} />
          <DashboardCardContent>
            <FilterEntry name={"版次"}>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="WSC/TSIA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>版次</SelectLabel>
                    <SelectItem value="WSC/TSIA">WSC/TSIA</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FilterEntry>
            <FilterEntry name={"版次"}>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="F1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>單位</SelectLabel>
                    <SelectItem value="F1">F1</SelectItem>
                    <SelectItem value="F2">F2</SelectItem>
                    <SelectItem value="F3">F3</SelectItem>
                    <SelectItem value="F4">F4</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FilterEntry>
            <FilterEntry name={"查詢時間"}>
              <DatePickerWithRange />
            </FilterEntry>
            <FilterEntry name="phase">
              <div className="flex flex-wrap justify-start items-center">
                {phaseData.map((data) => {
                  return (
                    <div
                      key={data.id}
                      className="flex justify-center items-center space-x-2 p-2"
                    >
                      <Checkbox id={data.id} />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {data.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            </FilterEntry>
            <FilterEntry name="col">
              <div className="flex flex-wrap justify-start items-center">
                {columnData.map((data) => {
                  return (
                    <div
                      key={data.id}
                      className="flex justify-center items-center space-x-2 p-2"
                    >
                      <Checkbox id={data.id} />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {data.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            </FilterEntry>
          </DashboardCardContent>
        </DashboardCard>
      </div>
      <div className="col-span-3">
        <DashboardCard className="w-full h-full">
          <DashboardCardHeader title={"GHG各廠區 原始數據"} />
          <DashboardCardContent>
            <DataTable columns={columns} data={tempRawData} />
          </DashboardCardContent>
        </DashboardCard>
      </div>
    </div>
  );
}
