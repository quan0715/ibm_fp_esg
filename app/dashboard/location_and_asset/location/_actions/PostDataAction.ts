"use server";

import { MongoAssetLocRepository } from "@/data/repositories/mongo/MongoAssetLocRepository";
import { AssetLocationEntity } from "@/domain/entities/Asset";
import {
  AssetDataService,
  AssetDataUseCase,
} from "@/domain/Services/AssetDataService";

export async function postData(data: AssetLocationEntity) {
  const repo = new MongoAssetLocRepository();
  return await repo.createAssetLocData(data);
}

export async function deleteData(id: string) {
  const repo = new MongoAssetLocRepository();
  const assetDataUseCase = new AssetDataUseCase(repo);

  const deleteRes = await assetDataUseCase.deleteAssetData(id);
  return deleteRes;
}

export async function updateData(data: AssetLocationEntity) {
  const repo = new MongoAssetLocRepository();
  await repo.updateAssetLocData(data);
}

export async function getDashboardAssetData(assetId: string) {
  const repo = new MongoAssetLocRepository();
  const assetDataUseCase = new AssetDataUseCase(repo);

  const data = await assetDataUseCase.getAssetData(assetId);

  // all the data from the ancestors path array
  const ancestors = await assetDataUseCase.getAssetAncestors(data.ancestors);

  // all the children data from the current path
  const sibling = await assetDataUseCase.getAssetSibling(data.ancestors);
  // const data = await assetDataService.getCurrentPathAssets();
  const children = await assetDataUseCase.getAssetChildren(
    data.ancestors ?? [],
    assetId
  );

  return { data, ancestors, sibling, children };
}
