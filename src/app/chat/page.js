"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import TestComp from "../Components/test";
import Loader from "../Components/Loader";
import api from "../lib/api";
import { useInfo } from "../contexts/InfoContext";
import { useMqttContext } from "../contexts/MqttContext";


export default function ChatPage() {

    const mqtt = useMqttContext();
    const [unsubscribe, setUnsubscribe] = useState(null);


    useEffect(() => {
        // Subscribe once when the component mounts
        let topic = `chat/hotel/3/room/2524/message`;

        console.log(topic);


        const unsub = mqtt.sub(topic, (msg, topic) => {
            console.log("Received:", msg, "from", topic);
        });

        setUnsubscribe(() => unsub); // store unsubscribe function

        // Cleanup on unmount
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [mqtt]);

    const router = useRouter();
    const { info } = useInfo();
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const chatEndRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await api.get("/chat_messages_history", {
                    params: {
                        company_id: info?.company_id || 3,
                        role: "guest",
                        booking_room_id: info?.booking_rooms_id || 2524,
                        limit: 50,
                    },
                });
                setMessages(data);
            } catch (err) {
                console.error("Error fetching chat messages:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [info]);

    const handleSend = async () => {
        if (!newMessage.trim()) return;

        // setMessages([
        //     ...messages,
        //     {
        //         id: Date.now(),
        //         role: "guest",
        //         sender: "You",
        //         text: newMessage,
        //         ts: new Date().toISOString(),
        //     },
        // ]);
        // setNewMessage("");

        let topic = `chat/hotel/3/room/2524/message`;

        // Current UTC timestamp (ms)
        const now = new Date();

        // Format the time in the target timezone
        const formatter = new Intl.DateTimeFormat("en-US", {
            timezone:"Asia/Kolkata",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        });

        // Extract date/time parts
        const parts = {};
        formatter.formatToParts(now).forEach(({ type, value }) => {
            parts[type] = value;
        });

        // Build a date string as if it's local time in that timezone
        const localTimeString = `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}`;

        let m = {
            "id": "1756568110450_2524",
            "sender": "307:Mr.New User",
            tsString: new Date().toLocaleString("en-US", {
                 timezone:"Asia/Kolkata",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            }),
            "role": "guest",
            "type": "text",
            "text": "text--" + Date.now(),
            "ts": Math.floor(new Date(localTimeString).getTime()),
            tsDb: Date.now(),
            "booking_id": "1974",
            "booking_room_id": "2524",
            "room_id": "100",
            "room_number": "307",
            "company_id": "3"
        }

        mqtt.pub(topic, m); // ✅ publish a plain object

        let r = await api.post(`/chat_messages`, m);

        console.log(r);
        
    };

    // Scroll to latest message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const formatTime = (ts) => {
        const date = new Date(ts);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    if (loading) return <Loader />;

    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
            {/* Header */}
            <header className="flex items-center justify-between p-4 sticky top-0 z-10 bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
                <div className="mx-auto max-w-screen-sm w-full flex justify-between items-center">
                    <button className="text-gray-700 dark:text-gray-200" onClick={() => router.push("/")}>
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">Chat</h1>
                    <div className="w-8"></div>
                </div>
            </header>

            {/* Messages */}
            <main className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex items-start gap-3 ${msg.role === "guest" ? "flex-row-reverse" : "flex-row"
                            }`}
                    >
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 h-10 flex-shrink-0"
                            style={{
                                backgroundImage:
                                    msg.role === "guest"
                                        ? `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhdoRUSFze8Q7P9AM68L62s9foMgMLPbS0jGt6kHUa0tbrjPVCBr1zt0XbDxjN6rBN9a-tmqNHFsZYFyAK93dixP_BBw9aNbXaZklu3a3l48d7dFrQC5b8LqgBbQPBesD1A2Oq7fa-P4xzlkkz7FHxV7m68ZOrfM5Q87Fs83yBwmcZJ_GH4jum-zJZ9wOdJWTNwOmaK1cijDyRXJ-7KxqRThG0oi7igjEBp7HJ8Ot7L1eW003M2Ew0tTSjZkNs9BR9tCTKq8SNtek")`
                                        : `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDaj17cJjANp9LMQXb0FUwyLIrIS78X2Om68CNR1UmwE0Y5BlExpBvOVvSpeEMbrUQCqlt3HMOFYqmsCNQpc-KAwunNZIf1LDJRDMPBM26D5Epg2UWoFYm3j4Y5Kgbd4OgR1SOa6wAHiL2Wzgp_Gdc4MVmHQkqefhHRtggJcoPPNMjLCCKx6-ryhNEaEx5Fuz_jjIJbpLHi2klCuFohqTqtqWVwVUVo8QMQoel7f5Glly_8y1rhNe9ok7Lt3Wmvi6QcdUwtQZNCXnU")`,
                            }}
                        ></div>
                        <div className={`flex flex-col ${msg.role === "guest" ? "items-end" : ""}`}>
                            <div className="flex items-baseline gap-2">
                                <p className="font-bold">{msg.role === "guest" ? "You" : "Reception"}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{formatTime(msg.ts)}</p>
                            </div>
                            <div
                                className={`mt-1 max-w-xs p-3 rounded-lg ${msg.role === "guest"
                                    ? "text-black rounded-tr-none"
                                    : "bg-gray-900 text-white rounded-tl-none"
                                    }`}
                            >
                                <p>{msg.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </main>

            {/* Input */}
            <footer className="bg-white/90 backdrop-blur-sm p-4 sticky bottom-0 dark:bg-gray-950/90">
                <div className="flex items-center gap-2 relative">
                    <input
                        className="flex-1 bg-gray-100 border-none rounded-full h-12 pr-20 pl-5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[var(--color-primary)] dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 focus:outline-none"
                        placeholder="Type a message..."
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />

                    {/* Camera & Mic buttons */}
                    <div className="absolute right-14 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <button className="rounded-full w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                            <span className="material-symbols-outlined text-base">photo_camera</span>
                        </button>
                        <button className="rounded-full w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                            <span className="material-symbols-outlined text-base">mic</span>
                        </button>
                    </div>

                    {/* Send button */}
                    <button
                        className="bg-[var(--color-primary)] rounded-full w-12 h-12 flex items-center justify-center text-black hover:bg-opacity-80 transition-colors flex-shrink-0"
                        onClick={handleSend}
                    >
                        <span className="material-symbols-outlined">send</span>
                    </button>
                </div>
            </footer>
        </div>
    );
}
