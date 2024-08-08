enum Status {
  ACTIVE = "運轉中",
  INACTIVE = "停止",
  ERROR = "錯誤",
  MAINTENANCE = "維修中",
  SCRAPPED = "報廢",
  UNKNOWN = "未知",
}

type StatusStrings = keyof typeof Status;

function getStatus(status: string): Status {
  return Status[status as StatusStrings];
}

export { Status, getStatus };
