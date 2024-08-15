import { group } from "console";

enum PropertyType {
  text = "text",
  number = "number",
  options = "options",
  dateTime = "dateTime",
}

enum DocumentObjectType {
  organization = "organization",
  site = "site",
  department = "department",
  system = "system",
  subSystem = "subSystem",
  route = "route",
  operation = "operation",
  component = "component",
  tool = "tool",
  unknown = "unknown",
}

interface DocumentObject {
  id: string | undefined;
  type: DocumentObjectType;
  ancestors: string;
  title: string;
  description: string;
  createAt: Date;
  updateAt: Date;
  createBy: string;
  updateBy: string;
  properties: Property[];
}

interface BaseProperty {
  name: string;
  isHidden: boolean;
  readonly: boolean;
  required?: boolean;
}

interface TextProperty extends BaseProperty {
  type: PropertyType.text;
  value: string;
}

interface DateTimeProperty extends BaseProperty {
  type: PropertyType.dateTime;
  value: Date;
}

interface NumberProperty extends BaseProperty {
  type: PropertyType.number;
  value: number;
}

export interface OptionsProperty extends BaseProperty {
  type: PropertyType.options;
  value: string;
  options: string[];
}

type Property =
  | TextProperty
  | NumberProperty
  | DateTimeProperty
  | OptionsProperty;

// example of a document

function getDocumentType(type: string): DocumentObjectType {
  if (!Object.keys(DocumentObjectType).includes(type)) {
    return DocumentObjectType.unknown;
  }
  return DocumentObjectType[type as DocumentTypeString];
}

export function createNewDocument(
  type: DocumentObjectType,
  ancestors: string,
  docGroupType: DocumentGroupType,
  user: string = ""
) {
  switch (docGroupType) {
    case DocumentGroupType.Location:
      return {
        id: "",
        type: type,
        ancestors: ancestors,
        title: "",
        description: "",
        createAt: new Date(),
        updateAt: new Date(),
        createBy: user,
        updateBy: user,
        properties: [
          {
            name: "經度",
            isHidden: false,
            readonly: false,
            type: PropertyType.number,
            value: 0,
          },
          {
            name: "緯度",
            isHidden: false,
            readonly: false,
            type: PropertyType.number,
            value: 0,
          },
          {
            name: "城市",
            isHidden: false,
            readonly: false,
            type: PropertyType.options,
            value: "Hsinchu",
            options: ["Hsinchu"],
          },
          {
            name: "國家",
            isHidden: false,
            readonly: false,
            type: PropertyType.options,
            value: "Taiwan",
            options: ["Taiwan", "Japan", "USA"],
          },
          {
            name: "郵遞區號",
            isHidden: false,
            readonly: false,
            type: PropertyType.text,
            value: "",
          },
          {
            name: "地址1",
            isHidden: false,
            readonly: false,
            type: PropertyType.text,
            value: "",
          },
          {
            name: "地址2",
            isHidden: false,
            readonly: false,
            type: PropertyType.text,
            value: "",
          },
        ],
      } as DocumentObject;
    case DocumentGroupType.Asset:
      return {
        id: "",
        type: type,
        ancestors: ancestors,
        title: "",
        description: "",
        createAt: new Date(),
        updateAt: new Date(),
        createBy: user,
        updateBy: user,
        properties: [
          {
            name: "移出時間",
            type: PropertyType.dateTime,
            value: new Date(),
            isHidden: false,
            readonly: false,
          },
          {
            name: "移入時間",
            type: PropertyType.dateTime,
            value: new Date(),
            isHidden: false,
            readonly: false,
          },
          {
            name: "生效時間(起)",
            type: PropertyType.dateTime,
            value: new Date(),
            isHidden: false,
            readonly: false,
          },
          {
            name: "生效時間(迄)",
            type: PropertyType.dateTime,
            value: new Date(),
            isHidden: false,
            readonly: false,
          },
        ],
      } as DocumentObject;
    default:
      return {
        id: "",
        type: type,
        ancestors: ancestors,
        title: "",
        description: "",
        createAt: new Date(),
        updateAt: new Date(),
        createBy: user,
        updateBy: user,
        properties: [],
      } as DocumentObject;
  }
}

type DocumentTypeString = keyof typeof DocumentObjectType;
enum DocumentGroupType {
  Location = "Location",
  Asset = "Asset",
  Unknown = "Unknown",
  Root = "Root",
}
// type DocumentGroupType = "Location" | "Asset" | "Unknown" | "Root";
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

export type { DocumentObject, Property, DocumentTypeString };

export {
  PropertyType,
  DocumentGroupType,
  DocumentObjectType,
  getDocumentType,
  DocumentTypeRule,
};
