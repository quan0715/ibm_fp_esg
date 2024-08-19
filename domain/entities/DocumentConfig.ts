import {
  DocumentGroupType,
  DocumentObjectType,
  DocumentTypeString,
} from "./Document";

type Rule = {
  group: DocumentGroupType;
  parentType: DocumentObjectType;
};

const DocumentTypeRule: {
  [key in DocumentObjectType]: Rule;
} = {
  [DocumentObjectType.organization]: {
    group: DocumentGroupType.Location,
    parentType: DocumentObjectType.unknown,
  },
  [DocumentObjectType.site]: {
    group: DocumentGroupType.Location,
    parentType: DocumentObjectType.organization,
  },
  [DocumentObjectType.department]: {
    group: DocumentGroupType.Location,
    parentType: DocumentObjectType.site,
  },
  [DocumentObjectType.system]: {
    group: DocumentGroupType.Location,
    parentType: DocumentObjectType.department,
  },
  [DocumentObjectType.subSystem]: {
    group: DocumentGroupType.Location,
    parentType: DocumentObjectType.system,
  },
  [DocumentObjectType.route]: {
    group: DocumentGroupType.Location,
    parentType: DocumentObjectType.department,
  },
  [DocumentObjectType.operation]: {
    group: DocumentGroupType.Location,
    parentType: DocumentObjectType.route,
  },
  [DocumentObjectType.tool]: {
    group: DocumentGroupType.Asset,
    parentType: DocumentObjectType.unknown,
  },
  [DocumentObjectType.component]: {
    group: DocumentGroupType.Asset,
    parentType: DocumentObjectType.tool,
  },
  [DocumentObjectType.meter]: {
    group: DocumentGroupType.Meter,
    parentType: DocumentObjectType.unknown,
  },
  [DocumentObjectType.unknown]: {
    group: DocumentGroupType.Root,
    parentType: DocumentObjectType.unknown,
  },
};

export const getDocumentLayerRules = (type: DocumentObjectType) =>
  DocumentTypeRule[type];

export const getDocumentChildrenTypeOptions = (
  type: DocumentObjectType,
  group: DocumentGroupType
) => {
  let options = Object.keys(DocumentTypeRule)
    .filter(
      (key) =>
        DocumentTypeRule[key as DocumentObjectType].parentType === type &&
        DocumentTypeRule[key as DocumentObjectType].group === group &&
        key !== DocumentObjectType.unknown
    )
    .map((key) => key as DocumentObjectType);
  return options;
};

export const getDocumentObjectType = (
  typeString: string
): DocumentObjectType => {
  if (!Object.keys(DocumentObjectType).includes(typeString)) {
    return DocumentObjectType.unknown;
  }
  return DocumentObjectType[typeString as DocumentTypeString];
};

export const getDocumentGroupTypeList = (group?: DocumentGroupType) => {
  if (group === undefined) {
    return Object.keys(DocumentTypeRule).map(
      (key) => key as DocumentObjectType
    );
  }
  let options = Object.keys(DocumentTypeRule)
    .filter(
      (key) => DocumentTypeRule[key as DocumentObjectType].group === group
    )
    .map((key) => key as DocumentObjectType);
  return options;
};

export const getGroupDefaultType = (group: DocumentGroupType) => {
  let typeList = getDocumentGroupTypeList(group);
  for (let type of typeList) {
    if (DocumentTypeRule[type].parentType === DocumentObjectType.unknown) {
      return type;
    }
  }
  return DocumentObjectType.unknown;
};
