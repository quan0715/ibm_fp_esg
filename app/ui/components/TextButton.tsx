export function TextButton({label = 'label'}) {
    return (
        <>
            <div className="flex grow justify-center items-center">
                <p className="text-sm font-semibold text-blue-400">{label}</p>
            </div>
        </>
    );
}

