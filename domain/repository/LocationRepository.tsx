import { AssetLocationEntity } from "@/domain/entities/Location";

interface LocationRepository {
  // asset loc data CRUD
  createLocationData(data: AssetLocationEntity): Promise<string>;
  retrieveLocationData(query?: any): Promise<AssetLocationEntity[]>;
  updateLocationData(data: AssetLocationEntity): Promise<AssetLocationEntity>;
  deleteLocationData(id: string): Promise<void>;
}

export type { LocationRepository as LocationRepositoryInterface };
