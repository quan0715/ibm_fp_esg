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
  Unknown = "Unknown",
  Root = "Root",
}

export type { DocumentObject, Property, DocumentTypeString };

export { DocumentGroupType, DocumentObjectType };
