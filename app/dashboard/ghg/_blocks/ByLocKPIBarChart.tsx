import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import React from "react";
import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardHeader,
} from "@/app/dashboard/_blocks/DashboardCard";

export function ByLocKPIBarChart() {
  const data = [
    {
      loc: "F1",
      target: 419979,
      real: 1323456,
    },
    {
      loc: "F2",
      target: 129979,
      real: 1023456,
    },
    {
      loc: "FAC",
      target: 419979,
      real: 923456,
    },
    {
      loc: "TWC",
      target: 519979,
      real: 1123456,
    },
    {
      loc: "HXD",
      target: 319979,
      real: 843456,
    },
    {
      loc: "P1",
      target: 419979,
      real: 1323456,
    },
    {
      loc: "P3",
      target: 419979,
      real: 1323456,
    },
    {
      loc: "PWQ",
      target: 129979,
      real: 1023456,
    },
    {
      loc: "W4",
      target: 319979,
      real: 843456,
    },
    {
      loc: "W3",
      target: 419979,
      real: 1323456,
    },
    {
      loc: "Q3",
      target: 119979,
      real: 1113456,
    },
    {
      loc: "UIO",
      target: 419979,
      real: 1323456,
    },
    {
      loc: "UIT",
      target: 419979,
      real: 1323456,
    },
    {
      loc: "F1",
      target: 119979,
      real: 1113456,
    },
    {
      loc: "F2",
      target: 319979,
      real: 843456,
    },
    {
      loc: "F3",
      target: 619979,
      real: 923456,
    },
  ];

  return (
    <DashboardCard className={"h-full"}>
      <DashboardCardHeader title={"近5年排放量指標"} />
      <DashboardCardContent>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={150} height={40} data={data}>
            <Tooltip />
            <Legend
              content={(props) => {
                const { payload } = props;

                return (
                  <div
                    className={
                      "w-full flex flex-row space-x-4 justify-center items-center"
                    }
                  >
                    {payload?.map((entry, index) => (
                      <div
                        key={`item-${index}`}
                        className={
                          "flex flex-row justify-center items-center rounded-md space-x-2 px-3 py-[4px]"
                        }
                        style={{
                          backgroundColor: entry.color + "10",
                        }}
                      >
                        <div
                          id={"dot"}
                          className={"w-2 h-2 rounded-full"}
                          style={{
                            backgroundColor: entry.color,
                          }}
                        ></div>
                        <div className={"text-sm text-gray-500 font-semibold"}>
                          {entry.value}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }}
            />
            <XAxis axisLine={false} dataKey={"loc"} />
            <Bar dataKey="target" fill="#7E27B6" name={"目標GHG排放濃度"} />
            <Bar dataKey="real" fill="#FFBA08" name={"核可GHG排放濃度"} />
            {/*<Bar dataKey="percentage" fill="#5590FF" strokeWidth={2} name={'目標達成率 '} />*/}
          </BarChart>
        </ResponsiveContainer>
      </DashboardCardContent>
    </DashboardCard>
  );
}
