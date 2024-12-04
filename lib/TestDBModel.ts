import { Document, ObjectId } from "mongodb";
import clientPromise from "./mongoClient";

export interface Parser<T> {
  parse(data: Document): T;
}

const documentMondoDB = "Documents";
export class MongoRepo<T extends Document> {
  private documentCollection: string = `${__dirname.replace(/\/|\\/, "_")}_${__filename}_doc`;
  constructor(
    private parser: Parser<T>,
    collectionName?: string
  ) {
    if (collectionName) {
      this.documentCollection += `_${collectionName}`;
    }
    console.log(this.documentCollection);
  }
  async add(data: T | T[]): Promise<string> {
    const client = await clientPromise;
    const db = client.db(documentMondoDB);
    const collection = db.collection(this.documentCollection);
    if (Array.isArray(data)) {
      const result = await collection.insertMany(data);
      return result.insertedIds[0].toHexString();
    }
    const result = await collection.insertOne(data);
    return result.insertedId.toHexString();
  }
  async query(query?: any): Promise<T[]> {
    const client = await clientPromise;
    const db = client.db(documentMondoDB);
    const collection = db.collection(this.documentCollection);
    let result = await collection
      .find({
        ...query,
      })
      .map<T>((doc) => this.parser.parse(doc))
      .toArray();

    return result;
  }
  async update(data: T) {
    const client = await clientPromise;
    const db = client.db(documentMondoDB);
    const collection = db.collection(this.documentCollection);
    return collection.updateOne(
      { _id: new ObjectId(data.id!) },
      { $set: data }
    );
  }
  async delete(id: string) {
    const client = await clientPromise;
    const db = client.db(documentMondoDB);
    const collection = db.collection(this.documentCollection);
    return collection.deleteOne({ _id: new ObjectId(id) });
  }
}
