import { Parser } from "@/lib/TestDBModel";
import { Document, ObjectId } from "mongodb";

export interface Data {
  _id?: ObjectId;
  廠處: string;
  發生部門: string;
  汙染類別: string;
  時間起迄: string;
  發生時間: string;
  "損失金額(千元)": number;
  訴願情形: string;
}

export class DataParser implements Parser<Data> {
  private columns = [
    "_id",
    "廠處",
    "發生部門",
    "汙染類別",
    "時間起迄",
    "發生時間",
    "損失金額(千元)",
    "訴願情形",
  ] as (keyof Data)[];
  private requiredColumns = [
    "廠處",
    "發生部門",
    "汙染類別",
    "時間起迄",
    "發生時間",
    "損失金額(千元)",
    "訴願情形",
  ] as (keyof Data)[];
  parse(data: Document): Data {
    return {
      _id: data._id.toHexString(),
      廠處: data.廠處,
      發生部門: data.發生部門,
      汙染類別: data.汙染類別,
      時間起迄: data.時間起迄,
      發生時間: data.發生時間,
      "損失金額(千元)": data["損失金額(千元)"],
      訴願情形: data.訴願情形,
    };
  }

  private validateColumn(col: string) {
    if (!(this.columns as string[]).includes(col)) {
      throw new Error(`Invalid column: ${col}`);
    }
  }

  private checkAllColumnsExist(idxColMap: Record<number, keyof Data>) {
    const columns = Object.values(idxColMap);
    const missingColumns = this.requiredColumns.filter(
      (col) => !columns.includes(col)
    );
    if (missingColumns.length > 0) {
      throw new Error(`Missing columns: ${missingColumns.join(", ")}`);
    }
  }

  private parseText(col: string, value: string): any {
    if (col === "損失金額(千元)") {
      return parseFloat(value);
    }
    return value;
  }

  fromCSV(csv: string): Data[] {
    const lines = csv.split("\n");
    const columns = lines[0].split(",");
    const data = lines.slice(1);
    const idxColMap = columns.reduce(
      (acc, col, idx) => {
        this.validateColumn(col);
        acc[idx] = col as keyof Data;
        return acc;
      },
      {} as Record<number, keyof Data>
    );

    this.checkAllColumnsExist(idxColMap);

    return data.map((line) => {
      const values = line.split(",");
      return values.reduce(
        (acc, value, idx) => {
          acc[idxColMap[idx]] = this.parseText(idxColMap[idx], value);
          return acc;
        },
        {} as Record<string, any>
      ) as Data;
    });
  }
}
