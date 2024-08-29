import {
  DocumentGroupTypeString,
  DocumentObjectTemplate,
  getDocumentGroupTypeFromString,
  Property,
} from "@/domain/entities/Document";

export class DocumentObjectTemplateModel {
  group: DocumentGroupTypeString = "Unknown";
  title: string = "";
  description: string = "";
  properties: Property[] = [];

  constructor(group: DocumentGroupTypeString, properties: Property[]) {
    this.group = group;
    this.properties = properties;
  }

  toEntity(): DocumentObjectTemplate {
    return {
      group: getDocumentGroupTypeFromString(this.group),
      properties: this.properties,
    };
  }
}
