enum AssetType {
  Organization = "organization",
  Site = "site",
  Phase = "phase",
  Department = "department",
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
    default:
      return AssetType.None;
  }
}

function getAssetDataTypes() {
  return Object.values(AssetType);
}

// the UI data to render the asset location data

export { AssetType, getAssetType };
