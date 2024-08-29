import {
  DocumentGroupType,
  DocumentObjectTemplate,
} from "../entities/Document";
import { DocumentTemplateRepositoryInterface } from "../repository/DocumentRepositoryTemplate";

export class DocumentTemplateUseCase {
  constructor(
    private repository: DocumentTemplateRepositoryInterface,
    private documentGroupType: DocumentGroupType
  ) {
    this.repository = repository;
    this.documentGroupType = documentGroupType;
  }

  async getDocumentTemplate(): Promise<DocumentObjectTemplate> {
    let template = await this.repository.retrieveDocumentTemplate(
      {},
      this.documentGroupType
    );
    if (!template) {
      return {
        title: "",
        description: "",
        group: DocumentGroupType.Unknown,
        properties: [],
      } as DocumentObjectTemplate;
    }
    return template;
  }
}
