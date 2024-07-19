"use server";

import { MongoAssetLocRepository } from "@/data/repositories/mongo/MongoAssetLocRepository";
import { AssetLocationEntity } from "@/domain/entities/Asset";

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
