export type TabNames =
  | "主管機關罰單"
  | "異常管理"
  | "空汙"
  | "溫室氣體"
  | "廢棄物"
  | "毒化物"
  | "土壤地下水"
  | "海汙"
  | "證照管理"
  | "節水節能"
  | "環保KPI";

const routes: { name: TabNames; route: string }[] = [
  { name: "主管機關罰單", route: "/authority" },
  { name: "異常管理", route: "/abnormal" },
  { name: "空汙", route: "/air-pollution" },
  { name: "溫室氣體", route: "/greenhouse-gas" },
  { name: "廢棄物", route: "/waste" },
  { name: "毒化物", route: "/hazardous-materials" },
  { name: "土壤地下水", route: "/soil-groundwater" },
  { name: "海汙", route: "/marine-pollution" },
  { name: "證照管理", route: "/license-management" },
  { name: "節水節能", route: "/water-energy-saving" },
  { name: "環保KPI", route: "/environmental-kpi" },
];

export default routes;
