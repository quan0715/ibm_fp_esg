enum AssetType {
  Organization = "organization",
  Site = "site",
  Phase = "phase",
  Department = "department",
  System = "system",
  None = "none",
}

// convert string to enum
function getAssetType(type: string): AssetType {
  switch (type) {
    case "organization":
      return AssetType.Organization;
    case "site":
      return AssetType.Site;
    case "phase":
      return AssetType.Phase;
    case "department":
      return AssetType.Department;
    case "system":
      return AssetType.System;
    default:
      return AssetType.None;
  }
}

// the UI data to render the asset location data

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
    childrenType: AssetType.System,
  },
  [AssetType.System]: {
    parentType: AssetType.Department,
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

export { AssetType, getAssetType };
