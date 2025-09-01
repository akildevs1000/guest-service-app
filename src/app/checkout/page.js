"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../Components/Loader";
import api from "../lib/api";
import { useInfo } from "../contexts/InfoContext";


export default function CheckoutPage() {

    const { info } = useInfo();

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalAmount, setTotalAmount] = useState(0);
    const router = useRouter();

    useEffect(() => {
        async function fetchTransactions() {
            setLoading(true);
            try {
                // Hardcoded booking_id and company_id for demo, replace with dynamic values as needed
                const booking_id = info.booking_id;
                const company_id = info.company_id;
                const res = await api.get(`/get_transaction_by_booking_id/${booking_id}?company_id=${company_id}`);
                if (res.data && res.data.status) {
                    setTransactions(res.data.transactions || []);
                    setTotalAmount(res.data.totalTransactionAmount || 0);
                } else {
                    setTransactions([]);
                    setTotalAmount(0);
                }
            } catch (err) {
                setTransactions([]);
                setTotalAmount(0);
            } finally {
                setLoading(false);
            }
        }
        fetchTransactions();
    }, []);

    if (loading) {
        return <Loader />;
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
                    {transactions.length === 0 ? (
                        <div className="text-center text-gray-500">No transactions found.</div>
                    ) : (
                        transactions.map((transaction) => (
                            <div key={transaction.id} className="flex items-center justify-between rounded-2xl bg-gray-900 p-4">
                                <div className="flex flex-col gap-1">
                                    <p className="font-semibold text-gray-100">{transaction.desc}</p>
                                    <p className="text-sm text-gray-400">{transaction.date} {transaction.time}</p>
                                    <p className="text-xs text-gray-400">Payment Method: {transaction?.payment_mode?.name ?? "Cash"}</p>
                                </div>
                                <div className="text-right">
                                    {parseFloat(transaction.debit) > 0 && (
                                        <p className="font-semibold text-red-400">Debit: ₹{transaction.debit}</p>
                                    )}
                                    {parseFloat(transaction.credit) > 0 && (
                                        <p className="font-semibold text-green-400">Credit: ₹{transaction.credit}</p>
                                    )}
                                    <p className="text-xs text-gray-400">Balance: ₹{transaction.balance}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="mt-6 text-right text-lg font-bold text-[var(--color-primary)]">
                    Balance: ₹{totalAmount}
                </div>
            </main>
        </div>
    );
}