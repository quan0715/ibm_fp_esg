import {
  DocumentGroupType,
  DocumentObject,
  DocumentObjectTemplate,
} from "@/domain/entities/Document";

interface DocumentTemplateRepository {
  // asset loc data CRUD
  // createDocument(data: DocumentObject): Promise<string>;
  retrieveDocumentTemplate(
    query?: any,
    docGroup?: DocumentGroupType
  ): Promise<DocumentObjectTemplate | undefined>;
  // updateDocument(data: DocumentObject): Promise<void>;
  // deleteDocument(id: string): Promise<void>;
}

export type { DocumentTemplateRepository as DocumentTemplateRepositoryInterface };
