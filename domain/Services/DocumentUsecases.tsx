import { ObjectId } from "mongodb";
import { LocationRepositoryInterface } from "@/domain/repository/LocationRepository";
// import { AssetLocationEntity } from "../entities/Location";
import { DocumentObject, DocumentGroupType } from "../entities/Document";
import { DocumentRepositoryInterface } from "../repository/DocumentRepository";

export class DocumentUseCase {
  constructor(
    private repository: DocumentRepositoryInterface,
    private documentGroupType: DocumentGroupType
  ) {
    this.repository = repository;
    this.documentGroupType = documentGroupType;
  }

  async createNewDocument(data: DocumentObject): Promise<string> {
    return await this.repository.createDocument(data);
  }

  async getAssetData(id: string): Promise<DocumentObject> {
    let searchResult: DocumentObject[] = [];
    if (id === "") {
      console.log("Asset Id is empty");
      console.log("find the first asset with empty ancestors");
      searchResult = await this.getSibling("");
      // find the first asset with empty ancestors
    } else {
      searchResult = await this.repository.retrieveDocument(
        {
          _id: new ObjectId(id),
        },
        this.documentGroupType
      );
    }
    if (searchResult.length === 0) {
      throw new Error("Asset not found");
    }
    return searchResult[0];
  }

  async getChildren(searchPath: string, id: string): Promise<DocumentObject[]> {
    let path = searchPath.length === 0 ? `${id}` : `${searchPath},${id}`;
    const remoteData = await this.repository.retrieveDocument(
      {
        ancestors: path,
      },
      this.documentGroupType
    );
    return remoteData;
  }

  async getSibling(searchPath: string): Promise<DocumentObject[]> {
    const remoteData = await this.repository.retrieveDocument(
      {
        ancestors: searchPath,
      },
      this.documentGroupType
    );
    return remoteData;
  }

  async getAncestors(searchPath: string[]): Promise<DocumentObject[]> {
    // console.log("getAssetAncestors", searchPath);
    if (searchPath.length === 0) {
      return [];
    }
    const remoteData = await this.repository.retrieveDocument(
      {
        _id: { $in: searchPath.map((id) => new ObjectId(id)) },
      },
      this.documentGroupType
    );
    return remoteData;
  }

  async getSearchPathAssetList(
    searchPath: string[]
  ): Promise<DocumentObject[]> {
    const remoteData = await this.repository.retrieveDocument(
      {
        _id: { $in: searchPath.map((id) => new ObjectId(id)) },
      },
      this.documentGroupType
    );
    return remoteData;
  }

  async deleteDocument(id: string): Promise<string> {
    if (id === "") {
      throw new Error("Asset Id is required");
    }

    const data = await this.getAssetData(id);
    const children = await this.getChildren(data.ancestors, data.id!);

    if (children.length > 0) {
      throw new Error("Document has children");
    }

    await this.repository.deleteDocument(id);

    const siblings = await this.getSibling(data.ancestors);

    if (siblings.length > 0) {
      return siblings[0].id!;
    } else if (data.ancestors.split(",").length > 0) {
      return data.ancestors.split(",")[data.ancestors.split(",").length - 1];
    } else {
      return "";
    }
  }

  async updateDocument(data: DocumentObject): Promise<string> {
    if (data.id === "") {
      throw new Error("Asset Id is required");
    }

    await this.repository.updateDocument(data);

    return data.id!;
  }

  // async getDefaultDocument(): Promise<DocumentObject> {
  //   const searchPath = "";
  // }
}
