import { Tooltip } from "@nextui-org/tooltip";

const speedLevel = [
    0, 1.6, 5.4, 10.7, 20.7
];

export function WindLevelIcon({speed}: {speed: number}) {
    
    const level = speedLevel.findIndex((value) => speed < value, 5);
    const highStartFrom = 4;
    const maxLevel = 5;
    return <div className={"wind_icon flex flex-row space-x-1 items-end"}>
        {
            Array.from({length: maxLevel}, (_, index) => {
                return (<Tooltip
                    key={`wind_level_${index}`}
                    placement={"top"}
                    content={
                        <div className={""}>
                            <p>{`Level ${index}`}</p>
                            <p>{ index == maxLevel - 1
                                ? `> ${speedLevel[index]} M/S`
                                : `${speedLevel[index]} M/S ~ ${speedLevel[index + 1]} M/S`
                            }</p>
                        </div>
                    }
                >
                    <div
                        key={`wind_level_${index}`}
                        className={`w-3 ${index < level ? "bg-primary" : "bg-background"} h-${highStartFrom + index} rounded-xl`}>
                    </div>
                </Tooltip>)
            })
        }
    </div>
}