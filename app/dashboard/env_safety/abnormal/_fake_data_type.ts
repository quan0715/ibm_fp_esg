export type Data = {
  今年度主管機關稽核通報單: PlantAuthorityReport[];
  今年度環保通報單: PlantEnvironmentalNotification[];
  今年度外稽檢核異常與結案: ExternalInspectionReport[];
  今年度環保異常報告單: PlantEnvironmentalAbnormalReport[];
};

export type PlantAuthorityReport = {
  廠處: string;
  通報單: AuthorityAuditReport[];
};

export type AuthorityAuditReport = {
  通報單編號: string;
  受稽單位: string;
  稽查類別: string;
  稽查單位: string;
  稽查人員: string;
  出入廠時間: string;
  異常事項數: number;
  主管: string;
};

export type PlantEnvironmentalNotification = {
  廠處: string;
  通報單: EnvironmentalNotification[];
};

export type EnvironmentalNotification = {
  發生單位: string;
  發生時間: string;
  發生地點: string;
  汙染類別: string;
  事故物質名稱: string;
  狀態: string;
  預計修復完成時間: string;
  "主管(含職稱)": string;
  報備人員: string;
};

export type ExternalInspectionReport = {
  廠處: string;
  外稽檢核: ExternalInspection[];
};

export type ExternalInspection = {
  管制編號: string;
  事業部: string;
  受檢部門: string;
  立案人員代號: string;
  檢核日期: string;
  待覆日期: string;
  "設備(作業)類別": string;
  "設施(管理)項目": string;
  "結案(Y/N)": string;
};

export type PlantEnvironmentalAbnormalReport = {
  廠處: string;
  異常報告單: EnvironmentalAbnormalReport[];
};

export type EnvironmentalAbnormalReport = {
  本單編號: string;
  立案時間: string;
  發生部門: string;
  作業類別: string;
  待覆日期: string;
  經辦: string;
  主管: string;
  改善情形: string;
};
