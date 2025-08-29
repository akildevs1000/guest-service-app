"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


function ResendOtp() {
    const [timer, setTimer] = useState(30);
    const [resending, setResending] = useState(false);

    useEffect(() => {
        if (timer > 0 && !resending) {
            const interval = setInterval(() => setTimer(t => t - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer, resending]);

    const handleResend = () => {
        setResending(true);
        setTimeout(() => {
            setTimer(30);
            setResending(false);
        }, 1000); // Simulate resend delay
    };

    return (
        <div className="mt-4 flex flex-col items-center">
            {timer > 0 ? (
                <span className="text-sm text-gray-500 dark:text-gray-400">Resend OTP in <span className="font-semibold">{timer}s</span></span>
            ) : (
                <button
                    onClick={handleResend}
                    disabled={resending}
                    className="text-sm font-semibold text-[var(--color-primary)] hover:underline focus:outline-none disabled:opacity-60"
                >
                    {resending ? "Sending..." : "Resend OTP"}
                </button>
            )}
        </div>
    );
}

export default function ProfilePage() {
    const router = useRouter();

    const [loading, setLoading] = useState(true);

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
                        {/* <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] dark:text-gray-200 dark:hover:bg-gray-800"
              aria-label="Go back"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button> */}
                        {/* <h1 className="flex-1 pr-2 text-center text-lg font-bold sm:text-xl">Guest Info</h1> */}
                    </div>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center min-h-[60vh]">

                <div className="w-full flex flex-col items-center justify-center">
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
                    <section className="space-y-5 w-full">
                        <div className="flex flex-col items-center justify-center min-h-[40vh]">
                            <h2 className="px-1 pb-2 text-base font-bold sm:px-0 sm:text-lg">Enter OTP</h2>
                            <div className="flex gap-3 justify-center mt-2">
                                {[0, 1, 2, 3].map(i => (
                                    <input
                                        key={i}
                                        type="text"
                                        maxLength={1}
                                        className="w-12 h-14 text-center text-2xl font-bold rounded-xl border border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                    />
                                ))}
                            </div>

                            {/* Resend OTP Option */}

                            <button onClick={() => router.push('/home')} className="mt-6 flex h-12 w-32 items-center justify-center rounded-full bg-[var(--color-primary)] text-gray-900 font-bold shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]">
                                Verify OTP
                            </button>
                            <ResendOtp />

                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}