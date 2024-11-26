export interface Root {
  data: Daum[];
}

export interface Daum {
  廠處: string;
  罰單: GeneratedType[];
}

export interface GeneratedType {
  發生部門: string;
  汙染類別: string;
  時間起迄: string;
  發生時間: string;
  "損失金額(千元)": number;
  訴願情形: string;
}
