import { DocumentObjectType } from "@/domain/entities/Document";

type DocumentTypeColor =
  | "blue"
  | "red"
  | "yellow"
  | "purple"
  | "green"
  | "orange"
  | "stone"
  | "gray";

type ObjectUIConfig = {
  color: DocumentTypeColor; //hex color code
  label: string; //the label to be displayed
};

export function getDocumentEntityUIConfig(
  type: DocumentObjectType
): ObjectUIConfig {
  switch (type) {
    case DocumentObjectType.organization:
      return { color: "red", label: "組織" };
    case DocumentObjectType.site:
      return { color: "blue", label: "廠區" };
    case DocumentObjectType.department:
      return { color: "purple", label: "部門" };
    case DocumentObjectType.system:
      return { color: "green", label: "系統" };
    case DocumentObjectType.subSystem:
      return { color: "green", label: "子系統" };
    case DocumentObjectType.route:
      return { color: "yellow", label: "Route" };
    case DocumentObjectType.operation:
      return { color: "yellow", label: "Operation" };
    case DocumentObjectType.component:
      return { color: "green", label: "子資產" };
    case DocumentObjectType.tool:
      return { color: "blue", label: "資產" };
    case DocumentObjectType.unknown:
      return { color: "gray", label: "Unknown" };
  }
}

export function getDocumentTypeColor(type: DocumentObjectType) {
  return colorVariants[getDocumentEntityUIConfig(type).color];
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
  orange: {
    bgColor: "bg-orange -50 dark:bg-orange-900",
    leadingColor: "bg-orange-500 dark:bg-orange-500",
    textColor: "text-orange-500 dark:text-orange",
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
  stone: {
    bgColor: "bg-stone-50 dark:bg-stone-900",
    leadingColor: "bg-stone-500 dark:bg-stone-500",
    textColor: "text-stone-500 dark:text-stone-300",
  },
};
export type { DocumentTypeColor };
export { colorVariants };
