"use server";

import { MongoAssetLocRepository } from "@/data/repositories/mongo/LocationRepository";
import { AssetData, AssetLocationEntity } from "@/domain/entities/Location";
import { AssetDataUseCase } from "@/domain/Services/LocationDataUsecases";

import { getLocationType } from "@/domain/entities/LocationType";

export async function createNewData(data: AssetLocationEntity) {
  const repo = new MongoAssetLocRepository();
  return await repo.createLocationData(data);
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
  await repo.updateLocationData(data);
}

export async function getDashboardAssetData(assetId: string) {
  const repo = new MongoAssetLocRepository();
  const assetDataUseCase = new AssetDataUseCase(repo);

  const data = await assetDataUseCase.getAssetData(assetId);

  // all the data from the ancestors path array
  const ancestors = await assetDataUseCase.getAncestors(data.ancestors);

  // all the children data from the current path
  const sibling = await assetDataUseCase.getSibling(data.ancestors);
  // const data = await assetDataService.getCurrentPathAssets();
  const children = await assetDataUseCase.getChildren(
    data.ancestors ?? [],
    assetId
  );

  return { data, ancestors, sibling, children };
}

export async function getAssetDataWithId(id: string) {
  console.log("getAssetDataWithId", id);
  const repo = new MongoAssetLocRepository();
  const assetDataUseCase = new AssetDataUseCase(repo);
  const data = await assetDataUseCase.getAssetData(id);
  return data;
}

export async function getAssetChildren(searchPath: string[], id: string) {
  const repo = new MongoAssetLocRepository();
  const assetDataUseCase = new AssetDataUseCase(repo);
  const data = await assetDataUseCase.getChildren(searchPath, id);
  return data;
}

export async function getAssetSibling(searchPath: string[]) {
  const repo = new MongoAssetLocRepository();
  const assetDataUseCase = new AssetDataUseCase(repo);
  const data = await assetDataUseCase.getSibling(searchPath);
  return data;
}

export async function getAssetAncestors(searchPath: string[]) {
  const repo = new MongoAssetLocRepository();
  const assetDataUseCase = new AssetDataUseCase(repo);
  const data = await assetDataUseCase.getAncestors(searchPath);
  return data;
}

export async function getDashboardAssetDataInCreateMode(
  ancestor: string[],
  assetType: string
) {
  const repo = new MongoAssetLocRepository();
  const assetDataUseCase = new AssetDataUseCase(repo);

  const sibling = await assetDataUseCase.getSibling(ancestor);
  // all the data from the ancestors path array
  const ancestors = await assetDataUseCase.getAncestors(ancestor);

  const newData = AssetData.createNew(
    getLocationType(assetType),
    ancestor
  ).toEntity();

  const children: AssetLocationEntity[] = [];

  return { newData, ancestors, sibling, children };
}

export async function serverActionWrapper(
  action: () => Promise<any>,
  successMessage: string = "Server Action Success",
  errorMessage: string = "Server Action Error"
) {
  try {
    console.log(successMessage);
    return await action();
  } catch (error) {
    console.error(errorMessage, error);
  }
}
