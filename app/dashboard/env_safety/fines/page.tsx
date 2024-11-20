"use server";

import StatisticForm from "./_charts/StatisticForm";
import StatisticChart from "./_charts/StatisticChart";

import data from './_fake_data.json'

async function Page() {
    return <div className="p-4 w-full grid md:grid-cols-[310px_1fr] md:grid-rows-[auto_1fr] gap-x-2.5 gap-y-[1em]">
        <StatisticForm className="h-full" data={data} />
        <StatisticChart className="" data={data} />
        <StatisticChart className="col-span-full" data={data} />
    </div>
}

Page.getInitialProps = async () => ({})

export default Page