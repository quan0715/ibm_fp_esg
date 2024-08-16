import { MongoDocumentObjectModel } from "@/data/models/mongo/DocumentModel";
import { DocumentGroupType, DocumentObject } from "@/domain/entities/Document";
import { getDocumentGroupTypeList } from "@/domain/entities/DocumentConfig";
import { DocumentRepositoryInterface } from "@/domain/repository/DocumentRepository";
import clientPromise from "@/lib/mongoClient";
import { ObjectId } from "mongodb";

const documentMondoDB = "Documents";
const documentCollection = "docs";
class DocumentRepository implements DocumentRepositoryInterface {
  async createDocument(data: DocumentObject): Promise<string> {
    const client = await clientPromise;
    const db = client.db(documentMondoDB);
    const collection = db.collection(documentCollection);

    const result = await collection.insertOne(data);
    return result.insertedId.toHexString();
  }
  async retrieveDocument(
    query?: any,
    docGroup?: DocumentGroupType
  ): Promise<DocumentObject[]> {
    const client = await clientPromise;
    const db = client.db(documentMondoDB);
    const collection = db.collection(documentCollection);
    const groupTypeOption = getDocumentGroupTypeList(docGroup);
    let result = await collection
      .find({
        ...query,
        type: { $in: groupTypeOption },
      })
      .map<DocumentObject>((doc) => {
        const model = new MongoDocumentObjectModel(
          doc._id,
          doc.title,
          doc.description,
          doc.type,
          doc.ancestors,
          doc.createAt,
          doc.updateAt,
          doc.createBy,
          doc.updateBy,
          doc.properties
        );
        return model.toEntity();
      })
      .toArray();

    return result;
  }
  async updateDocument(data: DocumentObject): Promise<void> {
    const client = await clientPromise;
    const db = client.db(documentMondoDB);
    const collection = db.collection(documentCollection);
    const res = await collection.updateOne(
      { _id: new ObjectId(data.id!) },
      { $set: data }
    );
  }
  async deleteDocument(id: string): Promise<void> {
    const client = await clientPromise;
    const db = client.db(documentMondoDB);
    const collection = db.collection(documentCollection);
    collection.deleteOne({ _id: new ObjectId(id) });
  }
}

export { DocumentRepository as MongoDocumentRepository };
