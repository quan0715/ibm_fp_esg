import { Route } from "../../_route_type";

const base_route = "/dashboard/env_safety/air-pollution";
const routes: Route[] = [
  {
    name: "環保設施許可證管理",
    route: base_route + "/unknown",
    subroute: [],
  },
  {
    name: "環保專責負責人",
    route: base_route + "/unknown1",
    subroute: [],
  },
];
export default routes;
