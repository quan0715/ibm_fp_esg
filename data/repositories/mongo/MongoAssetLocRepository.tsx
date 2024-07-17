// The Asset Location d=Data Repository is responsible for CRUD operations on Asset Location data.
// The Class MongoAssetLocRepository implements the AssetLocRepository interface.
// And this Repository will connect to the MongoDB database.

import { AssetLocRepository } from "@/domain/repository/AssetLocRepository";
import { AssetLocationEntity } from "@/domain/entities/Asset";
import clientPromise from "@/lib/mongoClient";
import { assetLocModelToEntity } from "@/data/models/MongoAssetLocModel";
const assetMondoDB = "AssetData";
const assetLocCollection = "Location";
const logLabel = "MongoAssetLocRepository";
export class MongoAssetLocRepository implements AssetLocRepository {
  async createAssetLocData(data: any) {
    return data;
  }
  async retrieveAssetLocData(id?: string): Promise<AssetLocationEntity[]> {
    // get data by id, if id is undefined, get all data
    const client = await clientPromise;
    const db = client.db(assetMondoDB);
    const collection = db.collection(assetLocCollection);
    let result;
    if (id === undefined) {
      // get all data
      result = await collection.find().toArray();
      // console.log(logLabel, "retrieveAssetLocData", result);
    } else {
      result = await collection.findOne({
        id: id,
      });
      // console.log(logLabel, "retrieveAssetLocDataWithId", id, result);
    }
    if (!result) {
      throw new Error("Asset Location Data not found");
    }
    const resToEntity = result.map(assetLocModelToEntity);
    return resToEntity;
    // return result;
    // throw new Error("Method not implemented.");
  }
  async updateAssetLocData(data: any) {
    return data;

    throw new Error("Method not implemented.");
  }
  async deleteAssetLocData(id: string) {
    return id;
    throw new Error("Method not implemented.");
  }
}
