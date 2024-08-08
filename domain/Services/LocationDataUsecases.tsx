import { ObjectId } from "mongodb";
import { LocationRepositoryInterface } from "@/domain/repository/LocationRepository";
import { AssetLocationEntity } from "../entities/Location";

export class AssetDataUseCase {
  constructor(private repository: LocationRepositoryInterface) {
    this.repository = repository;
  }

  async getAssetData(id: string): Promise<AssetLocationEntity> {
    let searchResult: AssetLocationEntity[] = [];
    if (id === "") {
      console.log("Asset Id is empty");
      console.log("find the first asset with empty ancestors");
      searchResult = await this.getSibling([]);
      // find the first asset with empty ancestors
    } else {
      searchResult = await this.repository.retrieveLocationData({
        _id: new ObjectId(id),
      });
    }
    if (searchResult.length === 0) {
      throw new Error("Asset not found");
    }
    return searchResult[0];
  }

  async getChildren(
    searchPath: string[],
    id: string
  ): Promise<AssetLocationEntity[]> {
    const remoteData = await this.repository.retrieveLocationData({
      ancestors: [...searchPath, id],
    });
    return remoteData;
  }

  async getSibling(searchPath: string[]): Promise<AssetLocationEntity[]> {
    const remoteData = await this.repository.retrieveLocationData({
      ancestors: searchPath,
    });
    return remoteData;
  }

  async getAncestors(searchPath: string[]): Promise<AssetLocationEntity[]> {
    // console.log("getAssetAncestors", searchPath);
    if (searchPath.length === 0) {
      return [];
    }
    const remoteData = await this.repository.retrieveLocationData({
      _id: { $in: searchPath.map((id) => new ObjectId(id)) },
    });
    return remoteData;
  }

  async getSearchPathAssetList(
    searchPath: string[]
  ): Promise<AssetLocationEntity[]> {
    const remoteData = await this.repository.retrieveLocationData({
      _id: { $in: searchPath.map((id) => new ObjectId(id)) },
    });
    return remoteData;
  }

  async deleteAssetData(id: string): Promise<string> {
    if (id === "") {
      throw new Error("Asset Id is required");
    }

    const data = await this.getAssetData(id);
    const children = await this.getChildren(data.ancestors, data.id!);

    if (children.length > 0) {
      throw new Error("Asset has children");
    }

    await this.repository.deleteLocationData(id);

    const siblings = await this.getSibling(data.ancestors);

    if (siblings.length > 0) {
      return siblings[0].id!;
    } else if (data.ancestors.length > 0) {
      return data.ancestors[data.ancestors.length - 1];
    } else {
      return "";
    }
  }
}
