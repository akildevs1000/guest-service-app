"use client";
import { createContext, useContext, useState, useEffect } from "react";

const InfoContext = createContext();

export function InfoProvider({ children }) {
    const [info, setInfo] = useState(() => {
        // Load from localStorage on initial render
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("info");
            return saved ? JSON.parse(saved) : {
                checkin_datetime_only_display: "loading...",
                checkout_datetime_only_display: "loading...",
                company_id: 0,
                room_id: 0,
                room_no: "loading...",
                room_type: "loading...",
                customer: {
                    "whatsapp": "loading...",
                    "email": "loading...",
                    "full_name": "loading...",
                    "full_address": "loading..."
                },
            };
        }
    });

    // Save to localStorage whenever info changes
    useEffect(() => {
        if (info) {
            localStorage.setItem("info", JSON.stringify(info));
        }
    }, [info]);

    return (
        <InfoContext.Provider value={{ info, setInfo }}>
            {children}
        </InfoContext.Provider>
    );
}

export function useInfo() {
    return useContext(InfoContext);
}
