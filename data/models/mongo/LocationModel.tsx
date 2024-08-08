import { LocationType } from "@/domain/entities/LocationType";

interface LocationDataModel {
  _id: string | undefined;
  name: string;
  description: string | undefined;
  type: LocationType;
  ancestors: string[];
  lat: number | undefined;
  lon: number | undefined;
  addressLine1: string | undefined;
  addressLine2: string | undefined;
  city: string | undefined;
  country: string | undefined;
  zip: string | undefined;
}

export type { LocationDataModel as MongoLocationDataModel };
