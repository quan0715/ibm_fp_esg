enum AssetType {
  Organization = "organization",
  Site = "site",
  Phase = "phase",
  Department = "department",
  None = "none",
}

// the UI data to render the asset location data
type AssetEntityInfo = {
  color: string; //hex color code
  label: string; //the label to be displayed
};

function getAssetEntityInfo(type: AssetType): AssetEntityInfo {
  switch (type) {
    case AssetType.Organization:
      return { color: "green", label: "組織" };
    case AssetType.Site:
      return { color: "blue", label: "廠區" };
    case AssetType.Phase:
      return { color: "yellow", label: "Phase" };
    case AssetType.Department:
      return { color: "purple", label: "部門" };
    default:
      return { color: "gray", label: "Unknown" };
  }
}

export { AssetType, getAssetEntityInfo };
