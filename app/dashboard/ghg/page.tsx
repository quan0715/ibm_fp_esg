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

function BarChartCard(){
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart width={150} height={40} data={data}>
                <Bar dataKey="uv" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );

}

export default function Page() {
  return (
      <div className={"w-full h-full flex flex-col justify-start items-start space-y-2"}>
          <div className={"w-full h-full grid grid-cols-4 grid-rows-2 gap-4 "}>
              <div className={"col-span-1 row-span-1"}>
                <KPIDisplayBlock/>
              </div>
              <div className={"col-span-3 row-span-1"}>
                <OverviewLineChart/>
              </div>
              <div className={"col-span-1 row-span-2 bg-red-100"}>
                  <BarChartCard/>
              </div>
              <div className={"col-span-3 row-span-2 bg-yellow-100"}>
              </div>
          </div>
      </div>

  );
}
