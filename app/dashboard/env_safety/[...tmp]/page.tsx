"use server";

export const getServerStaticProps = async () => ({})

async function Page({ tmp }: { tmp: Promise<string[]> }) {
    console.log(tmp)
    return <div>

    </div>
}

export default Page