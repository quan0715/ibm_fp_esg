import { AssetType } from "@/domain/entities/AssetType";

type AssetTypeColor = "blue" | "red" | "yellow" | "purple" | "gray";

type AssetEntityInfo = {
  color: AssetTypeColor; //hex color code
  label: string; //the label to be displayed
};
function getAssetEntityInfo(type: AssetType): AssetEntityInfo {
  switch (type) {
    case AssetType.Organization:
      return { color: "red", label: "組織" };
    case AssetType.Site:
      return { color: "blue", label: "廠區" };
    case AssetType.Phase:
      return { color: "yellow", label: "Phase" };
    case AssetType.Department:
      return { color: "purple", label: "部門" };
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
    leadingColor: "bg-yellow-500 dark:bg-yellow-500",
    textColor: "text-yellow-500 dark:text-yellow-500",
  },
  purple: {
    bgColor: "bg-purple-50 dark:bg-purple-900",
    leadingColor: "bg-purple-500 dark:bg-purple-500",
    textColor: "text-purple-500 dark:text-purple-500",
  },
  gray: {
    bgColor: "bg-gray-50 dark:bg-gray-900",
    leadingColor: "bg-gray-500 dark:bg-gray-500",
    textColor: "text-gray-500 dark:text-gray-500",
  },
};
export type { AssetTypeColor };
export { getAssetEntityInfo, colorVariants };
