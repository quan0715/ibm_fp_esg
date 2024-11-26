"use server";

async function Page({ tmp }: { tmp: Promise<string[]> }) {
    console.log(tmp)
    return <div>

    </div>
}

export default Page