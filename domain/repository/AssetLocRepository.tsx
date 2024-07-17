import {
  AssetLocationEntity,
  // OrganizationAssetLocData,
  // SiteAssetLocData,
  // PhaseAssetLocData,
  // DeptAssetLocData,
} from "@/domain/entities/Asset";

interface AssetLocRepository {
  // asset loc data CRUD
  createAssetLocData(data: AssetLocationEntity): Promise<AssetLocationEntity>;
  retrieveAssetLocData(id?: string): Promise<AssetLocationEntity[]>;
  updateAssetLocData(data: AssetLocationEntity): Promise<AssetLocationEntity>;
  deleteAssetLocData(id: string): void;
}

export type { AssetLocRepository };