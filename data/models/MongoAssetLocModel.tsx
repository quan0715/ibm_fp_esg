import {
  AssetLocationEntity,
  getAssetLayerRules,
} from "@/domain/entities/Asset";
import { AssetType } from "@/domain/entities/AssetType";

type AssetDataType = "org" | "site" | "phase" | "dept";

interface AssetsDataModelInterface {
  id: string;
  name: string;
  description: string;
  type: AssetDataType;
  parent: string | null;
  parentType: AssetDataType | null;
  children: string[] | null;
  childrenType: AssetDataType | null;
}

interface LocationDataModelInterface {
  lat: number | null;
  lon: number | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  country: string | null;
  zip: string | null;
}

interface MongoAssetLocationDataModel
  extends AssetsDataModelInterface,
    LocationDataModelInterface {}

function assetTypeDto(type: AssetDataType | null): AssetType {
  switch (type) {
    case "org":
      return AssetType.Organization;
    case "site":
      return AssetType.Site;
    case "phase":
      return AssetType.Phase;
    case "dept":
      return AssetType.Department;
    default:
      return AssetType.None;
  }
}

function assetLocModelToEntity(
  model: MongoAssetLocationDataModel
): AssetLocationEntity {
  const assetType = assetTypeDto(model.type);
  const parentType = getAssetLayerRules(assetType).parentType;
  const childrenType = getAssetLayerRules(assetType).childrenType;
  return {
    id: model.id,
    name: model.name,
    description: model.description,
    type: assetTypeDto(model.type),
    parent: model.parent,
    parentType: parentType,
    children: model.children,
    childrenType: childrenType,
    lat: model.lat,
    lon: model.lon,
    addressLine1: model.addressLine1,
    addressLine2: model.addressLine2,
    city: model.city,
    country: model.country,
    zip: model.zip,
  } as AssetLocationEntity;
}

export type { MongoAssetLocationDataModel };
export { assetLocModelToEntity };
