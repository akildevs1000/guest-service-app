"use client";
import { useRouter } from "next/navigation";
import { useInfo } from "../contexts/InfoContext";

export default function ProfilePage() {

    const router = useRouter();

    const { info } = useInfo();

    const full_name = info?.customer?.full_name;

    return (
        <div
            className="relative flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100"
        >
            <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm dark:bg-gray-950/80" style={{ paddingTop: "var(--safe-top)" }}>
                <div className="mx-auto max-w-screen-sm px-4 sm:px-6">
                    <div className="flex items-center justify-center py-3 gap-1">MyHotel2cloud</div>
                </div>
            </header>
            <main className="flex-1 py-4">
                <div className="mx-auto max-w-screen-sm px-4 sm:px-6 @container">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-xl font-bold sm:text-1xl">Welcome, {full_name || "---"}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">Enjoy your stay at Myhotel2cloud. We're here to make your visit as comfortable as possible.</p>
                        </div>
                    </div>
                    <section className="mt-6 space-y-5 sm:mt-8">
                        <div className="mt-12 space-y-6">
                            <div onClick={() => router.push("/food_items")}
                                className="group block rounded-xl bg-gray-900 p-4 transition-all duration-300 ease-in-out hover:bg-zinc-700/80 hover:scale-[1.02] select-none"
                            >
                                <div className="flex items-center gap-6">
                                    <span
                                        className="material-symbols-outlined text-4xl"
                                        style={{ color: "var(--color-primary)" }}
                                    >restaurant_menu</span>
                                    <div>
                                        <h3 className="text-1xl font-bold">Order Food</h3>
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
                            <div onClick={() => router.push("/chat")} className="group block rounded-xl bg-gray-900 p-4 transition-all duration-300 ease-in-out hover:bg-zinc-700/80 hover:scale-[1.02] select-none" href="#">
                                <div className="flex items-center gap-6">
                                    <span className="material-symbols-outlined text-4xl" style={{ color: "var(--color-primary)" }}>chat</span>
                                    <div>
                                        <h3 className="text-1xl font-bold">Chat</h3>
                                        <p className="text-zinc-400">Chat with our staff for any assistance.</p>
                                    </div>
                                    <span className="material-symbols-outlined ml-auto text-zinc-500 transition-transform duration-300 group-hover:translate-x-1">arrow_forward_ios</span>
                                </div>
                            </div>
                            <div onClick={() => router.push("/chat")} className="group block rounded-xl bg-gray-900 p-4 transition-all duration-300 ease-in-out hover:bg-zinc-700/80 hover:scale-[1.02] select-none" href="#">
                                <div className="flex items-center gap-6">
                                    <span className="material-symbols-outlined text-4xl" style={{ color: "var(--color-primary)" }}>local_laundry_service</span>
                                    <div>
                                        <h3 className="text-1xl font-bold">Laundry</h3>
                                        <p className="text-zinc-400">Request laundry service for your clothes.</p>
                                    </div>
                                    <span className="material-symbols-outlined ml-auto text-zinc-500 transition-transform duration-300 group-hover:translate-x-1">arrow_forward_ios</span>
                                </div>
                            </div>
                            <div onClick={() => router.push("/chat")} className="group block rounded-xl bg-gray-900 p-4 transition-all duration-300 ease-in-out hover:bg-zinc-700/80 hover:scale-[1.02] select-none" href="#">
                                <div className="flex items-center gap-6">
                                    <span className="material-symbols-outlined text-4xl" style={{ color: "var(--color-primary)" }}>cleaning_services</span>
                                    <div>
                                        <h3 className="text-1xl font-bold">Housekeeping</h3>
                                        <p className="text-zinc-400">Request room cleaning or extra amenities.</p>
                                    </div>
                                    <span className="material-symbols-outlined ml-auto text-zinc-500 transition-transform duration-300 group-hover:translate-x-1">arrow_forward_ios</span>
                                </div>
                            </div>
                            <div onClick={() => router.push("/chat")} className="group block rounded-xl bg-gray-900 p-4 transition-all duration-300 ease-in-out hover:bg-zinc-700/80 hover:scale-[1.02] select-none" href="#">
                                <div className="flex items-center gap-6">
                                    <span className="material-symbols-outlined text-4xl" style={{ color: "var(--color-primary)" }}>local_taxi</span>
                                    <div>
                                        <h3 className="text-1xl font-bold">Taxi</h3>
                                        <p className="text-zinc-400">Book a taxi for your local travel needs.</p>
                                    </div>
                                    <span className="material-symbols-outlined ml-auto text-zinc-500 transition-transform duration-300 group-hover:translate-x-1">arrow_forward_ios</span>
                                </div>
                            </div>
                            <div onClick={() => router.push("/checkout")}
                                className="group block rounded-xl bg-gray-900 p-4 transition-all duration-300 ease-in-out hover:bg-zinc-700/80 hover:scale-[1.02] select-none"
                            >
                                <div className="flex items-center gap-6">
                                    <span
                                        className="material-symbols-outlined text-4xl"
                                        style={{ color: "var(--color-primary)" }}
                                    >logout</span>
                                    <div>
                                        <h3 className="text-1xl font-bold">Billing</h3>
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
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}