export default async function Page({
    params,
}: {
    params: Promise<{ tmp: string[] }>
}) {
    const tmp = (await params).tmp;
    return <div>route: {tmp}</div>
}