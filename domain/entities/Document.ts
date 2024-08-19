import { Property } from "./DocumentProperty";

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
  meter = "meter",
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

// example of a document

type DocumentTypeString = keyof typeof DocumentObjectType;

enum DocumentGroupType {
  Location = "Location",
  Asset = "Asset",
  Meter = "Meter",
  Unknown = "Unknown",
  Root = "Root",
}

function getDocumentGroupTypeFromString(type: string): DocumentGroupType {
  if (!Object.keys(DocumentGroupType).includes(type)) {
    return DocumentGroupType.Unknown;
  }
  return DocumentGroupType[type as keyof typeof DocumentGroupType];
}

export type { DocumentObject, Property, DocumentTypeString };

export {
  DocumentGroupType,
  DocumentObjectType,
  getDocumentGroupTypeFromString,
};
