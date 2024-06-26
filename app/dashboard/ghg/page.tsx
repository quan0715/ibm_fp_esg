'use client';
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {LuPlus, LuArrowLeft, LuRefreshCcw, LuSaveAll, LuArrowRight} from "react-icons/lu";
import { Separator } from "@/components/ui/separator"
import React, { PureComponent } from 'react';
import { BarChart, Bar, ResponsiveContainer } from 'recharts';
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Skeleton} from "@/components/ui/skeleton";
import {KPIDisplayBlock} from "@/app/dashboard/ghg/_blocks/KPIDisplayBlock";
import {OverviewLineChart} from "@/app/dashboard/ghg/_blocks/OverviewLineChart";
import {PassYearKPIBarChart} from "@/app/dashboard/ghg/_blocks/PassYearKPIBarChart";
import {ByLocKPIBarChart} from "@/app/dashboard/ghg/_blocks/ByLocKPIBarChart";



export default function Page() {
  return (
      <div className={"w-full h-full flex flex-col justify-start items-start space-y-2"}>
          <div className={"w-full h-full grid grid-cols-4 grid-rows-2 gap-4 "}>
              <div className={"col-span-1 row-span-1"}>
                <KPIDisplayBlock/>
              </div>
              <div className={"col-span-3 row-span-1 bg-blue-100"}>
                <OverviewLineChart/>
              </div>
              <div className={"col-span-1 row-span-2 bg-red-100"}>
                  <PassYearKPIBarChart/>
              </div>
              <div className={"col-span-3 row-span-2 bg-yellow-100"}>
                  <ByLocKPIBarChart/>
              </div>
          </div>
      </div>

  );
}
