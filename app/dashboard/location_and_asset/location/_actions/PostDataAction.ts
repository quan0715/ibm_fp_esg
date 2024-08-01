"use server";

import { MongoAssetLocRepository } from "@/data/repositories/mongo/MongoAssetLocRepository";
import { AssetData, AssetLocationEntity } from "@/domain/entities/Asset";
import {
  AssetDataService,
  AssetDataUseCase,
} from "@/domain/Services/AssetDataService";

import { getAssetLayerRules, getAssetType } from "@/domain/entities/AssetType";

export async function createNewData(data: AssetLocationEntity) {
  const repo = new MongoAssetLocRepository();
  return await repo.createAssetLocData(data);
}

export async function deleteData(id: string) {
  const repo = new MongoAssetLocRepository();
  const assetDataUseCase = new AssetDataUseCase(repo);

  const deleteRes = await assetDataUseCase.deleteAssetData(id);
  console.log("deleteRes", deleteRes);
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

export async function getDashboardAssetDataInCreateMode(
  ancestor: string[],
  assetType: string
) {
  const repo = new MongoAssetLocRepository();
  const assetDataUseCase = new AssetDataUseCase(repo);

  const sibling = await assetDataUseCase.getAssetSibling(ancestor);
  // all the data from the ancestors path array
  const ancestors = await assetDataUseCase.getAssetAncestors(ancestor);

  const newData = AssetData.createNew(
    getAssetType(assetType),
    ancestor
  ).toEntity();

  const children: AssetLocationEntity[] = [];

  return { newData, ancestors, sibling, children };
}
