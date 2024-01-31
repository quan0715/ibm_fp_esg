import React from "react";

export function PrimaryButton({
    label = 'label',
    icon = '',}) {
    return (
        <>
            <div className="flex grow justify-center items-center bg-blue-400 rounded-full p-1.5">
                <p className="text-sm font-semibold">登入</p>
                <span className="material-symbols-outlined">
                    {icon}
                </span>
                <span className=""></span>
            </div>
        </>
    );
}