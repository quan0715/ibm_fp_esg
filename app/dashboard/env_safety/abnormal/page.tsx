"use server";

import StatisticForm from "./_cards/StatisticForm";
import StatisticChart from "./_cards/StatisticChart";
import StatisticPieChart from "./_cards/StatisticPieChart";
import StatisticBarChart from "./_cards/StatisticBarChart";
import DetailRequestForm from "./_cards/DetailRequestForm";

import data from './_fake_data.json'

async function Page() {
    return <div className="p-4 max-w-full w-full flex flex-col md:grid md:grid-cols-[310px_1fr] md:grid-rows-[auto_1fr] gap-x-2.5 gap-y-[1em]">
        <StatisticForm className="h-full" data={data} />
        <StatisticChart className="h-full max-md:hidden" data={data} />
        <StatisticPieChart className="md:hidden col-span-full" data={data} />
        <StatisticBarChart className="md:hidden col-span-full" data={data} />
        <DetailRequestForm className="col-span-full" data={data} />
    </div>
}

Page.getInitialProps = async () => ({})

export default Page