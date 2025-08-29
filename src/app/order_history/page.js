"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
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

    return (

        <div
            className="relative flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100"
            style={{ fontFamily: "'Spline Sans', 'Noto Sans', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" }}
        >
            <header className="flex items-center justify-between p-4 sticky top-0 z-10 bg-[#111714]/80 backdrop-blur-sm">
                <button className="text-white" onClick={() => router.back()}>
                    <span className="material-symbols-outlined"> arrow_back </span>
                </button>
                <h1 className="text-white text-lg font-bold">Room Service</h1>
                <div className="w-8"></div>
            </header>

            <main className="space-y-6 p-4">
                <div>
                    <h2 className="mb-4 text-lg font-bold">Today</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-2xl bg-gray-900 p-4">
                            <div className="flex items-center gap-4">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-800">
                                    <svg className="text-primary-400" fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M72,88V40a8,8,0,0,1,16,0V88a8,8,0,0,1-16,0ZM216,40V224a8,8,0,0,1-16,0V176H152a8,8,0,0,1-8-8,268.75,268.75,0,0,1,7.22-56.88c9.78-40.49,28.32-67.63,53.63-78.47A8,8,0,0,1,216,40ZM200,53.9c-32.17,24.57-38.47,84.42-39.7,106.1H200ZM119.89,38.69a8,8,0,1,0-15.78,2.63L112,88.63a32,32,0,0,1-64,0l7.88-47.31a8,8,0,1,0-15.78-2.63l-8,48A8.17,8.17,0,0,0,32,88a48.07,48.07,0,0,0,40,47.32V224a8,8,0,0,0,16,0V135.32A48.07,48.07,0,0,0,128,88a8.17,8.17,0,0,0-.11-1.31Z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold">In-Room Dining</p>
                                    <p className="text-sm text-gray-400">12:30 PM · 2 items</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">$25.00</p>
                                <p className="text-sm text-primary-400">Delivered</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="mb-4 text-lg font-bold">Yesterday</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-2xl bg-gray-900 p-4">
                            <div className="flex items-center gap-4">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-800">
                                    <svg className="text-primary-400" fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M80,56V24a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0Zm40,8a8,8,0,0,0,8-8V24a8,8,0,0,0-16,0V56A8,8,0,0,0,120,64Zm32,0a8,8,0,0,0,8-8V24a8,8,0,0,0-16,0V56A8,8,0,0,0,152,64Zm96,56v8a40,40,0,0,1-37.51,39.91,96.59,96.59,0,0,1-27,40.09H208a8,8,0,0,1,0,16H32a8,8,0,0,1,0-16H56.54A96.3,96.3,0,0,1,24,136V88a8,8,0,0,1,8-8H208A40,40,0,0,1,248,120ZM200,96H40v40a80.27,80.27,0,0,0,45.12,72h69.76A80.27,80.27,0,0,0,200,136Zm32,24a24,24,0,0,0-16-22.62V136a95.78,95.78,0,0,1-1.2,15A24,24,0,0,0,232,128Z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold">Breakfast</p>
                                    <p className="text-sm text-gray-400">8:00 AM · 1 item</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">$15.00</p>
                                <p className="text-sm text-primary-400">Delivered</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between rounded-2xl bg-gray-900 p-4">
                            <div className="flex items-center gap-4">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-800">
                                    <svg className="text-primary-400" fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M239.54,63a15.91,15.91,0,0,0-7.25-9.9,201.49,201.49,0,0,0-208.58,0,16,16,0,0,0-5.37,22l96,157.27a16,16,0,0,0,27.36,0l96-157.27A15.82,15.82,0,0,0,239.54,63ZM63.59,118.5a24,24,0,1,1,24.47,40.09Zm87.92,66.95A24,24,0,0,1,176,145.37Zm32.93-53.93a40,40,0,0,0-41.38,67.77L128,224,96.5,172.43a40,40,0,1,0-41.35-67.76L48.8,94.26a152,152,0,0,1,158.39,0Zm31.1-50.93a168.12,168.12,0,0,0-175.08,0L32,66.77a185.6,185.6,0,0,1,192,0Z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold">Dinner</p>
                                    <p className="text-sm text-gray-400">6:00 PM · 3 items</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">$45.00</p>
                                <p className="text-sm text-primary-400">Delivered</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}