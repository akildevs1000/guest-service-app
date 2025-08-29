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
            <header className="flex items-center justify-between p-4 top-0 bg-[#111714]/80">
                <button className="text-white" onClick={() => router.back()}>
                    <span className="material-symbols-outlined"> arrow_back </span>
                </button>
                <h1 className="text-white text-lg font-bold">Room Service</h1>
                <div className="w-8"></div>
            </header>
            <nav
                className=" bg-gray-100 dark:bg-[#111714]"
            >
                <div
                    className="flex border-b border-gray-300 dark:border-[#3d5245] px-4 gap-6 overflow-x-auto whitespace-nowrap"
                >
                    <a
                        className="flex flex-col items-center justify-center border-b-2 border-b-[var(--primary-color)] text-[var(--primary-color)] pb-3 pt-4 bg-transparent"
                        href="#"
                    >
                        <p className="text-sm font-bold">Featured</p>
                    </a>
                    <a
                        className="flex flex-col items-center justify-center border-b-2 border-b-transparent text-gray-500 dark:text-[#9eb7a8] pb-3 pt-4 hover:text-gray-900 dark:hover:text-white transition-colors bg-transparent"
                        href="#"
                    >
                        <p className="text-sm font-bold">Breakfast</p>
                    </a>
                    <a
                        className="flex flex-col items-center justify-center border-b-2 border-b-transparent text-gray-500 dark:text-[#9eb7a8] pb-3 pt-4 hover:text-gray-900 dark:hover:text-white transition-colors bg-transparent"
                        href="#"
                    >
                        <p className="text-sm font-bold">Lunch</p>
                    </a>
                    <a
                        className="flex flex-col items-center justify-center border-b-2 border-b-transparent text-gray-500 dark:text-[#9eb7a8] pb-3 pt-4 hover:text-gray-900 dark:hover:text-white transition-colors bg-transparent"
                        href="#"
                    >
                        <p className="text-sm font-bold">Dinner</p>
                    </a>
                    <a
                        className="flex flex-col items-center justify-center border-b-2 border-b-transparent text-gray-500 dark:text-[#9eb7a8] pb-3 pt-4 hover:text-gray-900 dark:hover:text-white transition-colors bg-transparent"
                        href="#"
                    >
                        <p className="text-sm font-bold">Drinks</p>
                    </a>
                    <a
                        className="flex flex-col items-center justify-center border-b-2 border-b-transparent text-gray-500 dark:text-[#9eb7a8] pb-3 pt-4 hover:text-gray-900 dark:hover:text-white transition-colors bg-transparent"
                        href="#"
                    >
                        <p className="text-sm font-bold">Desserts</p>
                    </a>
                </div>
            </nav>
            <main className="flex-1 overflow-y-auto p-4 space-y-6">
                <section>
                    <h2
                        className="text-gray-900 dark:text-white text-2xl font-bold tracking-tight px-4 pb-4 pt-2"
                    >
                        Popular
                    </h2>
                    <div className="space-y-4">
                        <div
                            className="flex flex-col gap-4 rounded-xl p-4 bg-gray-100 dark:bg-[#1c2620] hover:bg-gray-200 dark:hover:bg-[#29382f] transition-colors cursor-pointer"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex flex-col gap-1 flex-1">
                                    <p className="text-gray-900 dark:text-white text-lg font-bold">
                                        Classic Eggs Benedict
                                    </p>
                                    <p className="text-gray-500 dark:text-[#9eb7a8] text-sm">
                                        Poached eggs, Canadian bacon, English muffin, hollandaise
                                        sauce
                                    </p>
                                    <p className="text-gray-900 dark:text-white font-bold mt-2">
                                        $18.00
                                    </p>
                                </div>
                                <div
                                    className="w-28 h-28 bg-center bg-no-repeat bg-cover rounded-lg shrink-0"
                                    style={{
                                        backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCbrvANzqGts0LiM7k-BJECGWLGsIRpbzwgQCo9t4EvaE--JxgR6yFA-vLlYV6U6rMvyNN61pmtDXUEGbPQgU0Lgd0mMGRJq0VwVvIEqBRbDZRBjiOGUO8j3mAQ4dHpyeKBsSWd5J7cdgQx13GcvnfEk_-QsC8m_yzJnMrVKgNBb08hY4P1GrQ8NRnRv6O41OQeNQJAoff8RAh4PqMnfZjCEzoyqFV3-ZR-yVOPPHmYDiAFOUCC3woS3XMScDBX7k-3vsRtELy_nBw')`
                                    }}
                                ></div>
                            </div>


                            <button
                                className="w-full text-[#111714] dark:text-gray-900 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                                style={{ background: "var(--color-primary)" }}
                            >
                                <span className="material-symbols-outlined">
                                    add_shopping_cart
                                </span>
                                <span>Add to Cart</span>
                            </button>
                        </div>

                    </div>
                </section>
                <section>
                    <h2
                        className="text-gray-900 dark:text-white text-2xl font-bold tracking-tight px-4 pb-4 pt-5"
                    >
                        Breakfast
                    </h2>
                    <div className="space-y-4">
                        <div
                            className="flex flex-col gap-4 rounded-xl p-4 bg-gray-100 dark:bg-[#1c2620] hover:bg-gray-200 dark:hover:bg-[#29382f] transition-colors cursor-pointer"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex flex-col gap-1 flex-1">
                                    <p className="text-gray-900 dark:text-white text-lg font-bold">
                                        Pancakes
                                    </p>
                                    <p className="text-gray-500 dark:text-[#9eb7a8] text-sm">
                                        Fluffy pancakes, butter, maple syrup
                                    </p>
                                    <p className="text-gray-900 dark:text-white font-bold mt-2">
                                        $14.00
                                    </p>
                                </div>
                                <div
                                    className="w-28 h-28 bg-center bg-no-repeat bg-cover rounded-lg shrink-0"
                                    style={{
                                        backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC-dMymewzgof7Y7JirY88OnApm7ywLRAaNpBZT4_PIF7iedl8T1Cq3f_lU-1BtspP2JvBRmmlY24TJ9zo98trpDiyMVvFzgsYk_D45lbaMFaNGPP8PBH0AvzF8d-R6ZfavGv4Y9fV2sKXejedK9c-QOd4AmI8sWla7XLGRVFzO8f1NZPsB3WZBk6HQu-2Jmec-MdGUcn1CA_vwLBrukaFrpxqUg1-ufJ53uu9laiIDjHb-RGouwzCqKXyB1klOP3vLH40ZMed-NeY')`
                                    }}
                                ></div>
                            </div>
                            <button
                                style={{ background: "var(--color-primary)" }}
                                className="w-full bg-[var(--primary-color)] text-[#111714] dark:text-gray-900 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-green-400 transition-colors"
                            >
                                <span className="material-symbols-outlined">
                                    add_shopping_cart
                                </span>
                                <span>Add to Cart</span>
                            </button>
                        </div>
                        <div
                            className="flex flex-col gap-4 rounded-xl p-4 bg-gray-100 dark:bg-[#1c2620] hover:bg-gray-200 dark:hover:bg-[#29382f] transition-colors cursor-pointer"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex flex-col gap-1 flex-1">
                                    <p className="text-gray-900 dark:text-white text-lg font-bold">
                                        Waffles
                                    </p>
                                    <p className="text-gray-500 dark:text-[#9eb7a8] text-sm">
                                        Crispy waffles, whipped cream, fresh berries
                                    </p>
                                    <p className="text-gray-900 dark:text-white font-bold mt-2">
                                        $15.00
                                    </p>
                                </div>
                                <div
                                    className="w-28 h-28 bg-center bg-no-repeat bg-cover rounded-lg shrink-0"
                                    style={{
                                        backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCJEAmLlUo9Q-4S0VomteeI1zv4ixhAykEyKFE_btqHEdBOVEiloKD4OTEomwbyi2Ipe10mvgq-tWsBx8WW6kQNPEf7qRlE4IaqgwGvH55cUDraNlfem_270AjKZtZc9FW_y2RocvpdR1pIJKhsBh_Cov9Y_HY-v1-MBoifhInvmNz-3e1Hh5_dn54HcpM_1p8guVLQH6FTJgj5oGBfnLMfCsKv-JY3M-77EvbuC8js2tbBcCoVXGRI3xipv9CgmKOuEkcM1dMrVCA')`
                                    }}
                                ></div>
                            </div>
                            <button
                                style={{ background: "var(--color-primary)" }}
                                className="w-full bg-[var(--primary-color)] text-[#111714] dark:text-gray-900 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-green-400 transition-colors"
                            >
                                <span className="material-symbols-outlined">
                                    add_shopping_cart
                                </span>
                                <span>Add to Cart</span>
                            </button>
                        </div>
                        <div
                            className="flex flex-col gap-4 rounded-xl p-4 bg-gray-100 dark:bg-[#1c2620] hover:bg-gray-200 dark:hover:bg-[#29382f] transition-colors cursor-pointer"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex flex-col gap-1 flex-1">
                                    <p className="text-gray-900 dark:text-white text-lg font-bold">
                                        Omelette
                                    </p>
                                    <p className="text-gray-500 dark:text-[#9eb7a8] text-sm">
                                        Three-egg omelette, choice of fillings
                                    </p>
                                    <p className="text-gray-900 dark:text-white font-bold mt-2">
                                        $17.00
                                    </p>
                                </div>
                                <div
                                    className="w-28 h-28 bg-center bg-no-repeat bg-cover rounded-lg shrink-0"
                                    style={{
                                        backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCYzLhpB6Y6_h9dWACP1gjrr2lwvryHsrgVp0cmZ2a61es1jPo8r4GKbqPOON9TJ0yRpmOpOGWoma5Yy2HAzFFfpVokCgDnFFwpo5ECNxejp0pW34pvUBE0uQtbgkMA_I-ikfkhwyahcFGsFqyVOyCFO3FfxxnjwYd1V_hqGLaNjFzwkEPxJBz8I9ESYAfOeCCTGRiFBOD6w8HSCEVjVuiK8fqjFA1sfUQUgpsHGoryn_bLleCCTZwGMlmqpPbU1SYblXhGMXPqE1s')`
                                    }}
                                ></div>
                            </div>
                            <button
                                style={{ background: "var(--color-primary)" }}
                                className="w-full bg-[var(--primary-color)] text-[#111714] dark:text-gray-900 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-green-400 transition-colors"
                            >
                                <span className="material-symbols-outlined">
                                    add_shopping_cart
                                </span>
                                <span>Add to Cart</span>
                            </button>
                        </div>
                    </div>
                </section>
                
            </main>

        </div>
    );
}