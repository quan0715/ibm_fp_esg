export interface Root {
  kpiData: KPI[];
  pollutionData: PollutionData[];
  baseLine: BaseLine[];
}

export interface KPI {
  title: string;
  unit: string;
  value: number;
}
export type PollutionType = "TSP" | "SOx" | "NOx" | "VOCs" | "CO";

export interface PollutionData {
  year: number;
  month: number;
  unit: string;
  pollution: PollutionType;
  emission: number;
}

export interface BaseLine {
  unit: string;
  pollution: PollutionType;
  baseLineValue: number;
}
