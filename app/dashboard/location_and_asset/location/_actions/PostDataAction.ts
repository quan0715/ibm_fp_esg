"use server";

import { MongoAssetLocRepository } from "@/data/repositories/mongo/MongoAssetLocRepository";
import { AssetLocationEntity } from "@/domain/entities/Asset";
import {
  AssetDataService,
  AssetDataUseCase,
} from "@/domain/Services/AssetDataService";

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

export async function getDashboardAssetData(assetId: string) {
  const repo = new MongoAssetLocRepository();
  const assetDataUseCase = new AssetDataUseCase(repo);

  const assetData = await assetDataUseCase.getAssetData(assetId);

  // all the data from the ancestors path array
  const ancestors = await assetDataUseCase.getAssetAncestorData(
    assetData.ancestors
  );
  // all the children data from the current path
  const assetDataListWithSamePath =
    await assetDataUseCase.getAllAssetWithSameAncestor(assetData.ancestors);
  // const data = await assetDataService.getCurrentPathAssets();
  const children = await assetDataUseCase.getAssetChildrenData(
    assetData.ancestors,
    assetId
  );
  return { ancestors, assetData, assetDataListWithSamePath, children };
}
