"use client";
import { createContext, useContext, useState } from "react";

const InfoContext = createContext();

export function InfoProvider({ children }) {
    const [info, setInfo] = useState({
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
    });

    return (
        <InfoContext.Provider value={{ info, setInfo }}>
            {children}
        </InfoContext.Provider>
    );
}

export function useInfo() {
    return useContext(InfoContext);
}
