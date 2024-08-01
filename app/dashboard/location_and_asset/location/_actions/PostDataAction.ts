"use server";

import { MongoAssetLocRepository } from "@/data/repositories/mongo/MongoAssetLocRepository";
import { AssetData, AssetLocationEntity } from "@/domain/entities/Asset";
import {
  AssetDataService,
  AssetDataUseCase,
} from "@/domain/Services/AssetDataService";

import { getAssetLayerRules } from "@/domain/entities/Asset";

export async function postData(data: AssetLocationEntity) {
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

export async function getDashboardAssetDataInCreateMode(parentId: string) {
  console.log("getDashboardAssetDataInCreateMode", parentId);
  const repo = new MongoAssetLocRepository();
  const assetDataUseCase = new AssetDataUseCase(repo);

  const parentData = await assetDataUseCase.getAssetData(parentId);
  const searchPath = [...parentData.ancestors, parentData.id!];

  const sibling = await assetDataUseCase.getAssetSibling(searchPath);
  // all the data from the ancestors path array
  const ancestors = await assetDataUseCase.getAssetAncestors(searchPath);

  const newAssetDataType = getAssetLayerRules(parentData.type).childrenType;

  const newData = AssetData.createNew(newAssetDataType, searchPath).toEntity();

  const children: AssetLocationEntity[] = [];

  return { newData, ancestors, sibling, children };
}
