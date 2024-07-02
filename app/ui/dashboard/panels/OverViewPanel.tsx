// 'use client'
// import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";
// import { LineChart, Line, AreaChart, XAxis, CartesianGrid, YAxis, Tooltip, Area, ResponsiveContainer, ComposedChart, Legend, Label } from 'recharts';
// const data = [
//   {name: '星期ㄧ', '上週累積發電量': 200, '累積發電量': 600},
//   {name: '星期二', '上週累積發電量': 1200, '累積發電量': 1400},
//   {name: '星期三', '上週累積發電量': 2480, '累積發電量': 3480},
//   {name: '星期四', '上週累積發電量': 3908, '累積發電量': 4908},
//   {name: '星期五', '上週累積發電量': 4800, '累積發電量': 5800},
//   {name: '星期六', '上週累積發電量': 3800, '累積發電量': 4800},
//   {name: '星期日', '上週累積發電量': 4300, '累積發電量': 5300},
// ];

// const dataHeader = [
//   'Asset Id', 'Type', 'Status', 'Notes'
// ]

// const dataBody = [
//   ['WTG001', 'Generator', 'Normal', 'No issues reported'],
//   ['WTG002', 'Company Vehicle - Truck', 'Normal', 'Oil change and tire rotation due'],
//   ['WTG003', 'Conference Room Projector', 'Normal', 'Bulb replacement needed, part ordered'],
//   ['WTG004', 'Wind Turbine', 'Normal', 'No issues reported'],
//   ['WTG004', 'Wind Turbine', 'Normal', 'No issues reported'],
// ]

// const overViewData = [
//   {
//     data: "45",
//     label: "風機數量 cnt",
//     icon: "mode_fan"
//   },
//   {
//     data: "125.56",
//     label: "發電量 (MW)",
//     icon: "electric_bolt"
//   },
//   {
//     data: "31.7",
//     label: "周圍溫度 ºC",
//     icon: "device_thermostat"
//   },
//   {
//     data: "30.7",
//     label: "海面溫度 ºC",
//     icon: "device_thermostat"
//   },
//   {
//     data: "15.4",
//     label: "風速 (m/s)",
//     icon: "speed"
//   },
//   {
//     data: "0.4",
//     label: "浪高（m）",
//     icon: "waves"
//   },
// ]

// function AreaChartPanel(){
//   return (
//         <div className="w-full max-w-md object-fill">
//           <ComposedChart
//             width={960}
//             height={320}
//             data={data}
//             margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//             <defs>
//               <linearGradient id="累積發電量" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#39ACFF" stopOpacity={0.8}/>
//                 <stop offset="95%" stopColor="#39ACFF" stopOpacity={0.25}/>
//               </linearGradient>
//               <linearGradient id="上週累積發電量" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#F2A757" stopOpacity={0.8}/>
//                 <stop offset="95%" stopColor="#F2A757" stopOpacity={0}/>
//               </linearGradient>
//             </defs>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <CartesianGrid strokeDasharray="3 3" />
//             <Tooltip />
//             <Area type="monotone" dataKey="上週累積發電量" stroke="#F2A757" fillOpacity={1} fill="url(#上週累積發電量)" />
//             <Line type="monotone" dataKey="累積發電量" stroke="#39ACFF" fillOpacity={1} fill="url(#累積發電量)" />
//             <Legend className="text-sm"/>
//           </ComposedChart>
//         </div>
//   )
// }

// function DataTableChart(){
//   return (
//     <Table
//           radius="none"
//           shadow="none"
//           isStriped={true}
//           // layout="fixed"
//           removeWrapper={true}
//           classNames={{
//             'th': 'bg-background text-sm border-b-1 border-primary',
//           }}
//         >
//           <TableHeader>
//             {
//               dataHeader.map((header, index) => {
//                 return (
//                   <TableColumn  key={index}>{header}</TableColumn>
//                 )
//               })
//             }
//           </TableHeader>
//           <TableBody>
//             {
//               dataBody.map((row, index) => {
//                 return (
//                   <TableRow key={index}>
//                     {
//                       row.map((cell, index) => {
//                         return (
//                           <TableCell key={index}>{cell}</TableCell>
//                         )
//                       })
//                     }
//                   </TableRow>
//                 )
//               })
//             }
//           </TableBody>
//         </Table>
//   )
// }

// export function OverViewPanel() {
//   return (
//     <div className="grid bg-background gap-5 md:p-4">
//       <DashboardCard
//         title={"快速監測數據"}
//         className="grid grid-row-1 row-start-1 col-start-1 col-end-3">
//           <div className="grid gap-1 md:grid-row-1">
//             {
//               overViewData.map((data, index) => {
//                 return (
//                   <div key={index} className={`row-start-${(index % 2) + 1} md:row-start-1 md:col-start-auto`}>
//                     <SingleDataCard key={index} data={data.data} label={data.label} icon={data.icon} />
//                   </div>
//                 )
//               })
//             }
//           </div>
//       </DashboardCard>
//       <DashboardCard title={"本週發電量趨勢"} className="row-start-2 col-start-1 col-end-3 md:row-start-2 md:col-start-1 md:col-end-2">
//         {/*<AreaChartPanel />*/}
//       </DashboardCard>
//       <DashboardCard title={"Asset 狀態簡表"} className="row-start-3 col-start-1 col-end-3 md:row-start-2 md:col-start-2 md:col-end-3">
//         <DataTableChart/>
//       </DashboardCard>
//       <DashboardCard title={"異常回報清單"} className="row-start-4 col-start-1 col-end-3 md:row-start-3 md:col-start-1 md:col-end-2">
//         <DataTableChart/>
//       </DashboardCard>
//       <DashboardCard title={"工單編號簡表"} className="row-start-5 col-start-1 col-end-3 md:row-start-3 md:col-start-2 md:col-end-3">
//         <DataTableChart/>
//       </DashboardCard>
//     </div>
//   )
// }
