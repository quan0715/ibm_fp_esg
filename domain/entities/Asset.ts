import { AssetType } from "./AssetType";

interface AssetsDataInterface {
  id: string | null;
  name: string;
  description: string | undefined;
  type: AssetType;
  parent: string;
  parentType: AssetType;
  children: string[];
  childrenType: AssetType;
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

export const getNewAssetData = (type: AssetType): AssetLocationEntity => {
  const data = {
    id: null,
    name: "New Asset",
    description: undefined,
    type: type,
    parent: "",
    parentType: null,
    children: [],
    childrenType: null,
    lat: undefined,
    lon: undefined,
    addressLine1: undefined,
    addressLine2: undefined,
    city: undefined,
    country: undefined,
    zip: undefined,
  };
  return {
    ...data,
    ...getAssetLayerRules(type),
  };
};
