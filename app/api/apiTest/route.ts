import { NextResponse, NextRequest } from "next/server";
export async function GET(request: NextRequest, response: NextResponse) {
  // const repo = new MongoAssetRepository();

  // const result = await repo.retrieveAssetData();
  const testIndex = "66b48b33a121b4bdc7aca352";

  return NextResponse.json(testIndex);
}
