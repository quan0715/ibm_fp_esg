import { AssetEntity } from "../entities/Asset";
import { AssetRepositoryInterface } from "../repository/AssetRepository";
import { ObjectId } from "mongodb";
export class AssetDataUseCase {
  constructor(private repository: AssetRepositoryInterface) {
    this.repository = repository;
  }

  async getAssetData(id: string): Promise<AssetEntity> {
    let searchResult: AssetEntity[] = [];
    if (id === "") {
      console.log("Asset Id is empty");
      console.log("find the first asset with empty ancestors");
      //   searchResult = await this.getAssetSibling([]);
      // find the first asset with empty ancestors
    } else {
      searchResult = await this.repository.retrieveAssetData({
        _id: new ObjectId(id),
      });
    }
    if (searchResult.length === 0) {
      throw new Error("Asset not found");
    }
    return searchResult[0];
  }

  async getAssetSibling(searchPath: string): Promise<AssetEntity[]> {
    const remoteData = await this.repository.retrieveAssetData({
      ancestors: searchPath,
    });
    return remoteData;
  }
}
