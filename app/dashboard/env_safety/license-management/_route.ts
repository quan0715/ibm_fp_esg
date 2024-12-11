import { Route } from "../../_route_type";

const base_route = "/dashboard/env_safety/license-management";
const routes: Route[] = [
  {
    name: "環保設施許可證管理",
    route: base_route + "/license-management-page",
    subroute: [],
  },
  {
    name: "環保專責負責人",
    route: base_route + "/license-responsible-staff",
    subroute: [],
  },
];
export default routes;
