import Image from "next/image";
export function DataNotFound() {
  return (
    <div
      className={
        "w-full  flex flex-col justify-center items-center rounded-xl shadow-sm p-3 bg-background space-x-2"
      }
    >
      <div
        className={
          "relative flex flex-col items-center justify-center overflow-clip"
        }
      >
        <p
          className={
            "absolute bottom-12 font-mono text-lg font-semibold text-gray-500"
          }
        >
          查無資料請點擊左上角新增資料
        </p>
        <Image
          src={"/no_data.png"}
          alt={"no data"}
          width={"600"}
          height={"512"}
          className={"object-center"}
        />
      </div>
    </div>
  );
}
