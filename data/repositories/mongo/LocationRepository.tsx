import { LocationRepositoryInterface } from "@/domain/repository/LocationRepository";
import { AssetLocationEntity } from "@/domain/entities/Location";
import clientPromise from "@/lib/mongoClient";
import { AssetData } from "@/domain/entities/Location";
import { ObjectId, WithId } from "mongodb";
const assetMondoDB = "AssetData";
const assetLocCollection = "Location";
const logLabel = "MongoAssetLocRepository";
export class MongoAssetLocRepository implements LocationRepositoryInterface {
  async createLocationData(data: AssetLocationEntity) {
    const client = await clientPromise;
    const db = client.db(assetMondoDB);
    const collection = db.collection(assetLocCollection);
    const res = await collection.insertOne({
      ...data,
      ancestors: data.ancestors.map((id) => id),
    });
    console.log(logLabel, "createAssetLocData", res);

    return res.insertedId.toString();
  }
  async retrieveLocationData(
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
  async updateLocationData(data: AssetLocationEntity) {
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
  async deleteLocationData(id: string) {
    console.log(logLabel, "deleteAssetLocData", id);
    const client = await clientPromise;
    const db = client.db(assetMondoDB);
    const collection = db.collection(assetLocCollection);
    const res = await collection.deleteOne({ _id: new ObjectId(id) });
    console.log(logLabel, "deleteAssetLocData", res);
  }
}
