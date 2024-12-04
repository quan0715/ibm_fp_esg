import { Parser } from "@/lib/TestDBModel";
import { Document } from "mongodb";

export interface Data {
  廠處: string;
  發生部門: string;
  汙染類別: string;
  時間起迄: string;
  發生時間: string;
  "損失金額(千元)": number;
  訴願情形: string;
}

export class DataParser implements Parser<Data> {
  parse(data: Document): Data {
    return {
      廠處: data.廠處,
      發生部門: data.發生部門,
      汙染類別: data.汙染類別,
      時間起迄: data.時間起迄,
      發生時間: data.發生時間,
      "損失金額(千元)": data["損失金額(千元)"],
      訴願情形: data.訴願情形,
    };
  }
}
