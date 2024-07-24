import {
  AssetLocationEntity,
  getAssetLayerRules,
} from "@/domain/entities/Asset";
import { AssetType, getAssetType } from "@/domain/entities/AssetType";

interface AssetsDataModelInterface {
  _id: string | undefined;
  name: string;
  description: string | undefined;
  type: AssetType;
  ancestors: string[];
}

interface LocationDataModelInterface {
  lat: number | undefined;
  lon: number | undefined;
  addressLine1: string | undefined;
  addressLine2: string | undefined;
  city: string | undefined;
  country: string | undefined;
  zip: string | undefined;
}

interface MongoAssetLocationDataModel
  extends AssetsDataModelInterface,
    LocationDataModelInterface {}

export type { MongoAssetLocationDataModel };
// export { assetLocModelToEntity };
