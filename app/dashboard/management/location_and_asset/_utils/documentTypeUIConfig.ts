import { DocumentObjectType } from "@/domain/entities/Document";
import { getDocumentTypeLayerDepth } from "@/domain/entities/DocumentConfig";
import { text } from "stream/consumers";

type DocumentTypeColor =
  | "blue"
  | "red"
  | "yellow"
  | "purple"
  | "green"
  | "orange"
  | "stone"
  | "gray";

const colorSchema: DocumentTypeColor[] = [
  "blue",
  "green",
  "purple",
  "orange",
  "red",
  "yellow",
  "stone",
];

export function getDocumentTypeColor(type: DocumentObjectType) {
  let depth = getDocumentTypeLayerDepth(type);
  let color = colorSchema[(depth - 1) % colorSchema.length];
  return colorVariants[color];
}

const colorVariants = {
  blue: {
    bgColor: "bg-blue-50 dark:bg-blue-900",
    hoveringColor: "hover:bg-blue-100 dark:hover:bg-blue-800",
    leadingColor: "bg-blue-500 dark:bg-blue-500",
    textColor: "text-blue-500 dark:text-blue-500",
    textHoveringColor: "hover:text-blue-700 dark:hover:text-blue-500",
  },
  red: {
    bgColor: "bg-red-50 dark:bg-red-900",
    hoveringColor: "hover:bg-red-100 dark:hover:bg-red-800",
    leadingColor: "bg-red-500 dark:bg-red-500",
    textColor: "text-red-500 dark:text-red-500",
    textHoveringColor: "hover:text-red-700 dark:hover:text-red-500",
  },
  yellow: {
    bgColor: "bg-yellow-50 dark:bg-yellow-900",
    hoveringColor: "hover:bg-yellow-100 dark:hover:bg-yellow-800",
    leadingColor: "bg-yellow-700 dark:bg-yellow-500",
    textColor: "text-yellow-700 dark:text-yellow-500",
    textHoveringColor: "hover:text-yellow-900 dark:hover:text-yellow-500",
  },
  orange: {
    bgColor: "bg-orange-50 dark:bg-orange-900",
    hoveringColor: "hover:bg-orange-100 dark:hover:bg-orange-800",
    leadingColor: "bg-orange-500 dark:bg-orange-500",
    textColor: "text-orange-500 dark:text-orange",
    textHoveringColor: "hover:text-orange-700 dark:hover:text-orange-500",
  },
  purple: {
    bgColor: "bg-purple-50 dark:bg-purple-900",
    hoveringColor: "hover:bg-purple-100 dark:hover:bg-purple-800",
    leadingColor: "bg-purple-500 dark:bg-purple-500",
    textColor: "text-purple-500 dark:text-purple-500",
    textHoveringColor: "hover:text-purple-700 dark:hover:text-purple-500",
  },
  green: {
    bgColor: "bg-green-50 dark:bg-green-900",
    hoveringColor: "hover:bg-green-100 dark:hover:bg-green-800",
    leadingColor: "bg-green-700 dark:bg-green-500",
    textColor: "text-green-700 dark:text-green-500",
    textHoveringColor: "hover:text-green-900 dark:hover:text-green-500",
  },
  gray: {
    bgColor: "bg-gray-50 dark:bg-gray-900",
    hoveringColor: "hover:bg-gray-100 dark:hover:bg-gray-800",
    leadingColor: "bg-gray-500 dark:bg-gray-500",
    textColor: "text-gray-500 dark:text-gray-500",
    textHoveringColor: "hover:text-gray-700 dark:hover:text-gray-500",
  },
  stone: {
    bgColor: "bg-stone-50 dark:bg-stone-900",
    hoveringColor: "hover:bg-stone-100 dark:hover:bg-stone-800",
    leadingColor: "bg-stone-500 dark:bg-stone-500",
    textColor: "text-stone-500 dark:text-stone-300",
    textHoveringColor: "hover:text-stone-700 dark:hover:text-stone-500",
  },
};
export type { DocumentTypeColor };
export { colorVariants };
