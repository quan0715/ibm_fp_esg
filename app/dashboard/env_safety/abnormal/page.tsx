"use server";

import test_data from './_fake_data.json'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import DataForm from '../../_components/DataForm';
import { Data } from './_fake_data_type';
import { useMemo } from 'react';
import AuthReportsDetail from './_cards/AuthReportsDetail';
import EnvReportsDetail from './_cards/EnvReportsDetail';
import ExternalInspectionReportDetail from './_cards/ExternalInspectionReportDetail';
import EnvAbnormalReportDetail from './_cards/EnvAbnormalReportDetail';
const data = test_data as Data
async function Page() {
    const sum_cards = useMemo(() => [
        {
            name: "今年度主管機關稽核通報單", sum_card: <DataForm className="w-full h-full" data={[
                {
                    label: '稽核異常事項',
                    value: 0
                },
                {
                    label: '總稽核通報單數',
                    value: 21
                }
            ]} title="今年度主管機關稽核通報單" />
        },
        {
            name: "今年度環保通報單", sum_card: <DataForm className="w-full h-full" data={[
                {
                    label: '環保通報單數',
                    value: 10
                }
            ]} title="今年度環保通報單" />
        },
        {
            name: "今年度外稽檢核異常與結案", sum_card: <DataForm className="w-full h-full" data={[
                {
                    label: '結案單數',
                    value: 19
                },
                {
                    label: '總稽核異常單數',
                    value: 21
                }
            ]} title="今年度外稽檢核異常與結案" />
        },
        {
            name: "今年度環保異常報告單", sum_card: <DataForm className="w-full h-full" data={[
                {
                    label: '已銷案單數',
                    value: 5
                },
                {
                    label: '總環保異常單數',
                    value: 6
                }
            ]} title="今年度環保異常報告單" />
        },
    ], [data])

    const tabs = useMemo<Record<string, any>>(() => ({
        "今年度主管機關稽核通報單": <AuthReportsDetail data={data["今年度主管機關稽核通報單"]} />,
        "今年度環保通報單": <EnvReportsDetail data={data["今年度環保通報單"]} />,
        "今年度外稽檢核異常與結案": <ExternalInspectionReportDetail data={data["今年度外稽檢核異常與結案"]} />,
        "今年度環保異常報告單": <EnvAbnormalReportDetail data={data["今年度環保異常報告單"]} />,
    }), [data])

    return <div className="p-4 max-w-full w-full flex flex-col">
        <Tabs defaultValue="今年度主管機關稽核通報單" className="w-full">
            <TabsList className="grid w-full h-fit md:grid-cols-[1fr_1fr] min-[1440px]:grid-cols-[1fr_1fr_1fr_1fr] max-md:grid-cols-[1fr_1fr_1fr_1fr] max-sm:grid-cols-[1fr_1fr]  [&>*]:p-2 [&>*]:h-full">
                {sum_cards.map(({ name, sum_card }) => <TabsTrigger key={name} className="max-md:hidden data-[state=active]:shadow-[0px_0px_4px_black_inset] dark:data-[state=active]:shadow-[0px_0px_4px_white_inset]" value={name}>{sum_card}</TabsTrigger>)}
                {sum_cards.map(({ name }) => <TabsTrigger key={name} className="md:hidden text-[10px] " value={name}>{name}</TabsTrigger>)}
            </TabsList>
            {sum_cards.map(({ name, sum_card }) => <TabsContent key={name} value={name}>
                <div className="w-full h-fit md:hidden">{sum_card}</div>
                {tabs[name]}
            </TabsContent>)}
        </Tabs>
    </div>
}

Page.getInitialProps = async () => ({})

export default Page