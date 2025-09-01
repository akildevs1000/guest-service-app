"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import api from "../lib/api";
import { useInfo } from "../contexts/InfoContext";

export default function OrderHistoryPage() {
    const router = useRouter();
    const { info } = useInfo();
    const [loading, setLoading] = useState(true);
    const [ordersByDate, setOrdersByDate] = useState({});

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const { data } = await api.get("/hotel_food_order_history", {
                    params: {
                        company_id: info?.company_id || 3,
                        booking_id: info?.booking_id || 1974,
                        room_id: info?.room_id || 100,
                    },
                });

                if (data?.length) {
                    // Group orders by date
                    const grouped = data.reduce((acc, order) => {
                        const dateObj = new Date(order.request_datetime);
                        const date = dateObj.toISOString().split("T")[0]; // YYYY-MM-DD
                        if (!acc[date]) acc[date] = [];
                        acc[date].push(order);
                        return acc;
                    }, {});
                    setOrdersByDate(grouped);
                } else {
                    setOrdersByDate({});
                }
            } catch (err) {
                console.error("Error fetching order history:", err);
                setOrdersByDate({});
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [info]);

    // Helper to format date as "28 Aug 2025" without comma
    const formatDate = (dateString) => {
        const options = { day: "2-digit", month: "short", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options).replace(/,/g, "");
    };

    // Helper to format time as "HH:mm"
    const formatTime = (dateString) => {
        const options = { hour: "2-digit", minute: "2-digit", hour12: false };
        return new Date(dateString).toLocaleTimeString("en-US", options);
    };

    return (
        <div className="relative flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
            {/* Header */}
            <header className="flex items-center justify-between p-4 top-0 bg-[#111714]/80">
                <button className="text-white" onClick={() => router.back()}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-white text-lg font-bold">Order History</h1>
                <div className="w-8"></div>
            </header>

            {/* Order Items */}
            <main className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
                {loading ? (
                    <p className="text-center text-gray-500 dark:text-[#9eb7a8]">Loading...</p>
                ) : Object.keys(ordersByDate).length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-[#9eb7a8]">
                        No orders found.
                    </p>
                ) : (
                    Object.entries(ordersByDate).map(([date, orders]) => (
                        <div key={date} className="space-y-3">
                            {/* Date Heading */}
                            <h2 className="text-lg font-bold text-gray-700 dark:text-white mb-2">
                                {formatDate(date)}
                            </h2>
                            <div className="space-y-4">
                                {orders.map((order) => {
                                    const item = order.food;
                                    const qty = order.qty;
                                    const total = parseFloat(order.food_total);

                                    return (
                                        <div
                                            key={order.id}
                                            className="flex items-center gap-4 rounded-xl p-4 bg-gray-100 dark:bg-[#1c2620]"
                                        >
                                            {/* Image */}
                                            <div
                                                className="w-24 h-24 bg-center bg-cover rounded-lg flex-shrink-0"
                                                style={{ backgroundImage: `url('${item.item_picture}')` }}
                                            ></div>

                                            {/* Info */}
                                            <div className="flex flex-col flex-1 justify-between">
                                                <div>
                                                    <p className="text-gray-900 dark:text-white font-bold text-lg">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-[#9eb7a8]">
                                                        Qty: {qty} | Category: {item.category?.name || "-"}
                                                    </p>
                                                </div>
                                                <div className="flex justify-between items-center mt-2">
                                                    <p className="text-gray-900 dark:text-white font-bold">
                                                        ₹{total.toFixed(2)}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-[#9eb7a8]">
                                                        {formatTime(order.request_datetime)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))
                )}
            </main>
        </div>
    );
}
