import { MongoDocumentObjectModel } from "@/data/models/mongo/DocumentModel";
import { DocumentObjectTemplateModel } from "@/data/models/mongo/DocumentTemplateModel";
import {
  DocumentGroupType,
  DocumentObject,
  DocumentObjectTemplate,
} from "@/domain/entities/Document";
import { getDocumentGroupTypeList } from "@/domain/entities/DocumentConfig";
import { DocumentRepositoryInterface } from "@/domain/repository/DocumentRepository";
import { DocumentTemplateRepositoryInterface } from "@/domain/repository/DocumentRepositoryTemplate";
import clientPromise from "@/lib/mongoClient";

const documentMondoDB = "Documents";
const documentCollection = "templates";
class DocumentTemplateRepository
  implements DocumentTemplateRepositoryInterface
{
  async retrieveDocumentTemplate(
    query?: any,
    docGroup?: DocumentGroupType
  ): Promise<DocumentObjectTemplate | undefined> {
    const client = await clientPromise;
    const db = client.db(documentMondoDB);
    const collection = db.collection(documentCollection);
    // const groupTypeOption = getDocumentGroupTypeList(docGroup);
    let result = await collection
      .find({
        ...query,
        group: docGroup,
      })
      .map<DocumentObjectTemplate>((doc) => {
        const model = new DocumentObjectTemplateModel(
          doc.group,
          doc.properties
        );
        return model.toEntity();
      })
      .toArray();
    if (result.length === 0) {
      return undefined;
    }
    return result[0];
  }
}

export { DocumentTemplateRepository as MongoDocumentTemplateRepository };
