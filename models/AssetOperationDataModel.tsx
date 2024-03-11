import { Asset } from "next/font/google";
import { z } from "zod";

export const OperationDataSchema = z.object({
    index: z.number(),
    children: z.array(z.number()).optional().default([]),// if negative then it's parent point to it self
    data: z.object({
        assetsName: z.string(),
        powerGeneration: z.number().optional().default(0),
        windSpeed: z.number().optional().default(0),
        temperature: z.number().optional().default(0),
        powerGenerationStatus : z.enum(["運轉中", "異常", "警告"]).optional().default("運轉中")
    }),
})
export type AssetOperationDataModel = z.infer<typeof OperationDataSchema>

export type AssetOperationDataTreeNodeModel = AssetOperationDataModel & { childrenNode: AssetOperationDataTreeNodeModel[]}
