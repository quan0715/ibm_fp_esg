import { MongoAssetRepository } from "@/data/repositories/mongo/AssetRepository";
import { AssetDataUseCase } from "@/domain/Services/AssetDataUseCases";
import { Asset } from "next/font/google";
import { NextResponse, NextRequest } from "next/server";
export async function GET(request: NextRequest, response: NextResponse) {
  // const repo = new MongoAssetRepository();

  // const result = await repo.retrieveAssetData();
  const testIndex = "66b48b33a121b4bdc7aca352";
  const testUseCase = new AssetDataUseCase(new MongoAssetRepository());

  return NextResponse.json(await testUseCase.getAssetData(testIndex));
}
