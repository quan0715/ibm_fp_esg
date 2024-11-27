import { Route } from "./_route_type";
import env_savety_route from "./env_safety/_route";
import management_route from "./management/_route";

export const base_route = "/dashboard/";
const routes = [
  {
    name: "環境安全",
    route: base_route + "env_safety",
    subroute: env_savety_route satisfies Route[],
  },
  {
    name: "工作安全",
    route: base_route + "management",
    subroute: management_route satisfies Route[],
  },
];

export default routes;
