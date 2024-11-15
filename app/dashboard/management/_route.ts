export type TabNames =
  | "主管機關罰單"
  | "事故"
  | "空汙"
  | "工傷"
  | "施工"
  | "稽核"
  | "設備"
  | "其他"
  | "工安KPI";

const routes: { name: TabNames; route: string }[] = [
  { name: "工安KPI", route: "/" },
  { name: "主管機關罰單", route: "/authority" },
  { name: "事故", route: "/abnormal" },
  { name: "空汙", route: "/pollution" },
  { name: "工傷", route: "/injury" },
  { name: "施工", route: "/construction" },
  { name: "稽核", route: "/audit" },
  { name: "設備", route: "/equipment" },
  { name: "其他", route: "/others" },
];

export const name_route_map = new Map(routes.map((r) => [r.name, r.route]));
export const route_name_map = new Map(routes.map((r) => [r.route, r.name]));

export default routes;
