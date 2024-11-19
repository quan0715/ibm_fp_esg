"use server";

import Statistic from "./_charts/statisticForm";

import data from './_fake_data.json'

async function Page() {
    return <div>
        <Statistic data={data} />
    </div>
}

Page.getInitialProps = async () => ({})

export default Page