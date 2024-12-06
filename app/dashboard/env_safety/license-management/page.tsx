"use server";

import KPICard from "./_cards/KPICard";
import StaticCard from "./_cards/StatisticChart";
import data from "./_fake_data.json";
import {
  BaseLine,
  PollutionData,
  Root,
} from "@/app/dashboard/env_safety/air-pollution/_fake_data_type";

async function Page() {
  return (
    <div className="p-4 max-w-full w-full flex flex-col">
      <div
        className={
          "w-full grid grid-cols-5 grid-rows-[auto_1fr] gap-x-2.5 gap-y-[1em]"
        }
      >
        {data.kpiData.map((kpi, i) => {
          return <KPICard key={kpi.title} kpi={kpi} />;
        })}
      </div>
    </div>
  );
}

Page.getInitialProps = async () => ({});

export default Page;
