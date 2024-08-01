import { MongoAssetLocationDataModel } from "@/data/models/MongoAssetLocModel";
import { AssetType, getAssetLayerRules, getAssetType } from "./AssetType";

// 定義資產和位置的介面
interface AssetsDataInterface {
  id: string | undefined;
  name: string;
  description: string | undefined;
  type: AssetType;
  ancestors: string[];
}

interface LocationDataInterface {
  lat: number | undefined;
  lon: number | undefined;
  addressLine1: string | undefined;
  addressLine2: string | undefined;
  city: string | undefined;
  country: string | undefined;
  zip: string | undefined;
}

// 資產位置實體介面，結合資產和位置介面
export interface AssetLocationEntity
  extends LocationDataInterface,
    AssetsDataInterface {}

// 資產數據類別
export class AssetData implements AssetLocationEntity {
  id: string | undefined;
  name: string;
  description: string | undefined;
  type: AssetType;
  ancestors: string[];
  lat: number | undefined;
  lon: number | undefined;
  addressLine1: string | undefined;
  addressLine2: string | undefined;
  city: string | undefined;
  country: string | undefined;
  zip: string | undefined;

  constructor({
    id,
    name,
    description,
    type,
    ancestors,
    lat,
    lon,
    addressLine1,
    addressLine2,
    city,
    country,
    zip,
  }: AssetLocationEntity) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.ancestors = ancestors;
    this.lat = lat;
    this.lon = lon;
    this.addressLine1 = addressLine1;
    this.addressLine2 = addressLine2;
    this.city = city;
    this.country = country;
    this.zip = zip;
  }

  // 從 MongoDB 模型轉換
  static fromMongoModel(model: MongoAssetLocationDataModel): AssetData {
    const assetType = getAssetType(model.type);
    const { parentType } = getAssetLayerRules(assetType);
    return new AssetData({
      id: model._id?.toString(),
      name: model.name,
      description: model.description,
      type: assetType,
      ancestors: model.ancestors,
      lat: model.lat,
      lon: model.lon,
      addressLine1: model.addressLine1,
      addressLine2: model.addressLine2,
      city: model.city,
      country: model.country,
      zip: model.zip,
    });
  }

  static transferModelToEntity(
    model: MongoAssetLocationDataModel
  ): AssetLocationEntity {
    let data = AssetData.fromMongoModel(model);
    return data.toEntity();
  }

  static fromEntity(entity: AssetLocationEntity): AssetData {
    return new AssetData(entity);
  }

  // 轉換為實體
  toEntity(): AssetLocationEntity {
    return { ...this };
  }

  // 轉換為 MongoDB 模型
  toMongoModel(): MongoAssetLocationDataModel {
    return {
      _id: this.id ?? undefined,
      name: this.name,
      description: this.description,
      ancestors: this.ancestors,
      type: this.type,
      lat: this.lat,
      lon: this.lon,
      addressLine1: this.addressLine1,
      addressLine2: this.addressLine2,
      city: this.city,
      country: this.country,
      zip: this.zip,
    };
  }

  // create a new asset data from type
  static createNew(type: AssetType, ancestors: string[] = []): AssetData {
    return new AssetData({
      id: undefined,
      name: `New ${type}`,
      description: "",
      type,
      ancestors: ancestors,
      lat: undefined,
      lon: undefined,
      addressLine1: undefined,
      addressLine2: undefined,
      city: undefined,
      country: undefined,
      zip: undefined,
    });
  }
}
