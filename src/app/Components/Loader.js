// components/Loader.js
export default function Loader() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950">
            <div className="flex flex-col items-center gap-2">
                <div className="loader-spinner" style={{ width: 48, height: 48 }}>
                    <svg className="animate-spin" viewBox="0 0 50 50">
                        <circle
                            className="opacity-25"
                            cx="25"
                            cy="25"
                            r="20"
                            fill="none"
                            stroke="#38e07b"
                            strokeWidth="6"
                        />
                        <path
                            className="opacity-75"
                            fill="#38e07b"
                            d="M25 5a20 20 0 0 1 0 40 20 20 0 0 1 0-40zm0 6a14 14 0 1 0 0 28 14 14 0 0 0 0-28z"
                        />
                    </svg>
                </div>
                <span className="text-base font-medium text-gray-700 dark:text-gray-200">Loading...</span>
            </div>
        </div>
    );
}
