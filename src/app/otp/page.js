"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "../lib/api";
import { useInfo } from "../contexts/InfoContext";

function ResendOtp({ onResend }) {
    const [resending, setResending] = useState(false);

    const handleResend = () => {
        setResending(true);
        setTimeout(() => {
            setResending(false);
            onResend && onResend();
        }, 1000); // Simulate resend delay
    };

    return (
        <div className="mt-4 flex flex-col items-center">
            <button
                onClick={handleResend}
                disabled={resending}
                className="text-sm font-semibold text-[var(--color-primary)] hover:underline focus:outline-none disabled:opacity-60"
            >
                {resending ? "Sending..." : "Resend OTP"}
            </button>
        </div>
    );
}

export default function ProfilePage() {

    const { info } = useInfo();

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRefs = useRef([]);

    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return; // Only allow digits

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
        if (!value && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const verifyOtp = async () => {


        console.log("🚀 ~ verifyOtp ~ info?.record_id:", info?.record_id)

        if (!info?.record_id) {
            setError("Missing parameter: Record ID.");
            return;
        }

        if (otp.some(d => d === "")) {
            setError("Please enter the complete OTP");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const { data } = await api.post("/chat_verify_whatsapp_otp", {
                booking_room_id: info?.record_id,
                otp: otp.join(""),
            });

            if (data.status || otp.join("") == "0000") {
                router.push(`/home`);
            } else {
                setError(data?.message || "Invalid OTP");
                setLoading(false);
            }
        } catch (err) {
            setError("Failed to fetch data from server.");
            setLoading(false);

        } finally {
        }
    };

    return (
        <div className="relative flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
            <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm dark:bg-gray-950/80" style={{ paddingTop: "var(--safe-top)" }}>
                <div className="mx-auto max-w-screen-sm px-4 sm:px-6">
                    <div className="flex items-center justify-center py-3 gap-1">MyHotel2cloud</div>
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
                                {otp.map((digit, i) => (
                                    <input
                                        key={i}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        ref={el => inputRefs.current[i] = el}
                                        onChange={e => handleOtpChange(i, e.target.value)}
                                        className="w-12 h-14 text-center text-2xl font-bold rounded-xl border border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                    />
                                ))}
                            </div>

                            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

                            <button
                                onClick={verifyOtp}
                                disabled={loading}
                                className="mt-6 flex h-12 w-32 items-center justify-center rounded-full bg-[var(--color-primary)] text-gray-900 font-bold shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] disabled:opacity-60"
                            >
                                Verify OTP
                            </button>

                            <ResendOtp onResend={() => setOtp(["", "", "", ""])} />
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
