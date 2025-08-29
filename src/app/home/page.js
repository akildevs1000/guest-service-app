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
            <header
                className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm dark:bg-gray-950/80"
                style={{ paddingTop: 'var(--safe-top)' }}
            >
                <div className="mx-auto max-w-screen-sm px-4 sm:px-6">
                    <div className="flex items-center py-3 gap-1">
                    </div>
                </div>
            </header>
            <main className="flex-1 py-4">
                <div className="mx-auto max-w-screen-sm px-4 sm:px-6 @container">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="relative">
                            <div
                                className="aspect-square h-24 w-24 rounded-full bg-cover bg-center ring-2 ring-white/70 dark:ring-gray-900/60 sm:h-32 sm:w-32"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDcN5Onr7O-IQ01LHXeOSVJghUxpfYCCLlGyPekLdpXwNUq_4EDSb0ftRSAqC4MYbNuBHet_OjNyV-aUCZ986o_Ycq08v2B5aJEPm6gLqzve1WTGxnlgN_6NMY9Q97PAZlNXeRiwSAcq1_mUL0PZj6QMyK55cmp2dfthbZfavH9uzum4h4LIolk9r-TVydGL0cWCKvbZwfMozo6O48RRE2tIWPDROGPqCak8W7vdhZ8ckrtkRdjGNfMj8ZZxBetxi80d90nZSTcy-w')" }}
                            ></div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-xl font-bold sm:text-2xl">Ethan Carter</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">ethan.carter@email.com</p>
                        </div>
                    </div>
                    <section className="mt-6 space-y-5 sm:mt-8">
                        <div className="mt-12 space-y-6">
                            <div onClick={() => router.push("/food_items")}
                                className="group block rounded-xl bg-gray-900 p-6 transition-all duration-300 ease-in-out hover:bg-zinc-700/80 hover:scale-[1.02]"
                            >
                                <div className="flex items-center gap-6">
                                    <span
                                        className="material-symbols-outlined text-4xl"
                                        style={{ color: "var(--color-primary)" }}
                                    >restaurant_menu</span>
                                    <div>
                                        <h3 className="text-2xl font-bold">Order Food</h3>
                                        <p className="text-zinc-400">
                                            Browse our menu and order directly to your room.
                                        </p>
                                    </div>
                                    <span
                                        className="material-symbols-outlined ml-auto text-zinc-500 transition-transform duration-300 group-hover:translate-x-1"
                                    >arrow_forward_ios</span
                                    >
                                </div>
                            </div>
                            <div onClick={() => router.push("/chat")}
                                className="group block rounded-xl bg-gray-900 p-6 transition-all duration-300 ease-in-out hover:bg-zinc-700/80 hover:scale-[1.02]"
                            >
                                <div className="flex items-center gap-6">
                                    <span
                                        className="material-symbols-outlined text-4xl"
                                        style={{ color: "var(--color-primary)" }}
                                    >logout</span>
                                    <div>
                                        <h3 className="text-2xl font-bold">Checkout</h3>
                                        <p className="text-zinc-400">
                                            View your bill and checkout quickly and easily.
                                        </p>
                                    </div>
                                    <span
                                        className="material-symbols-outlined ml-auto text-zinc-500 transition-transform duration-300 group-hover:translate-x-1"
                                    >arrow_forward_ios</span
                                    >
                                </div>
                            </div>
                            <div onClick={() => router.push("/chat")} className="group block rounded-xl bg-gray-900 p-6 transition-all duration-300 ease-in-out hover:bg-zinc-700/80 hover:scale-[1.02]" href="#">
                                <div className="flex items-center gap-6">
                                    <span className="material-symbols-outlined text-4xl" style={{ color: "var(--color-primary)" }}>chat</span>
                                    <div>
                                        <h3 className="text-2xl font-bold">Chat</h3>
                                        <p className="text-zinc-400">Chat with our staff for any assistance.</p>
                                    </div>
                                    <span className="material-symbols-outlined ml-auto text-zinc-500 transition-transform duration-300 group-hover:translate-x-1">arrow_forward_ios</span>
                                </div>
                            </div>
                            <div onClick={() => router.push("/chat")} className="group block rounded-xl bg-gray-900 p-6 transition-all duration-300 ease-in-out hover:bg-zinc-700/80 hover:scale-[1.02]" href="#">
                                <div className="flex items-center gap-6">
                                    <span className="material-symbols-outlined text-4xl" style={{ color: "var(--color-primary)" }}>local_laundry_service</span>
                                    <div>
                                        <h3 className="text-2xl font-bold">Laundry</h3>
                                        <p className="text-zinc-400">Request laundry service for your clothes.</p>
                                    </div>
                                    <span className="material-symbols-outlined ml-auto text-zinc-500 transition-transform duration-300 group-hover:translate-x-1">arrow_forward_ios</span>
                                </div>
                            </div>
                            <div onClick={() => router.push("/chat")} className="group block rounded-xl bg-gray-900 p-6 transition-all duration-300 ease-in-out hover:bg-zinc-700/80 hover:scale-[1.02]" href="#">
                                <div className="flex items-center gap-6">
                                    <span className="material-symbols-outlined text-4xl" style={{ color: "var(--color-primary)" }}>cleaning_services</span>
                                    <div>
                                        <h3 className="text-2xl font-bold">Housekeeping</h3>
                                        <p className="text-zinc-400">Request room cleaning or extra amenities.</p>
                                    </div>
                                    <span className="material-symbols-outlined ml-auto text-zinc-500 transition-transform duration-300 group-hover:translate-x-1">arrow_forward_ios</span>
                                </div>
                            </div>
                            <div onClick={() => router.push("/chat")} className="group block rounded-xl bg-gray-900 p-6 transition-all duration-300 ease-in-out hover:bg-zinc-700/80 hover:scale-[1.02]" href="#">
                                <div className="flex items-center gap-6">
                                    <span className="material-symbols-outlined text-4xl" style={{ color: "var(--color-primary)" }}>local_taxi</span>
                                    <div>
                                        <h3 className="text-2xl font-bold">Taxi</h3>
                                        <p className="text-zinc-400">Book a taxi for your local travel needs.</p>
                                    </div>
                                    <span className="material-symbols-outlined ml-auto text-zinc-500 transition-transform duration-300 group-hover:translate-x-1">arrow_forward_ios</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}