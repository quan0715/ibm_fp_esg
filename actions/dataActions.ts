"use server"

import clientPromise from "@/lib/mongoClient";
import { 
    GroupAssetOperationDataSchemaModel,
    AssetOperationDataSchemaModel 
} from "@/models/AssetOperationDataModel";


async function getMongoDbData({ dbName, collectionName, query = {}} : {dbName: string, collectionName: string, query: any}){
    const client = await clientPromise
    const db = client.db(dbName)
    const collection = db.collection(collectionName)
    const data = await collection.find(query).toArray()
    return data
}

export async function getMonitoringGroupData(){
    const data = await getMongoDbData({
        dbName: "operations",
        collectionName: "monitoring_group",
        query: {}})
    
    const mapping = data.map((item: any) => ({
        index: item.index,
        groupName: item.groupName,
        groupParentIndex: item.groupParentIndex,
        assetIndex: item.assetIndex
    })) as GroupAssetOperationDataSchemaModel[]

    return mapping
}

export async function getOperationData(){
    console.log("getOperationData")

    const data = await getMongoDbData({
        dbName: "operations",
        collectionName: "operation_raw_data",
        query: {}})
    
    const mapping = data.map((item: any) => ({
        assetName: item.assetName,
        index: item.index,
        data: item.data,
    })) as AssetOperationDataSchemaModel[]
    
   return {data: mapping}
}

export async function updateOperationData(data: [any]){
    console.log("updateOperationData")
    const client = await clientPromise
    const db = client.db("operations")
    const collection = db.collection("operation_raw_data")
    for(var i = 0; i < data.length; i++){
        var item = await collection.findOne({index: data[i].index})
        if(item){
            await collection.updateOne(
                {index: data[i].index}, 
                {$set: data[i]},
                {upsert: true}
            )
        }
        else{
            collection.insertOne(data[i])
        } 
    }
    return {data: data as AssetOperationDataSchemaModel[]}
}