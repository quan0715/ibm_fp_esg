enum LocationType {
  organization = "organization",
  site = "site",
  department = "department",
  system = "system",
  subsystem = "subsystem",
  route = "route",
  operation = "operation",
  none = "none",
}

type LocationTypeStrings = keyof typeof LocationType;

function getLocationType(type: string): LocationType {
  return LocationType[type as LocationTypeStrings];
}

// the UI data to render the asset location data

// 資產層級規則
const LocationLayerRules = {
  [LocationType.organization]: {
    parentType: LocationType.none,
  },
  [LocationType.site]: {
    parentType: LocationType.organization,
  },
  [LocationType.department]: {
    parentType: LocationType.site,
  },
  [LocationType.system]: {
    parentType: LocationType.department,
  },
  [LocationType.subsystem]: {
    parentType: LocationType.system,
  },
  [LocationType.route]: {
    parentType: LocationType.department,
  },
  [LocationType.operation]: {
    parentType: LocationType.route,
  },
  [LocationType.none]: {
    parentType: LocationType.none,
  },
};

// 獲取資產層級規則
export const getLocationLayerRules = (type: LocationType) =>
  LocationLayerRules[type];

export const getLocationChildrenTypeOptions = (type: LocationType) => {
  let options = Object.keys(LocationLayerRules)
    .filter(
      (key) =>
        LocationLayerRules[key as LocationType].parentType === type &&
        key !== LocationType.none
    )
    .map((key) => key as LocationType);
  return options;
};

export { LocationType, getLocationType };
