import { Status } from "@/domain/entities/Status";

export function StatusChip({ status }: { status: Status }) {
  const statusColor = {
    [Status.ACTIVE]:
      "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-100",
    [Status.INACTIVE]:
      "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-100",
    [Status.ERROR]: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100",
    [Status.MAINTENANCE]:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100",
    [Status.SCRAPPED]:
      "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-100",
    [Status.UNKNOWN]:
      "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-100",
  };
  return (
    <span
      className={`px-2 py-1 rounded-full text-sm font-semibold ${statusColor[status]}`}
    >
      {status}
    </span>
  );
}
