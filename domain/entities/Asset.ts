import { AssetType } from "./AssetType";

interface AssetsDataInterface {
  id: string;
  name: string;
  description: string;
  type: AssetType;
  parent: string | null;
  parentType: AssetType | null;
  children: string[] | null;
  childrenType: AssetType | null;
}

interface LocationDataInterface {
  lat: number | null;
  lon: number | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  country: string | null;
  zip: string | null;
}

export interface AssetLocationEntity
  extends LocationDataInterface,
    AssetsDataInterface {}

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
};

export const getAssetLayerRules = (type: AssetType) => {
  switch (type) {
    case AssetType.Organization:
      return AssetLayerRules[AssetType.Organization];
    case AssetType.Site:
      return AssetLayerRules[AssetType.Site];
    case AssetType.Phase:
      return AssetLayerRules[AssetType.Phase];
    case AssetType.Department:
      return AssetLayerRules[AssetType.Department];
    default:
      return { parentType: AssetType.None, childrenType: AssetType.None };
  }
};
