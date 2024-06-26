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
    YAxis
} from "recharts";
import React from "react";
import {DashboardCard, DashboardCardContent, DashboardCardHeader} from "@/app/dashboard/_blocks/DashboardCard";


export function PassYearKPIBarChart(){

    const data = [
        {
            year: '109 年',
            target: 439979,
            real: 1323456,
        },
        {
            year: '110 年',
            target: 329979,
            real: 1223456,
        },
        {
            year: '111 年',
            target: 359979,
            real: 1223456,
        },
        {
            year: '112 年',
            target: 219979,
            real: 1023456,
        },
        {
            year: '113 年',
            target: 319979,
            real: 1223456,
        },

    ];

    return (

    <DashboardCard className={"h-full"}>
        <DashboardCardHeader title={"近5年排放量指標"}/>
        <DashboardCardContent>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart width={150} height={40} data={data} >
                    <Tooltip />
                    <Legend
                        content={(props) => {
                            const { payload } = props;

                            return (
                                <div className={"w-full flex flex-row space-x-4 justify-center items-center"} >
                                    {
                                        payload?.map((entry, index) => (
                                            <div key={`item-${index}`} className={"flex flex-row justify-center items-center rounded-md space-x-2 px-3 py-[4px]"} style={
                                                {
                                                    backgroundColor: entry.color + "10"
                                                }
                                            }>
                                                <div id={"dot"} className={"w-2 h-2 rounded-full"} style={
                                                    {
                                                        backgroundColor: entry.color
                                                    }
                                                }></div>
                                                <div className={"text-sm text-gray-500 font-semibold"}>
                                                    {entry.value}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            );
                        }}
                    />
                    <XAxis axisLine={false} dataKey={'year'}/>
                    <Bar dataKey="target" fill="#4CC9F0" strokeWidth={2} name={'目標GHG排放濃度'} />
                    <Bar dataKey="real" fill="#4361EE" strokeWidth={2} name={'核可GHG排放濃度'}/>
                </BarChart>
            </ResponsiveContainer>
        </DashboardCardContent>
    </DashboardCard>
    );
}