import { Route } from "../../_route_type";

const base_route = "/dashboard/env_safety/air-pollution";
const routes: Route[] = [
  {
    name: "固定污染源排放管道檢測",
    route: base_route + "/unknown",
    subroute: [],
  },
  {
    name: "廢氣燃燒塔使用",
    route: base_route + "/unknown1",
    subroute: [],
  },
  {
    name: "設備元件VOC檢測",
    route: base_route + "/unknown2",
    subroute: [],
  },
  {
    name: "生煤、石油焦或其他易致空氣污染物申報",
    route: base_route + "/unknown3",
    subroute: [],
  },
  {
    name: "CEMS連續自動監測",
    route: base_route + "/unknown4",
    subroute: [],
  },
  {
    name: "空氣污染物排放量管理暨空污費申報系統",
    route: base_route + "/unknown5",
    subroute: [],
  },
  {
    name: "冷卻水塔水質定期檢測",
    route: base_route + "/unknown6",
    subroute: [],
  },
  {
    name: "固定污染源排放管道檢測",
    route: base_route + "/unknown7",
    subroute: [],
  },
];
export default routes;
