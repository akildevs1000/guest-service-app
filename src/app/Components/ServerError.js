// components/Loader.js
export default function ServerError() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
            <div className="rounded-2xl bg-white dark:bg-gray-900 shadow-xl p-8 max-w-md w-full text-center">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    Oops! Something went wrong
                </h2>
            </div>
        </div>
    );
}
