import { LocationType } from "@/domain/entities/LocationType";

type LocationTypeColor =
  | "blue"
  | "red"
  | "yellow"
  | "purple"
  | "green"
  | "gray";

type LocationEntityInfo = {
  color: LocationTypeColor; //hex color code
  label: string; //the label to be displayed
};
function getAssetEntityInfo(type: LocationType): LocationEntityInfo {
  switch (type) {
    case LocationType.organization:
      return { color: "red", label: "組織" };
    case LocationType.site:
      return { color: "blue", label: "廠區" };
    case LocationType.department:
      return { color: "purple", label: "部門" };
    case LocationType.system:
      return { color: "green", label: "系統" };
    case LocationType.subsystem:
      return { color: "green", label: "子系統" };
    case LocationType.route:
      return { color: "yellow", label: "Route" };
    case LocationType.operation:
      return { color: "yellow", label: "Operation" };
    default:
      return { color: "gray", label: "Unknown" };
  }
}
const colorVariants = {
  blue: {
    bgColor: "bg-blue-50 dark:bg-blue-900",
    leadingColor: "bg-blue-500 dark:bg-blue-500",
    textColor: "text-blue-500 dark:text-blue-500",
  },
  red: {
    bgColor: "bg-red-50 dark:bg-red-900",
    leadingColor: "bg-red-500 dark:bg-red-500",
    textColor: "text-red-500 dark:text-red-500",
  },
  yellow: {
    bgColor: "bg-yellow-50 dark:bg-yellow-900",
    leadingColor: "bg-yellow-700 dark:bg-yellow-500",
    textColor: "text-yellow-700 dark:text-yellow-500",
  },
  purple: {
    bgColor: "bg-purple-50 dark:bg-purple-900",
    leadingColor: "bg-purple-500 dark:bg-purple-500",
    textColor: "text-purple-500 dark:text-purple-500",
  },
  green: {
    bgColor: "bg-green-50 dark:bg-green-900",
    leadingColor: "bg-green-700 dark:bg-green-500",
    textColor: "text-green-700 dark:text-green-500",
  },
  gray: {
    bgColor: "bg-gray-50 dark:bg-gray-900",
    leadingColor: "bg-gray-500 dark:bg-gray-500",
    textColor: "text-gray-500 dark:text-gray-500",
  },
};
export type { LocationTypeColor };
export { getAssetEntityInfo, colorVariants };
