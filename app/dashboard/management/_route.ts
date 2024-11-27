import { Route } from "../_route_type";

const base_route = "/dashboard/management";
const routes: Route[] = [
  { name: "工安KPI", route: "", subroute: [] },
  {
    name: "主管機關罰單",
    route: "/fines",
    subroute: [{ name: "主管機關罰單", route: "/fines", subroute: [] }],
  },
  { name: "事故", route: base_route + "/abnormal", subroute: [] },
  { name: "空汙", route: base_route + "/pollution", subroute: [] },
  { name: "工傷", route: base_route + "/injury", subroute: [] },
  { name: "施工", route: base_route + "/construction", subroute: [] },
  { name: "稽核", route: base_route + "/audit", subroute: [] },
  { name: "設備", route: base_route + "/equipment", subroute: [] },
  { name: "其他", route: base_route + "/others", subroute: [] },
];

export default routes;
