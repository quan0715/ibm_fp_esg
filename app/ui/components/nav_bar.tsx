import Image from 'next/image'
export default function NavBar({
    title = 'bar title',
    }){
    return (
        <nav className="flex w-full pe-8 pl-8 items-center">
            <Image
                src={'/IBM_logo_blue50.png'}
                alt="Logo"
                width={100}
                height={100}
            />
            <p className="text-1xl font-semibold">智慧永續 ESG 平台</p>
        </nav>
    )
}
