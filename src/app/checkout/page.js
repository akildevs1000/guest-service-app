"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const transactions = [
        {
            id: 1,
            title: "In-Room Dining",
            time: "12:30 PM",
            items: 2,
            amount: "$25.00",
            status: "Delivered",
        },
        {
            id: 2,
            title: "Laundry Service",
            time: "09:00 AM",
            items: 1,
            amount: "$15.50",
            status: "Completed",
        },
        {
            id: 3,
            title: "Spa Treatment",
            time: "03:45 PM",
            items: 1,
            amount: "$120.00",
            status: "Paid",
        },
        {
            id: 4,
            title: "Minibar",
            time: "10:15 PM",
            items: 3,
            amount: "$18.75",
            status: "Pending",
        },
    ];

    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case "Delivered":
            case "Completed":
            case "Paid":
                return "text-[var(--color-primary)]";
            case "Pending":
                return "text-yellow-500";
            default:
                return "text-gray-400";
        }
    };

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
        <div className="relative flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
            <header className="sticky top-0 z-10 p-4 bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
                <div className="flex items-center justify-between mx-auto max-w-screen-sm px-4 sm:px-6">
                    <button className="text-gray-700 dark:text-gray-200" onClick={() => router.back()}>
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">Checkout</h1>
                    <div className="w-8"></div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto space-y-6 p-4">
                <div className="space-y-4">
                    {transactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between rounded-2xl bg-gray-900 p-4">
                            <div className="flex items-center gap-4">
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-gray-100">{transaction.title}</p>
                                    <p className="text-sm text-gray-400">{transaction.time} · {transaction.items} items</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-gray-900 dark:text-gray-100">{transaction.amount}</p>
                                <p className={`text-sm`}>{transaction.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}