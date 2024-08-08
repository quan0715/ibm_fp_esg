import { AssetLocationEntity } from "@/domain/entities/Location";
import { AssetEntity } from "../entities/Asset";

interface AssetRepository {
  // asset loc data CRUD
  createAssetData(asset: AssetEntity): Promise<string>;
  retrieveAssetData(query?: any): Promise<AssetEntity[]>;
  updateAssetData(data: AssetEntity): Promise<AssetEntity>;
  deleteAssetData(id: string): Promise<void>;
}

export type { AssetRepository as AssetRepositoryInterface };
