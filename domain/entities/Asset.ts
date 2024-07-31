import { MongoAssetLocationDataModel } from "@/data/models/MongoAssetLocModel";
import { AssetType, getAssetType } from "./AssetType";

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

// 資產層級規則
const AssetLayerRules = {
  [AssetType.Organization]: {
    parentType: AssetType.None,
    childrenType: AssetType.Site,
  },
  [AssetType.Site]: {
    parentType: AssetType.Organization,
    childrenType: AssetType.Phase,
  },
  [AssetType.Phase]: {
    parentType: AssetType.Site,
    childrenType: AssetType.Department,
  },
  [AssetType.Department]: {
    parentType: AssetType.Phase,
    childrenType: AssetType.None,
  },
  [AssetType.None]: {
    parentType: AssetType.None,
    childrenType: AssetType.None,
  },
};

// 獲取資產層級規則
export const getAssetLayerRules = (type: AssetType) =>
  AssetLayerRules[type] || {
    parentType: AssetType.None,
    childrenType: AssetType.None,
  };

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

  static getAssetLayerRules = (type: AssetType) =>
    AssetLayerRules[type] || {
      parentType: AssetType.None,
      childrenType: AssetType.None,
    };

  // 從 MongoDB 模型轉換
  static fromMongoModel(model: MongoAssetLocationDataModel): AssetData {
    const assetType = getAssetType(model.type);
    const { parentType, childrenType } = getAssetLayerRules(assetType);
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
      name: "",
      description: undefined,
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
