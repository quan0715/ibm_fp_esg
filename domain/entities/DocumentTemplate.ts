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
            value: Status.ACTIVE,
            isHidden: false,
            readonly: false,
          },
          {
            name: "位置",
            type: PropertyType.reference,
            referenceGroup: DocumentGroupType.Location,
            value: "",
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
