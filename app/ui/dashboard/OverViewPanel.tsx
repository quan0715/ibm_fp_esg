
import { DashboardCard } from "@/app/ui/components/DashboardCard"
import { SingleDataCard } from "@/app/ui/components/data/DataCard"
import { MaterialIcon } from "@/app/ui/assets/MaterialIcon"
import { Card,CardBody } from "@nextui-org/card"
import { Divider } from "@nextui-org/react"
const overViewData = [
  {
    data: "45",
    label: "風機數量 cnt",
    icon: "mode_fan"
  },
  {
    data: "125.56",
    label: "發電量 (MW)",
    icon: "electric_bolt"
  },
  {
    data: "31.7",
    label: "周圍溫度 ºC",
    icon: "device_thermostat"
  },
  {
    data: "30.7",
    label: "海面溫度 ºC",
    icon: "device_thermostat"
  },
  {
    data: "15.4",
    label: "風速 (m/s)",
    icon: "speed"
  },
  {
    data: "0.4",
    label: "浪高（m）",
    icon: "waves"
  },
]
// row-start-${index % 2} col-start-${index % 2} col-end-${(index % 2)+1}
export function OverViewPanel() {
  return (
    <div className="grid bg-background gap-5 md:p-4">
      <div 
        // title={"快速監測數據"} 
        className="grid grid-row-1 row-start-1 col-start-1 col-end-3 bg-ba">
          <div className="grid gap-5 grid-row-2 md:grid-row-1">
            {
              overViewData.map((data, index) => {
                return (
                  <Card key={index} className={`row-start-${(index % 2) + 1} md:row-start-1 md:col-start-auto`}>
                    <SingleDataCard key={index} data={data.data} label={data.label} icon={data.icon} />
                    {/* <Divider orientation="vertical" className="hidden md:block" /> */}
                  </Card>
                )
              })
            }
          </div>    
      </div>
      
      <DashboardCard title={"本週發電量趨勢"} className="row-start-2 col-start-1 col-end-3 md:row-start-2 md:col-start-1 md:col-end-2">
          {"本週發電量趨勢"}
      </DashboardCard>
      <DashboardCard title={"Asset 狀態簡表"} className="row-start-3 col-start-1 col-end-3 md:row-start-2 md:col-start-2 md:col-end-3">
        {"Asset 狀態簡表"}
      </DashboardCard>
      <DashboardCard title={"異常回報清單"} className="row-start-4 col-start-1 col-end-3 md:row-start-3 md:col-start-1 md:col-end-2">
        {"異常回報清單"}
      </DashboardCard>
      <DashboardCard title={"工單編號簡表"} className="row-start-5 col-start-1 col-end-3 md:row-start-3 md:col-start-2 md:col-end-3">
        {"工單編號簡表"}
      </DashboardCard>
    </div>   
  )
}