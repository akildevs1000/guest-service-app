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
            <div>
              <h2 className="px-1 pb-2 text-base font-bold sm:px-0 sm:text-lg">Personal Information</h2>
              <div className="space-y-4">
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">Full Name</span>
                  <input
                    id="full-name"
                    className="form-input h-12 w-full rounded-xl border border-gray-300 bg-gray-50 p-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-300 focus:outline-0 focus:ring-2 focus:ring-[var(--color-primary)] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
                    defaultValue="Ethan Carter"
                    autoComplete="name"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">Email</span>
                  <input
                    id="email"
                    type="email"
                    className="form-input h-12 w-full rounded-xl border border-gray-300 bg-gray-50 p-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-300 focus:outline-0 focus:ring-2 focus:ring-[var(--color-primary)] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
                    defaultValue="ethan.carter@email.com"
                    autoComplete="email"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">Phone Number</span>
                  <input
                    id="phone-number"
                    type="tel"
                    className="form-input h-12 w-full rounded-xl border border-gray-300 bg-gray-50 p-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-300 focus:outline-0 focus:ring-2 focus:ring-[var(--color-primary)] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
                    defaultValue="+1 (555) 123-4567"
                    autoComplete="tel"
                  />
                </label>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}