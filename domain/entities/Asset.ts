import { AssetTypeStrings } from "./AssetType";

interface AssetEntity {
  id: string | undefined;
  name: string;
  description: string | undefined;
  type: AssetTypeStrings;
  ancestors: string | undefined;
  effectiveStartDate: string | undefined;
  effectiveEndDate: string | undefined;
  moveInDate: string | undefined;
  moveOutDate: string | undefined;
  product: string | undefined;
  location: string | undefined;
}

export type { AssetEntity };
