import React from "react";

export function PrimaryButton({
    label = 'label',
    icon = '',}) {
    return (
        <button className="flex basis-full justify-between items-center bg-primary rounded-md px-4 py-3 hover:rounded-full">
            <div className="text-sm text-black font-semibold">{label} </div>
            <span className="material-symbols-outlined text-black text-2xl">
                    {icon}
                </span>
        </button>
    );
}

export function SecondaryButton({
label = 'label',
icon = '',}) {
    return (
        <button className="flex basis-full justify-between items-center bg-[#272A2D] rounded-md px-4 py-3 hover:rounded-full ">
            <div className="text-sm text-primary font-semibold">{label}  </div>
            <span className="material-symbols-outlined text-primary text-2xl">{icon}</span>
        </button>
    );
}