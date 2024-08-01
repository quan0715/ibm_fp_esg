import { MongoAssetLocRepository } from "@/data/repositories/mongo/MongoAssetLocRepository";
import { ObjectId } from "mongodb";
import { AssetLocRepository } from "@/domain/repository/AssetLocRepository";
import { AssetLocationEntity } from "../entities/Asset";
import { AssetType } from "../entities/AssetType";

export class AssetDataUseCase {
  constructor(private repository: AssetLocRepository) {
    this.repository = repository;
  }

  async getAssetData(id: string): Promise<AssetLocationEntity> {
    let searchResult: AssetLocationEntity[] = [];
    if (id === "") {
      console.log("Asset Id is empty");
      console.log("find the first asset with empty ancestors");
      searchResult = await this.getAssetSibling([]);
      // find the first asset with empty ancestors
    } else {
      searchResult = await this.repository.retrieveAssetLocData({
        _id: new ObjectId(id),
      });
    }
    if (searchResult.length === 0) {
      throw new Error("Asset not found");
    }
    return searchResult[0];
  }

  async getAssetChildren(
    searchPath: string[],
    id: string
  ): Promise<AssetLocationEntity[]> {
    const remoteData = await this.repository.retrieveAssetLocData({
      ancestors: [...searchPath, id],
    });
    return remoteData;
  }

  async getAssetSibling(searchPath: string[]): Promise<AssetLocationEntity[]> {
    const remoteData = await this.repository.retrieveAssetLocData({
      ancestors: searchPath,
    });
    return remoteData;
  }

  async getAssetAncestors(
    searchPath: string[]
  ): Promise<AssetLocationEntity[]> {
    const remoteData = await this.repository.retrieveAssetLocData({
      _id: { $in: searchPath.map((id) => new ObjectId(id)) },
    });
    return remoteData;
  }

  async deleteAssetData(id: string): Promise<string> {
    if (id === "") {
      throw new Error("Asset Id is required");
    }

    const data = await this.getAssetData(id);
    const children = await this.getAssetChildren(data.ancestors, data.id!);

    if (children.length > 0) {
      throw new Error("Asset has children");
    }

    await this.repository.deleteAssetLocData(id);

    const siblings = await this.getAssetSibling(data.ancestors);

    if (siblings.length > 0) {
      return siblings[0].id!;
    } else if (data.ancestors.length > 0) {
      return data.ancestors[data.ancestors.length - 1];
    } else {
      return "";
    }
  }
}

export class AssetDataService {
  // search path for current assets service

  searchPath: string[];
  currentAssetDataType: AssetType;
  repository: AssetLocRepository;
  assetId: string;
  assetData: AssetLocationEntity | undefined;
  // constructor
  constructor(repository: AssetLocRepository, assetId: string) {
    this.searchPath = [];
    this.repository = repository;
    this.assetId = assetId;
    this.currentAssetDataType = AssetType.Organization;
  }

  getSearchPath(): string[] {
    return this.searchPath;
  }

  updateSearchPath(path: string[]): void {
    this.searchPath = path;
  }

  async createNewAssetData({
    parent,
    assetData,
  }: {
    parent: AssetLocationEntity;
    assetData: AssetLocationEntity;
  }): Promise<void> {
    const data = {
      ...assetData,
      ancestors: [...parent.ancestors, parent.id!],
    } as AssetLocationEntity;
    await this.repository.createAssetLocData(data);
  }

  async deleteAssetData(id: string): Promise<void> {
    if (id === "") {
      throw new Error("Asset Id is required");
    }
    console.log("delete asset data is not empty");
    const data = await this.repository.retrieveAssetLocData({
      _id: new ObjectId(id),
    });
    if (data.length === 0) {
      throw new Error("Asset not found");
    }
    const children = await this.getAssetChildren(id);
    if (children.length > 0) {
      throw new Error("Asset has children");
    }

    await this.repository.deleteAssetLocData(id);
  }

  async fetchAssetData(): Promise<AssetLocationEntity | undefined> {
    if (this.assetData) {
      return this.assetData;
    }

    if (this.assetId === "") {
      this.searchPath = [];
      this.currentAssetDataType = AssetType.Organization;
      let res = await this.getAssetSibling();
      if (res.length > 0) {
        this.assetData = res[0];
        this.searchPath = this.assetData.ancestors;
        return res[0];
      } else {
        return undefined;
      }
    }

    const remoteData = await this.repository.retrieveAssetLocData({
      _id: new ObjectId(this.assetId),
    });

    this.assetData = remoteData[0];
    this.searchPath = this.assetData.ancestors;
    return remoteData[0];
  }

  //   async get

  async getAssetChildren(id: string): Promise<AssetLocationEntity[]> {
    const remoteData = await this.repository.retrieveAssetLocData({
      ancestors: [...this.searchPath, id],
    });
    return remoteData;
  }

  async getAssetSibling(): Promise<AssetLocationEntity[]> {
    // get all the children data from the current path
    const remoteData = await this.repository.retrieveAssetLocData({
      ancestors: this.searchPath,
    });
    return remoteData;
  }

  async getAssetAncestors(): Promise<AssetLocationEntity[]> {
    // get all the ancestors data
    const remoteData = await this.repository.retrieveAssetLocData({
      _id: { $in: this.searchPath.map((id) => new ObjectId(id)) },
    });
    return remoteData;
  }
}
