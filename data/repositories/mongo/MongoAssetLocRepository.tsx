// The Asset Location d=Data Repository is responsible for CRUD operations on Asset Location data.
// The Class MongoAssetLocRepository implements the AssetLocRepository interface.
// And this Repository will connect to the MongoDB database.

import { AssetLocRepository } from "@/domain/repository/AssetLocRepository";
import { AssetLocationEntity } from "@/domain/entities/Asset";
import clientPromise from "@/lib/mongoClient";
// import {
//   assetLocModelToEntity,
//   MongoAssetLocationDataModel,
// } from "@/data/models/MongoAssetLocModel";
import { AssetData } from "@/domain/entities/Asset";
import { ObjectId, WithId } from "mongodb";
import { MongoAssetLocationDataModel } from "@/data/models/MongoAssetLocModel";
const assetMondoDB = "AssetData";
const assetLocCollection = "Location";
const logLabel = "MongoAssetLocRepository";
export class MongoAssetLocRepository implements AssetLocRepository {
  async createAssetLocData(data: AssetLocationEntity) {
    const client = await clientPromise;
    const db = client.db(assetMondoDB);
    const collection = db.collection(assetLocCollection);
    // console.log(logLabel, "createAssetLocData", data);

    const res = await collection.insertOne({
      ...data,
      ancestors: data.ancestors.map((id) => id),
    });
    console.log(logLabel, "createAssetLocData", res);

    return res.insertedId.toString();
  }
  async retrieveAssetLocData(
    query: any = undefined
  ): Promise<AssetLocationEntity[]> {
    // get data by id, if id is undefined, get all data
    const client = await clientPromise;
    const db = client.db(assetMondoDB);
    const collection = db.collection(assetLocCollection);
    let result = await collection.find(query).toArray();

    if (!result) {
      throw new Error("Asset Location Data not found");
    }

    // console.log(logLabel, "retrieveAssetLocData", result);

    return result.map(AssetData.transferModelToEntity as any);
  }
  async updateAssetLocData(data: AssetLocationEntity) {
    console.log(logLabel, "updateAssetLocData", data);
    const client = await clientPromise;
    const db = client.db(assetMondoDB);
    const collection = db.collection(assetLocCollection);
    const res = await collection.updateOne(
      { _id: new ObjectId(data.id!) },
      { $set: data }
    );
    return data;
  }
  async deleteAssetLocData(id: string) {
    console.log(logLabel, "deleteAssetLocData", id);
    const client = await clientPromise;
    const db = client.db(assetMondoDB);
    const collection = db.collection(assetLocCollection);
    const res = await collection.deleteOne({ _id: new ObjectId(id) });
    console.log(logLabel, "deleteAssetLocData", res);
  }
}
