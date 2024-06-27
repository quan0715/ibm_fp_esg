import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardHeader,
} from "@/app/dashboard/_blocks/DashboardCard";
import { Separator } from "@/components/ui/separator";

type KPIData = {
  label: string;
  value: number;
  color?: string;
};
function KPICard({ title, kpiList }: { title: string; kpiList: KPIData[] }) {
  function getKPIListWithSeparator(kpiList: KPIData[]) {
    let result = [];
    for (let index = 0; index < kpiList.length; index++) {
      result.push(
        <div
          key={kpiList[index].label + kpiList[index].color + index}
          className="flex-1 flex flex-col justify-center items-start space-y-2"
        >
          <KPILabelChip
            title={kpiList[index].label}
            color={kpiList[index].color ?? ""}
          />
          <h3 className="text-xl font-semibold px-1">{kpiList[index].value}</h3>
        </div>,
      );
      if (index < kpiList.length - 1) {
        result.push(<Separator orientation={"vertical"} />);
      }
    }
    return result;
  }

  function KPILabelChip({ title, color }: { title: string; color: string }) {
    return (
      <div
        className="rounded-md py-1 px-2"
        style={{
          backgroundColor: color + "10",
          color: color,
        }}
      >
        <h3 className="text-[12px] font-semibold">{title}</h3>
      </div>
    );
  }

  return (
    <DashboardCard>
      <DashboardCardHeader title={title} />
      <DashboardCardContent>
        <div className="w-full h-16 lg:h-20 flex flex-row justify-center items-center space-x-2 px-2 py-1">
          {getKPIListWithSeparator(kpiList)}
        </div>
      </DashboardCardContent>
    </DashboardCard>
  );
}

export function KPIDisplayBlock() {
  return (
    <div className={"flex flex-col justify-start items-start space-y-2"}>
      <KPICard
        key={"GHG 排放量 （頓數）"}
        title={"GHG 排放量 （頓數）"}
        kpiList={[
          { label: "Total", value: 1.54, color: "#397EFF" },
          { label: "Tool", value: 1.02, color: "#8F65AF" },
          { label: "Fac", value: 0.51, color: "#D9730D" },
        ]}
      />
      <KPICard
        key={"核可GHG排放（頓數）"}
        title={"核可GHG排放（頓數）"}
        kpiList={[
          { label: "Total", value: 1.54, color: "#397EFF" },
          { label: "Tool", value: 1.02, color: "#8F65AF" },
          { label: "Fac", value: 0.51, color: "#D9730D" },
        ]}
      />
      <KPICard
        key={"目標達成率 （％）"}
        title={"目標達成率 （％）"}
        kpiList={[
          { label: "Total", value: 1.54, color: "#397EFF" },
          { label: "Tool", value: 1.02, color: "#8F65AF" },
          { label: "Fac", value: 0.51, color: "#D9730D" },
        ]}
      />
    </div>
  );
}
