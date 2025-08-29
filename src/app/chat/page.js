"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ChatPage() {
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
            className="flex flex-col min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100"
            style={{ fontFamily: "'Spline Sans', 'Noto Sans', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" }}
        >
            <header className="flex items-center justify-between p-4 sticky top-0 z-10 bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
                <div className="mx-auto max-w-screen-sm w-full flex justify-between items-center">
                    <button className="text-gray-700 dark:text-gray-200" onClick={() => router.push("/")}>
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">Chat</h1>
                    <div className="w-8"></div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
                <div className="flex items-start gap-3">
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDaj17cJjANp9LMQXb0FUwyLIrIS78X2Om68CNR1UmwE0Y5BlExpBvOVvSpeEMbrUQCqlt3HMOFYqmsCNQpc-KAwunNZIf1LDJRDMPBM26D5Epg2UWoFYm3j4Y5Kgbd4OgR1SOa6wAHiL2Wzgp_Gdc4MVmHQkqefhHRtggJcoPPNMjLCCKx6-ryhNEaEx5Fuz_jjIJbpLHi2klCuFohqTqtqWVwVUVo8QMQoel7f5Glly_8y1rhNe9ok7Lt3Wmvi6QcdUwtQZNCXnU")' }}
                    ></div>
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                            <p className="font-bold">Reception</p>
                            <p className="text-xs text-[var(--text-secondary)]">9:21 AM</p>
                        </div>
                        <div className="p-3 rounded-lg rounded-tl-none mt-1 max-w-xs bg-gray-900">
                            <p>Good morning, Mr. Thompson. How can we assist you today?</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-start gap-3 flex-row-reverse">
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhdoRUSFze8Q7P9AM68L62s9foMgMLPbS0jGt6kHUa0tbrjPVCBr1zt0XbDxjN6rBN9a-tmqNHFsZYFyAK93dixP_BBw9aNbXaZklu3a3l48d7dFrQC5b8LqgBbQPBesD1A2Oq7fa-P4xzlkkz7FHxV7m68ZOrfM5Q87Fs83yBwmcZJ_GH4jum-zJZ9wOdJWTNwOmaK1cijDyRXJ-7KxqRThG0oi7igjEBp7HJ8Ot7L1eW003M2Ew0tTSjZkNs9BR9tCTKq8SNtek")' }}
                    ></div>
                    <div className="flex flex-col items-end">
                        <div className="flex items-baseline gap-2">
                            <p className="font-bold">You</p>
                            <p className="text-xs text-[var(--text-secondary)]">9:32 AM</p>
                        </div>
                        <div
                            className="text-black p-3 rounded-lg rounded-tr-none mt-1 max-w-xs"
                            style={{ background: "var(--color-primary)" }}
                        >
                            <p>Hi, I'd like to request extra towels for the room, please.</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDaj17cJjANp9LMQXb0FUwyLIrIS78X2Om68CNR1UmwE0Y5BlExpBvOVvSpeEMbrUQCqlt3HMOFYqmsCNQpc-KAwunNZIf1LDJRDMPBM26D5Epg2UWoFYm3j4Y5Kgbd4OgR1SOa6wAHiL2Wzgp_Gdc4MVmHQkqefhHRtggJcoPPNMjLCCKx6-ryhNEaEx5Fuz_jjIJbpLHi2klCuFohqTqtqWVwVUVo8QMQoel7f5Glly_8y1rhNe9ok7Lt3Wmvi6QcdUwtQZNCXnU")' }}
                    ></div>
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                            <p className="font-bold">Reception</p>
                            <p className="text-xs text-[var(--text-secondary)]">9:48 AM</p>
                        </div>
                        <div className="p-3 rounded-lg rounded-tl-none mt-1 max-w-xs bg-gray-900">
                            <p>Certainly, Mr. Thompson. We'll have them sent up to your room shortly.</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-start gap-3 flex-row-reverse">
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBVg-L426bptLwa8XZ97AUn0jxgUwYrZ7XxcvTVhFkVg5yarUz6icj4vyFQum-1FZSpLhXzDR3MyGClV8uFqduE3SaO6_JADahQ6_FE7B9mNBcTzPGf2-yUxnL5UnrFOYTfSAVRkAo1mFSTQWDdr9Uh-UxP6fhX7U6DRB7sLfCsqNFoDCbbdjKQGf-XEKf8Go9vm8xlFuTpto5CW_oYop0K0Y_we_3RK7SPxH-5fuBQja8p_OWx4KyqpCdEgpO9hCANdIvP_rEmW1A")' }}
                    ></div>
                    <div className="flex flex-col items-end">
                        <div className="flex items-baseline gap-2">
                            <p className="font-bold">You</p>
                            <p className="text-xs text-[var(--text-secondary)]">9:56 AM</p>
                        </div>
                        <div
                            className="text-black p-3 rounded-lg rounded-tr-none mt-1 max-w-xs"
                            style={{ background: "var(--color-primary)" }}
                        >
                            <p>Thank you!</p>
                        </div>
                    </div>
                </div>
                 <div className="flex items-start gap-3">
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDaj17cJjANp9LMQXb0FUwyLIrIS78X2Om68CNR1UmwE0Y5BlExpBvOVvSpeEMbrUQCqlt3HMOFYqmsCNQpc-KAwunNZIf1LDJRDMPBM26D5Epg2UWoFYm3j4Y5Kgbd4OgR1SOa6wAHiL2Wzgp_Gdc4MVmHQkqefhHRtggJcoPPNMjLCCKx6-ryhNEaEx5Fuz_jjIJbpLHi2klCuFohqTqtqWVwVUVo8QMQoel7f5Glly_8y1rhNe9ok7Lt3Wmvi6QcdUwtQZNCXnU")' }}
                    ></div>
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                            <p className="font-bold">Reception</p>
                            <p className="text-xs text-[var(--text-secondary)]">9:21 AM</p>
                        </div>
                        <div className="p-3 rounded-lg rounded-tl-none mt-1 max-w-xs bg-gray-900">
                            <p>Good morning, Mr. Thompson. How can we assist you today?</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-start gap-3 flex-row-reverse">
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhdoRUSFze8Q7P9AM68L62s9foMgMLPbS0jGt6kHUa0tbrjPVCBr1zt0XbDxjN6rBN9a-tmqNHFsZYFyAK93dixP_BBw9aNbXaZklu3a3l48d7dFrQC5b8LqgBbQPBesD1A2Oq7fa-P4xzlkkz7FHxV7m68ZOrfM5Q87Fs83yBwmcZJ_GH4jum-zJZ9wOdJWTNwOmaK1cijDyRXJ-7KxqRThG0oi7igjEBp7HJ8Ot7L1eW003M2Ew0tTSjZkNs9BR9tCTKq8SNtek")' }}
                    ></div>
                    <div className="flex flex-col items-end">
                        <div className="flex items-baseline gap-2">
                            <p className="font-bold">You</p>
                            <p className="text-xs text-[var(--text-secondary)]">9:32 AM</p>
                        </div>
                        <div
                            className="text-black p-3 rounded-lg rounded-tr-none mt-1 max-w-xs"
                            style={{ background: "var(--color-primary)" }}
                        >
                            <p>Hi, I'd like to request extra towels for the room, please.</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDaj17cJjANp9LMQXb0FUwyLIrIS78X2Om68CNR1UmwE0Y5BlExpBvOVvSpeEMbrUQCqlt3HMOFYqmsCNQpc-KAwunNZIf1LDJRDMPBM26D5Epg2UWoFYm3j4Y5Kgbd4OgR1SOa6wAHiL2Wzgp_Gdc4MVmHQkqefhHRtggJcoPPNMjLCCKx6-ryhNEaEx5Fuz_jjIJbpLHi2klCuFohqTqtqWVwVUVo8QMQoel7f5Glly_8y1rhNe9ok7Lt3Wmvi6QcdUwtQZNCXnU")' }}
                    ></div>
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                            <p className="font-bold">Reception</p>
                            <p className="text-xs text-[var(--text-secondary)]">9:48 AM</p>
                        </div>
                        <div className="p-3 rounded-lg rounded-tl-none mt-1 max-w-xs bg-gray-900">
                            <p>Certainly, Mr. Thompson. We'll have them sent up to your room shortly.</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-start gap-3 flex-row-reverse">
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBVg-L426bptLwa8XZ97AUn0jxgUwYrZ7XxcvTVhFkVg5yarUz6icj4vyFQum-1FZSpLhXzDR3MyGClV8uFqduE3SaO6_JADahQ6_FE7B9mNBcTzPGf2-yUxnL5UnrFOYTfSAVRkAo1mFSTQWDdr9Uh-UxP6fhX7U6DRB7sLfCsqNFoDCbbdjKQGf-XEKf8Go9vm8xlFuTpto5CW_oYop0K0Y_we_3RK7SPxH-5fuBQja8p_OWx4KyqpCdEgpO9hCANdIvP_rEmW1A")' }}
                    ></div>
                    <div className="flex flex-col items-end">
                        <div className="flex items-baseline gap-2">
                            <p className="font-bold">You</p>
                            <p className="text-xs text-[var(--text-secondary)]">9:56 AM</p>
                        </div>
                        <div
                            className="text-black p-3 rounded-lg rounded-tr-none mt-1 max-w-xs"
                            style={{ background: "var(--color-primary)" }}
                        >
                            <p>Thank you!</p>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="bg-white/90 backdrop-blur-sm p-4 sticky bottom-0 dark:bg-gray-950/90">
                <div className="flex items-center gap-2 relative">
                    <input
                        className="flex-1 bg-gray-100 border-none rounded-full h-12 pr-20 pl-5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[var(--color-primary)] dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 focus:outline-none"
                        placeholder="Type a message..."
                        type="text"
                    />
                    <div className="absolute right-14 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <button className="rounded-full size-8 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                            <span className="material-symbols-outlined text-base">photo_camera</span>
                        </button>
                        <button className="rounded-full size-8 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                            <span className="material-symbols-outlined text-base">mic</span>
                        </button>
                    </div>
                    <button className="bg-[var(--color-primary)] rounded-full size-12 flex items-center justify-center text-black hover:bg-opacity-80 transition-colors flex-shrink-0">
                        <span className="material-symbols-outlined">send</span>
                    </button>
                </div>
            </footer>
        </div>
    );
}