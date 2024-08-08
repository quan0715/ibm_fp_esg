import { MongoAssetDataModel } from "@/data/models/mongo/AssetModel";
import { AssetEntity } from "@/domain/entities/Asset";
import { AssetRepositoryInterface } from "@/domain/repository/AssetRepository";
import clientPromise from "@/lib/mongoClient";

const assetMondoDB = "AssetData";
const assetLocCollection = "Asset";
class AssetRepository implements AssetRepositoryInterface {
  createAssetData(data: AssetEntity): Promise<string> {
    throw new Error("Method not implemented.");
  }
  async retrieveAssetData(query?: any): Promise<AssetEntity[]> {
    const client = await clientPromise;
    const db = client.db(assetMondoDB);
    const collection = db.collection(assetLocCollection);

    let result = await collection
      .find(query)
      .map<AssetEntity>((doc) => {
        const model = new MongoAssetDataModel(
          doc._id,
          doc.name,
          doc.description,
          doc.type,
          doc.ancestors,
          doc.effectiveStartDate,
          doc.effectiveEndDate,
          doc.moveInDate,
          doc.moveOutDate,
          doc.product,
          doc.location
        );
        return model.toAssetEntity();
      })
      .toArray();

    return result;
  }
  updateAssetData(data: AssetEntity): Promise<AssetEntity> {
    throw new Error("Method not implemented.");
  }
  deleteAssetData(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { AssetRepository as MongoAssetRepository };
