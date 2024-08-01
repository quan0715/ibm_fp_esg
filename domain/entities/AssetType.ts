enum AssetType {
  Organization = "organization",
  Site = "site",
  Department = "department",
  System = "system",
  Subsystem = "subsystem",
  Route = "route",
  Operation = "operation",
  None = "none",
}

// convert string to enum
function getAssetType(type: string): AssetType {
  switch (type) {
    case "organization":
      return AssetType.Organization;
    case "site":
      return AssetType.Site;
    case "department":
      return AssetType.Department;
    case "system":
      return AssetType.System;
    case "subsystem":
      return AssetType.Subsystem;
    case "route":
      return AssetType.Route;
    case "operation":
      return AssetType.Operation;
    default:
      return AssetType.None;
  }
}

// the UI data to render the asset location data

// 資產層級規則
const AssetLayerRules = {
  [AssetType.Organization]: {
    parentType: AssetType.None,
  },
  [AssetType.Site]: {
    parentType: AssetType.Organization,
  },
  [AssetType.Department]: {
    parentType: AssetType.Site,
  },
  [AssetType.System]: {
    parentType: AssetType.Department,
  },
  [AssetType.Subsystem]: {
    parentType: AssetType.System,
  },
  [AssetType.Route]: {
    parentType: AssetType.Department,
  },
  [AssetType.Operation]: {
    parentType: AssetType.Route,
  },
  [AssetType.None]: {
    parentType: AssetType.None,
  },
};

// 獲取資產層級規則
export const getAssetLayerRules = (type: AssetType) => AssetLayerRules[type];

export const getAssetChildrenTypeOptions = (type: AssetType) => {
  let options = Object.keys(AssetLayerRules)
    .filter(
      (key) =>
        AssetLayerRules[key as AssetType].parentType === type &&
        key !== AssetType.None
    )
    .map((key) => key as AssetType);
  return options;
};

export { AssetType, getAssetType };
