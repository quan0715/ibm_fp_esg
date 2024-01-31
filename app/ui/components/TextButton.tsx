export function TextButton({label = 'label'}:{label: string}) {
    return (
        <button>
            <div className="flex grow justify-center items-center">
                <p className="text-sm text-primary font-semibold">{label}</p>
            </div>
        </button>
    );
}

