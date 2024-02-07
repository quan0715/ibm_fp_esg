import { MaterialIcon } from "../../assets/MaterialIcon";

interface TextDataCardProps {
    label?: string;
    data?: string;
    // children?: React.ReactNode;
}
export function TextDataCard({label = "label", data = "data"}: TextDataCardProps) {
    return (
        <div className="flex flex-col items-end">
            <p className="text-medium font-light text-foreground/80">{label}</p>
            <p className="text-medium font-semibold">{data}</p>
        </div>
    );
}

interface SingleDataCardProps extends TextDataCardProps {
    label?: string;
    data? : string;
    unit? : string;
    isFullWidth? : boolean;
    icon? : string | React.ReactNode;
    children?: React.ReactNode;
}


export function SingleDataCard({
    label = "label",
    data = "data",
    unit = "unit",
    isFullWidth = false,
    icon = null,
    children
}: SingleDataCardProps) {
    return (
        <div className="flex flex-col w-full items-start p-4 gap-1 bg-default rounded-lg">
            { 
                typeof icon === "string" ?
                <MaterialIcon icon={icon} className=" text-primary bg-background rounded-lg p-1" /> : icon
            }
            <p className="text-2xl font-semibold">{data}</p>
            <p className="text-sm font-light text-foreground/80">{label}</p>
        </div>
    );
}