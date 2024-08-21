import {
  DocumentGroupType,
  DocumentObject,
  DocumentObjectType,
  DocumentTypeString,
} from "./Document";
import { getDocumentLayerRules } from "./DocumentConfig";
import { PropertyType } from "./DocumentProperty";
import { Status } from "./Status";

export function getDocumentType(type: string): DocumentObjectType {
  if (!Object.keys(DocumentObjectType).includes(type)) {
    console.error("Document type not found: ", type);
    return DocumentObjectType.unknown;
  }
  return DocumentObjectType[type as DocumentTypeString];
}

export function createNewDocument(
  type: DocumentObjectType,
  ancestors: string,
  // docGroupType: DocumentGroupType,
  user: string = ""
) {
  const docGroupType = getDocumentLayerRules(type).group;
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
            name: "狀態",
            type: PropertyType.status,
            value: "ACTIVE",
            isHidden: false,
            readonly: false,
          },
          {
            name: "位置",
            type: PropertyType.reference,
            referenceGroup: DocumentGroupType.Location,
            value: [],
            limit: true,
            isHidden: false,
            readonly: false,
          },
          {
            name: "產品名稱",
            type: PropertyType.text,
            value: "",
            isHidden: false,
            readonly: false,
          },
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
    case DocumentGroupType.Meter:
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
            name: "狀態",
            type: PropertyType.status,
            value: "ACTIVE",
            isHidden: false,
            readonly: false,
          },
          {
            name: "GHG類型",
            type: PropertyType.reference,
            limit: false,
            referenceGroup: DocumentGroupType.GHG,
            value: [],
            isHidden: false,
            readonly: false,
          },
          {
            name: "讀數類型",
            type: PropertyType.text,
            value: "",
            isHidden: false,
            readonly: false,
          },
          {
            name: "單位",
            type: PropertyType.text,
            value: "",
            isHidden: false,
            readonly: false,
          },
          {
            name: "移動源",
            type: PropertyType.boolean,
            value: false,
            isHidden: false,
            readonly: false,
          },
          {
            name: "生物能源",
            type: PropertyType.boolean,
            value: false,
            isHidden: false,
            readonly: false,
          },
        ],
      } as DocumentObject;
    case DocumentGroupType.GHG:
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
            name: "排放係數值",
            type: PropertyType.number,
            value: 0,
            isHidden: false,
            readonly: false,
          },
          {
            name: "排放係數單位",
            type: PropertyType.text,
            value: "",
          },
          {
            name: "排放係數來源",
            type: PropertyType.text,
            value: "",
            isHidden: false,
            readonly: false,
          },
          {
            name: "排放量(公噸/年)",
            type: PropertyType.number,
            value: 0,
            isHidden: false,
            readonly: false,
          },
          {
            name: "GWP全球暖化潛勢",
            type: PropertyType.number,
            value: 1,
            isHidden: false,
            readonly: false,
          },
          {
            name: "排放當量(公噸CO2e/年)",
            type: PropertyType.number,
            value: 0,
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
