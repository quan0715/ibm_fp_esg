enum AssetType {
  tool = "Tool",
  component = "Component",
  none = "None",
}

type AssetTypeStrings = keyof typeof AssetType;

// map the string to Type

function getAssetType(type: string): AssetType {
  if (!Object.keys(AssetType).includes(type)) {
    return AssetType.none;
  }
  return AssetType[type as AssetTypeStrings];
}

const AssetLayerRules = {
  [AssetType.tool]: {
    parentType: AssetType.none,
  },
  [AssetType.component]: {
    parentType: AssetType.component,
  },
  [AssetType.none]: {
    parentType: AssetType.none,
  },
};

const getAssetLayerRules = (type: AssetType) => AssetLayerRules[type];

const getAssetChildrenTypeOptions = (type: AssetType) => {
  let options = Object.keys(AssetLayerRules)
    .filter(
      (key) =>
        AssetLayerRules[key as AssetType].parentType === type &&
        key !== AssetType.none
    )
    .map((key) => key as AssetType);
  return options;
};

export type { AssetTypeStrings };
export {
  AssetType,
  getAssetType,
  getAssetLayerRules,
  getAssetChildrenTypeOptions,
};
