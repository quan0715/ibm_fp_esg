import { Route } from "../_route_type";

const base_route = "/dashboard/env_safety";
const routes: Route[] = [
  { name: "環保KPI", route: base_route + "", subroute: [] },
  { name: "主管機關罰單", route: base_route + "/fines", subroute: [] },
  { name: "異常管理", route: base_route + "/abnormal", subroute: [] },
  { name: "空汙", route: base_route + "/air-pollution", subroute: [] },
  { name: "溫室氣體", route: base_route + "/greenhouse-gas", subroute: [] },
  { name: "廢棄物", route: base_route + "/waste", subroute: [] },
  { name: "毒化物", route: base_route + "/hazardous-materials", subroute: [] },
  { name: "土壤地下水", route: base_route + "/soil-groundwater", subroute: [] },
  { name: "海汙", route: base_route + "/marine-pollution", subroute: [] },
  { name: "證照管理", route: base_route + "/license-management", subroute: [] },
  {
    name: "節水節能",
    route: base_route + "/water-energy-saving",
    subroute: [
      {
        name: "證照管理",
        route: base_route + "/license-management",
        subroute: [],
      },
    ],
  },
];

export default routes;
