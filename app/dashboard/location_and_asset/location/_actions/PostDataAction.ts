"use server";

import { MongoAssetLocRepository } from "@/data/repositories/mongo/MongoAssetLocRepository";
import { AssetLocationEntity } from "@/domain/entities/Asset";
import { AssetDataService } from "@/domain/Services/AssetDataService";

export async function postData(data: AssetLocationEntity) {
  const repo = new MongoAssetLocRepository();
  await repo.createAssetLocData(data);
}

export async function deleteData(id: string) {
  const repo = new MongoAssetLocRepository();
  await repo.deleteAssetLocData(id);
}

export async function updateData(data: AssetLocationEntity) {
  const repo = new MongoAssetLocRepository();
  await repo.updateAssetLocData(data);
}

export async function getDashboardAssetData(searchPath: string[]) {
  const repo = new MongoAssetLocRepository();
  const assetDataService = new AssetDataService(repo);
  assetDataService.updateSearchPath(searchPath);

  // all the data from the ancestors path array
  const ancestors = await assetDataService.getAncestorAssetData();

  // all the children data from the current path
  const children = await assetDataService.getCurrentPathAssets();

  // const data = await assetDataService.getCurrentPathAssets();
  return { ancestors, children };
}
