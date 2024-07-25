import { MongoAssetLocRepository } from "@/data/repositories/mongo/MongoAssetLocRepository";
import { ObjectId } from "mongodb";
import { AssetLocRepository } from "@/domain/repository/AssetLocRepository";
import { AssetLocationEntity } from "../entities/Asset";

export class AssetDataUseCase {
  constructor(private repository: AssetLocRepository) {
    this.repository = repository;
  }

  async getAssetData(id: string): Promise<AssetLocationEntity> {
    if (id === "") {
      throw new Error("Asset Id is required");
    }
    const remoteData = await this.repository.retrieveAssetLocData({
      _id: new ObjectId(id),
    });
    return remoteData[0];
  }

  async getAssetChildrenData(
    searchPath: string[],
    id: string
  ): Promise<AssetLocationEntity[]> {
    const remoteData = await this.repository.retrieveAssetLocData({
      ancestors: [...searchPath, id],
    });
    return remoteData;
  }

  async getAllAssetWithSameAncestor(
    searchPath: string[]
  ): Promise<AssetLocationEntity[]> {
    const remoteData = await this.repository.retrieveAssetLocData({
      ancestors: searchPath,
    });
    return remoteData;
  }

  async getAssetAncestorData(
    searchPath: string[]
  ): Promise<AssetLocationEntity[]> {
    const remoteData = await this.repository.retrieveAssetLocData({
      _id: { $in: searchPath.map((id) => new ObjectId(id)) },
    });
    return remoteData;
  }
}

export class AssetDataService {
  // search path for current assets service

  searchPath: string[];
  repository: AssetLocRepository;
  assetId: string;
  assetData: AssetLocationEntity | undefined;
  // constructor
  constructor(repository: AssetLocRepository, assetId: string) {
    this.searchPath = [];
    this.repository = repository;
    this.assetId = assetId;
  }

  getSearchPath(): string[] {
    return this.searchPath;
  }

  updateSearchPath(path: string[]): void {
    this.searchPath = path;
  }

  async fetchAssetData(): Promise<AssetLocationEntity> {
    if (this.assetData) {
      return this.assetData;
    }
    if (this.assetId === "") {
      let res = await this.getCurrentPathAssets();
      this.assetData = res[0];
      this.searchPath = this.assetData.ancestors;
      return res[0];
    }
    const remoteData = await this.repository.retrieveAssetLocData({
      _id: new ObjectId(this.assetId),
    });
    this.assetData = remoteData[0];
    this.searchPath = this.assetData.ancestors;
    return remoteData[0];
  }

  async getNextPathAssetChildren(id: string): Promise<AssetLocationEntity[]> {
    const remoteData = await this.repository.retrieveAssetLocData({
      ancestors: [...this.searchPath, id],
    });
    return remoteData;
  }

  async getCurrentPathAssets(): Promise<AssetLocationEntity[]> {
    // get all the children data from the current path
    const remoteData = await this.repository.retrieveAssetLocData({
      ancestors: this.searchPath,
    });
    return remoteData;
  }

  async getAncestorAssetData(): Promise<AssetLocationEntity[]> {
    // get all the ancestors data
    const remoteData = await this.repository.retrieveAssetLocData({
      _id: { $in: this.searchPath.map((id) => new ObjectId(id)) },
    });
    return remoteData;
  }
}
