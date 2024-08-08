// import { AssetType } from "@/domain/entities/LocationType";
import { ObjectId } from "mongodb";
import { AssetType, AssetTypeStrings } from "@/domain/entities/AssetType";
import { AssetEntity } from "@/domain/entities/Asset";

export class MongoAssetDataModel {
  _id: ObjectId | undefined;
  name: string = "";
  description: string | undefined;
  type: AssetTypeStrings | undefined = "none";
  ancestors: string | undefined = "";
  effectiveStartDate: Date | undefined;
  effectiveEndDate: Date | undefined;
  moveInDate: Date | undefined;
  moveOutDate: Date | undefined;
  product: string | undefined;
  location: ObjectId | undefined;

  constructor(
    _id: ObjectId | undefined,
    name: string,
    description: string | undefined,
    type: AssetTypeStrings | undefined,
    ancestors: string | undefined,
    effectiveStartDate: Date | undefined,
    effectiveEndDate: Date | undefined,
    moveInDate: Date | undefined,
    moveOutDate: Date | undefined,
    product: string | undefined,
    location: ObjectId | undefined
  ) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.ancestors = ancestors;
    this.effectiveStartDate = effectiveStartDate;
    this.effectiveEndDate = effectiveEndDate;
    this.moveInDate = moveInDate;
    this.moveOutDate = moveOutDate;
    this.product = product;
    this.location = location;
  }

  toAssetEntity(): AssetEntity {
    return {
      id: this._id?.toHexString(),
      name: this.name,
      description: this.description,
      type: this.type as AssetTypeStrings,
      ancestors: this.ancestors,
      effectiveStartDate: this.effectiveStartDate?.toISOString(),
      effectiveEndDate: this.effectiveEndDate?.toISOString(),
      moveInDate: this.moveInDate?.toISOString(),
      moveOutDate: this.moveOutDate?.toISOString(),
      product: this.product,
      location: this.location?.toHexString(),
    };
  }
}

// export type { MongoAssetDataModel };
