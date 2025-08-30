"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";
import api from "../lib/api";
import { useInfo } from "../contexts/InfoContext";

export default function ProceedOrderPage() {
    const router = useRouter();
    const { cart, clearCart } = useCart();
    const { info } = useInfo();

    const [loading, setLoading] = useState(false);

    const items = Object.values(cart);
    const total = items.reduce((sum, item) => sum + item.amount * item.qty, 0);


    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            let payload = {
                company_id: info?.company_id,
                room_id: info?.room_id,
                booking_id: info?.booking_id,
                room_number: info?.room_number,
                booking_rooms_id: info?.id,
                cart_items: items
            };

            let { data } = await api.post("/hotel_orders_add_food_items", payload);
            console.log("🚀 ~ handlePlaceOrder ~ data:", data)
            clearCart(); // 👈 empty cart after success
            router.push("/home");


        } catch (err) {
            console.error("Error fetching food items:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
            {/* Header */}
            <header className="flex items-center justify-between p-4 top-0 bg-[#111714]/80">
                <button className="text-white" onClick={() => router.back()}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-white text-lg font-bold">Proceed to Order</h1>
                <div className="w-8"></div>
            </header>

            {/* Cart Items */}
            <main className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
                {items.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-[#9eb7a8]">
                        Your cart is empty.
                    </p>
                ) : (
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between rounded-xl p-4 bg-gray-100 dark:bg-[#1c2620]"
                            >
                                {/* Item Info */}
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-20 h-20 bg-center bg-cover rounded-lg shrink-0"
                                        style={{ backgroundImage: `url('${item.item_picture}')` }}
                                    ></div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-900 dark:text-white font-bold">
                                            {item.name}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-[#9eb7a8]">
                                            Qty: {item.qty}
                                        </p>
                                        <p className="text-gray-900 dark:text-white font-bold">
                                            ${item.amount * item.qty}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Total + Place Order Button */}
            {items.length > 0 && (
                <div className="fixed bottom-0 left-0 w-full p-4 bg-white dark:bg-[#111714] border-t border-gray-200 dark:border-[#3d5245] z-50">
                    <div className="max-w-md mx-auto space-y-3">
                        <div className="flex items-center justify-between text-lg font-bold">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button
                            className="w-full text-[#111714] bg-primary relative flex items-center justify-center gap-2 font-bold py-3 px-4 rounded-full focus:outline-none border-0"
                            type="button"
                            onClick={() => handlePlaceOrder()}
                        >
                            <span className="material-symbols-outlined">done</span>
                            <span>Place Order</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
