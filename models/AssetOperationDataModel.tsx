import { get } from "http";
import { Asset } from "next/font/google";
import { nullable, z } from "zod";

const AssetOperationDataSchema = z.object({
    index: z.number(),
    assetName: z.string(),
    level: z.number(),
    expandable: z.boolean().optional().default(false),
    childrenIndex: z.array(z.number()).optional().default([]),
    // parentIndex: z.number().optional().default(-1),
    data: z.object({
        powerGeneration: z.number().optional().default(0),
        windSpeed: z.number().optional().default(0),
        temperature: z.number().optional().default(0),
        powerGenerationStatus : z.enum(["運轉中", "異常", "警告"]).optional().default("運轉中").nullable(),
    }),
})

const GroupAssetOperationDataSchema = z.object({
    index: z.number(), // groupIndex
    groupName: z.string(),
    assetIndex: z.number().optional().default(-1), // if negative then it's a group node
     // if it contain none null value then it's a leaf node mapping to single asset data
    groupParentIndex: z.number().optional().default(-1), // if negative then it's parent point to it self
    // level: z.number().optional().default(0)
})

type AssetOperationDataSchemaModel = z.infer<typeof AssetOperationDataSchema>

type GroupAssetOperationDataSchemaModel = z.infer<typeof GroupAssetOperationDataSchema>

class GroupAssetOperationDataNodeModel{
    
    index: number = -1
    groupName: string = ""
    assetData: AssetOperationDataSchemaModel | null = null
    level : number = 0
    children: GroupAssetOperationDataNodeModel[]

    constructor(
        index: number, 
        groupName: string, 
        assetData: AssetOperationDataSchemaModel | null,
        level: number,
        children: GroupAssetOperationDataNodeModel[]){
        this.index = index
        this.groupName = groupName
        this.assetData = assetData
        this.children = children
        this.level = level
    }

    static createRootNode() : GroupAssetOperationDataNodeModel{
        return new GroupAssetOperationDataNodeModel(-1, "root", null, 0, [])
    }

    addChild(node: GroupAssetOperationDataNodeModel){
        this.children.push(node)
    }

    buildTree(
        dataList: GroupAssetOperationDataSchemaModel[],
        assetDataList: AssetOperationDataSchemaModel[] 
        ) : GroupAssetOperationDataSchemaModel[]{
        
        var LinkedNode = dataList.filter((item) => item.groupParentIndex === this.index)
        var unLinkedNode = dataList.filter((item) => item.groupParentIndex !== this.index)

        LinkedNode.forEach((item) => {
            const assetData = assetDataList.find((asset) => asset.index === item.assetIndex) ?? null 
            const node = new GroupAssetOperationDataNodeModel(
                item.index,
                item.groupName,
                assetData,
                this.level +1,
                []
            )
            if(item.assetIndex === -1){
                unLinkedNode = node.buildTree(unLinkedNode, assetDataList)
            }
            this.addChild(node)
        })
        return unLinkedNode
    }

    log(){
        console.log("  ".repeat(this.level) + this.groupName + " - (" + this.index + " assets: " + this.assetData?.index ?? "null" + ")" )
        // console.log(this)
        var sortedList = this.children.sort((a, b) => a.index - b.index)
        for(var i = 0; i < sortedList.length; i++){
            sortedList[i].log()
        }
    }

    getSumOfPowerGeneration() : number{
        var sum = this.assetData?.data.powerGeneration ?? 0
        this.children.forEach((item) => {
            sum += item.getSumOfPowerGeneration()
        })
        return sum
    }

    getAverageOfWindSpeed() : number{
        var res = this.assetData?.data.windSpeed ?? 0
        var count = 1
        this.children.forEach((item) => {
            var avg = item.getAverageOfWindSpeed()
            if(avg > 0){
                res += avg
                count += 1
            }
        })
        return Math.round(res / count,)
    }

    getAverageOfTemperature() : number{
        var res = this.assetData?.data.temperature ?? 0
        var count = 1
        this.children.forEach((item) => {
            var avg = item.getAverageOfTemperature()
            if(avg > 0){
                res += avg
                count += 1
            }
        })
        return  Math.round(res / count,)
    }

    getAllChildrenIndex() : number[]{
        var result: number[] = []
        result.push(this.index)
        this.children.forEach((item) => {
            result = result.concat(item.getAllChildrenIndex())
        })
        return result
    }

    toList(mappingList: AssetOperationDataSchemaModel[]): AssetOperationDataSchemaModel[]{
        var result: AssetOperationDataSchemaModel[] = []
        result.push({
            index: this.index,
            assetName: this.groupName,
            level: this.level,
            expandable: this.children.length > 0,
            // parentIndex: parentIndex,
            // childrenIndex: this.getAllChildrenIndex(),
            childrenIndex: this.children.map((item) => item.index),
            data: this.assetData?.data ?? {
                powerGeneration: this.getSumOfPowerGeneration(),
                // windSpeed: this.getAverageOfWindSpeed(),
                windSpeed: -1,
                temperature: -1,
                // temperature: this.getAverageOfTemperature(),
                powerGenerationStatus: null
            }
        })
        this.children.forEach((item) => {
            result = result.concat(item.toList(mappingList))
        })
        return result
    }
}

export {
    AssetOperationDataSchema,
    GroupAssetOperationDataSchema,
    GroupAssetOperationDataNodeModel
}

export type {
    AssetOperationDataSchemaModel,
    GroupAssetOperationDataSchemaModel,
}