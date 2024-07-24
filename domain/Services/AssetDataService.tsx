import { MongoAssetLocRepository } from "@/data/repositories/mongo/MongoAssetLocRepository";
import { ObjectId } from "mongodb";
import { AssetLocRepository } from "@/domain/repository/AssetLocRepository";
import { AssetLocationEntity } from "../entities/Asset";

export class AssetDataService {
  // search path for current assets service

  searchPath: string[];
  repository: AssetLocRepository;
  // constructor
  constructor(repository: AssetLocRepository) {
    this.searchPath = [];
    this.repository = repository;
  }

  getSearchPath(): string[] {
    return this.searchPath;
  }

  updateSearchPath(path: string[]): void {
    this.searchPath = path;
  }

  popBackSearchPath(id: string): string[] {
    const index = this.searchPath.indexOf(id);
    if (index === -1) {
      throw new Error("Id not found in search path");
    }
    if (index === 0) {
      this.searchPath = [];
    } else {
      this.searchPath = this.searchPath.slice(0, index);
    }
    return this.searchPath;
  }
  // call api with search path

  async getNextPathAssetChildren(id: string): Promise<AssetLocationEntity[]> {
    const remoteData = await this.repository.retrieveAssetLocData({
      ancestors: [...this.searchPath, id],
    });
    return remoteData;
  }

  async getCurrentPathAssets(): Promise<AssetLocationEntity[]> {
    const remoteData = await this.repository.retrieveAssetLocData({
      ancestors: this.searchPath,
    });
    return remoteData;
  }

  async getAncestorAssetData(): Promise<AssetLocationEntity[]> {
    const remoteData = await this.repository.retrieveAssetLocData({
      _id: { $in: this.searchPath.map((id) => new ObjectId(id)) },
    });
    return remoteData;
  }
}
