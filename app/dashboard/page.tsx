// "use client"
import { auth } from "@/lib/auth";

export default function Dashboard() {
    // const session = await auth();
    return (
        <div className={"text-xl h-screen flex flex-col flex-grow-1 justify-center items-center"}>
            Welcome to IBM - ESG Platform
            {/* <p className="text-sm m-2 p-2">
                {JSON.stringify(session)}
            </p> */}
        </div>
    );
}
