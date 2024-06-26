import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {DashboardCard, DashboardCardContent, DashboardCardHeader} from "@/app/dashboard/_blocks/DashboardCard";

const data = [
    {
        "year": "2010",
        "real": 59
    },
    {
        "year": "2011",
        "real": 71
    },
    {
        "year": "2012",
        "real": 79
    },
    {
        "year": "2013",
        "real": 87
    },
    {
        "year": "2014",
        "real": 102
    },
    {
        "year": "2015",
        "real": 116
    },
    {
        "year": "2016",
        "real": 114,
        "expected": 95
    },
    {
        "year": "2017",
        "real": 124,
        "expected": 114,
    },
    {
        "year": "2018",
        "real": 123,
        "expected": 124
    },
    {
        "year": "2019",
        "real": 136,
        "expected": 137,
    },
    {
        "year": "2020",
        "real": 160,
        "expected": 179,
        "target": 161,
    },
    {
        "year": "2021",
        "real": 178,
        "expected": 204,
        "target": 180
    },
    {
        "year": "2022",
        "real": 204,
        "expected": 241,
        "target": 210
    },
    {
        "year": "2023",
        "real": 231,
        "expected": 269,
        "target": 230
    },
    {
        "year": "2024",
        "expected": 327,
        "target": 279
    },
    {
        "year": "2025",
        "expected": 356,
        "target": 299
    },
    {
        "year": "2026",
        "expected": 415,
        "target": 346
    },
    {
        "year": "2027",
        "expected": 467,
        "target": 385
    },
    {
        "year": "2028",
        "expected": 514,
        "target": 419
    },
    {
        "year": "2029",
        "expected": 577,
        "target": 468
    },
    {
        "year": "2030",
        "expected": 607,
        "target": 486
    }
]
export function OverviewLineChart() {
    return (
    <DashboardCard className={"h-full"}>
        <DashboardCardHeader title={"2030碳排放減量計劃7年7%（scope1+scope2)"}/>
        <DashboardCardContent>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 10,
                        right: 20,
                        left: 20,
                        bottom: 10,
                    }}
                >
                    <CartesianGrid strokeDasharray="4 4" />
                    <XAxis dataKey="year" axisLine={false}/>
                    <YAxis hide/>
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
                    <Line type="monotone"
                          dataKey="real"
                          stroke="#4361EE"
                          legendType={'circle'}
                          strokeWidth={2}
                          name={"實際GHG排放量"}
                    />
                    <Line type="monotone" dataKey="target" name={"目標GHG排放濃量"} stroke="#D00000" strokeDasharray="5 5" legendType={'circle'} strokeWidth={2}
                    />
                    <Line type="monotone" dataKey="expected" name={"預期GHG排放量"} stroke="#4CC9F0" strokeDasharray="3 4 5 2" legendType={'circle'} strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </DashboardCardContent>
    </DashboardCard>
    );
}