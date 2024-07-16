import { AssetType } from "./AssetType";

interface AssetsDataInterface {
  id: string;
  name: string;
  description: string;
  type: AssetType;
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

interface WithParent {
  parent: string;
  parentType: AssetType;
}

interface WithChildren {
  children: string[];
  childrenType: AssetType;
}

interface AssetLocationData
  extends LocationDataInterface,
    AssetsDataInterface {}

interface OrganizationAssetLocData extends AssetLocationData, WithChildren {
  type: AssetType.Organization;
  parentType: AssetType.None;
  childrenType: AssetType.Site;
}

interface SiteAssetLocData extends AssetLocationData, WithParent, WithChildren {
  type: AssetType.Site;
  parentType: AssetType.Organization;
  childrenType: AssetType.Phase;
}

interface PhaseAssetLocData
  extends AssetLocationData,
    WithParent,
    WithChildren {
  type: AssetType.Phase;
  parentType: AssetType.Site;
  childrenType: AssetType.Department;
}

interface DeptAssetLocData extends AssetLocationData, WithParent, WithChildren {
  type: AssetType.Department;
  parentType: AssetType.Phase;
  childrenType: AssetType.None;
}

export type {
  AssetLocationData,
  OrganizationAssetLocData,
  SiteAssetLocData,
  PhaseAssetLocData,
  DeptAssetLocData,
  WithChildren,
  WithParent,
};
