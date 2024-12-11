"use server";

import LicenseKPICard from "./_cards/LicenseKPICard";
import StaffKPICard from "./_cards/StaffKPICard";
import data from "./_fake_data.json";
import { Label } from "@/components/ui/label";

async function Page() {
  return (
    <div className="p-4 max-w-full w-full flex flex-col space-y-4">
      <Label>全公司污染許可證 KPI</Label>
      <div
        className={
          "w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 grid-rows-[auto_1fr] gap-x-2.5 gap-y-[1em]"
        }
      >
        {data.kpiData.license.map((kpi, i) => {
          return <LicenseKPICard key={kpi.pollutionType} kpi={kpi} />;
        })}
      </div>
      <Label>各站專責人員數 KPI</Label>
      <div
        className={
          "w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 grid-rows-[auto_1fr] gap-x-2.5 gap-y-[1em]"
        }
      >
        {data.kpiData.responsibleStaff.map((kpi, i) => {
          return <StaffKPICard key={kpi.location} kpi={kpi} />;
        })}
      </div>
    </div>
  );
}

Page.getInitialProps = async () => ({});

export default Page;
