import { forwardRef } from "react";

export default forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement> & {
    name: string;
    active?: boolean;
    className?: string;
    disabled?: boolean;
}>(function Tag({ name, active, className, ...props }, ref) {
    const activeClass = active ?
        'bg-[#FFBA08] dark:bf-[#115608]' :
        'bg-[#D9D9D9] dark:bg-[#373737]';
    return <button className={`flex h-7 justify-center items-center gap-2.5 px-[7px] py-px rounded-[10px] ${activeClass} ${className}`}
        ref={ref}
        {...props}>
        <span className="text-center text-sm font-bold leading-[normal]">{name}</span>
    </button>
})