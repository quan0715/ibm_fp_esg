import { DocumentGroupType, DocumentObject } from "@/domain/entities/Document";

interface DocumentRepository {
  // asset loc data CRUD
  createDocument(data: DocumentObject): Promise<string>;
  retrieveDocument(
    query?: any,
    docGroup?: DocumentGroupType
  ): Promise<DocumentObject[]>;
  updateDocument(data: DocumentObject): Promise<void>;
  deleteDocument(id: string): Promise<void>;
}

export type { DocumentRepository as DocumentRepositoryInterface };
