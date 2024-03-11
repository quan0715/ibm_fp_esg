"use server"

import clientPromise from "@/lib/mongoClient";
import { AssetOperationDataModel } from "@/models/AssetOperationDataModel";

class OperationData {
   
    constructor(){
        console.log("OperationData")


    }

    toJson(){
    }

    fromJson(){
    }

}


export async function getOperationData(){
    console.log("getOperationData")
    const client = await clientPromise
    const db = client.db("operations")
    const collection = db.collection("operation_raw_data")
    const data = await collection.find({}).toArray()
    const mapping = data.map((item: any) => ({
        index: item.index,
        data: item.data,
    })) as AssetOperationDataModel[]
    
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
    return {data: data as AssetOperationDataModel[]}
}