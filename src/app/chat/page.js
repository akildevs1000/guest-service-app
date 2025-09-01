// Chat.js
"use client"
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "../lib/api";
import useMqtt from "../lib/mqtt";
import getSecondsInTimezone from "../helpers/getSecondsInTimezone";
import { useInfo } from "../contexts/InfoContext"

export default function Chat() {

    const router = useRouter();

    const { info } = useInfo();
    const [messages, setMessages] = useState([]);
    const [chatInfo, setChatInfo] = useState({
        hotelId: 0,
        bookingId: 0,
        bookingRoomId: 0,
        roomId: 0,
        roomNumber: "000",
        customer: {},
        title: "Mr",
        full_name: "New User",
        guestName: "Mr.New User"
    });

    const [me, setMe] = useState("");
    const [msgTopic, setMsgTopic] = useState("");
    const [typingTopic, setTypingTopic] = useState("");
    const [ackTopic, setAckTopic] = useState("");

    useEffect(() => {
        if (info) {
            const customer = info?.customer || {};
            const title = customer.title || "Mr";
            const full_name = customer.full_name || "New User";

            setChatInfo({
                hotelId: info.company_id || 0,
                bookingId: info.booking_id || 0,
                bookingRoomId: info.record_id || 0,
                roomId: info.room_id || 0,
                roomNumber: info.room_no || "000",
                customer,
                title,
                full_name,
                guestName: title + "." + full_name
            });


            setMe(`${info.room_no}:${title + "." + full_name}`);
            setMsgTopic(`chat/hotel/${info.company_id}/room/${String(info.record_id)}/message`);
            setTypingTopic(`chat/hotel/${info.company_id}/room/${String(info.record_id)}/typing`);
            setAckTopic(`chat/hotel/${info.company_id}/room/${String(info.record_id)}/ack`);

            async function loadHistory() {
                try {
                    const q = `?company_id=${info.company_id}&role=guest&booking_room_id=${info.record_id}&limit=50`;
                    const rows = await api.get(`/chat_messages_history${q}`);
                    setMessages(
                        (rows.data || []).sort((a, b) => (a.tsDb || 0) - (b.tsDb || 0))
                    );
                    setTimeout(scrollToEnd, 100);
                } catch { }
            }
            loadHistory();
        }
    }, [info]);

    // Removed duplicate useState declarations below (was causing redeclaration errors)
    const [draft, setDraft] = useState("");
    const [typingSet, setTypingSet] = useState(new Set());
    const [previewImageUrl, setPreviewImageUrl] = useState(null);
    const [dialogPreviewImage, setDialogPreviewImage] = useState(false);
    const [previewImageId, setPreviewImageId] = useState(null);
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [chunks, setChunks] = useState([]);
    const [seconds, setSeconds] = useState(0);
    const [startTs, setStartTs] = useState(null);
    const [timezone] = useState("Asia/Kolkata");
    const [typingTimers, setTypingTimers] = useState({});
    const [tmr, setTmr] = useState(null);

    const { pub, sub } = useMqtt();
    const listRef = useRef();
    const fileInputRef = useRef();
    const messageInputRef = useRef();
    const messagesEndRef = useRef(null);


    // MQTT subscriptions
    useEffect(() => {

        // Message subscription
        const unsubMsg = sub(msgTopic, (m) => {
            if (!m) return;
            upsertMessage(m);
            if (m.role === "reception") {
                setTimeout(() => {
                    scrollToEnd();
                    ack(m.id);
                }, 0);
            } else {
                setTimeout(scrollToEnd, 0);
            }
        });

        // Typing subscription
        const unsubTyping = sub(typingTopic, (t) => {
            const timerKey = `typing:${t?.user || ""}`;
            clearTimeout(typingTimers[timerKey]);
            if (t && t.typing) {
                setTypingSet((prev) => new Set(prev).add(t.user));
                const timer = setTimeout(() => {
                    setTypingSet((prev) => {
                        const newSet = new Set(prev);
                        newSet.delete(t.user);
                        return newSet;
                    });
                }, 3000);
                setTypingTimers((prev) => ({ ...prev, [timerKey]: timer }));
            } else {
                setTypingSet((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(t && t.user);
                    return newSet;
                });
            }
        });

        // ACK subscription
        const unsubAck = sub(ackTopic, (ackMsg) => {
            const { lastSeenId } = ackMsg || {};
            if (!lastSeenId) return;
            setMessages((msgs) =>
                msgs.map((x) =>
                    x.id === lastSeenId && x.role === "guest" && !x.seen
                        ? { ...x, seen: true }
                        : x
                )
            );
        });

        return () => {
            unsubMsg && unsubMsg();
            unsubTyping && unsubTyping();
            unsubAck && unsubAck();
            Object.values(typingTimers).forEach((t) => clearTimeout(t));
        };
        // eslint-disable-next-line
    }, [msgTopic, typingTopic, ackTopic, sub]);

    // This useEffect will now scroll to the new ref
    useEffect(() => {
        // Check if the ref exists before trying to scroll
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    // Scroll to bottom whenever messages change
    useEffect(() => {
        scrollToEnd();
    }, [messages]);

    function upsertMessage(msg) {
        setMessages((msgs) => {
            const i = msgs.findIndex((x) => x.id === msg.id);
            let newMsgs;
            if (i === -1) newMsgs = [...msgs, msg];
            else {
                newMsgs = [...msgs];
                newMsgs[i] = { ...msgs[i], ...msg };
            }
            newMsgs.sort((a, b) => (a.tsDb || 0) - (b.tsDb || 0));
            return newMsgs;
        });
    }

    function scrollToEnd() {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }

    function time(ts) {
        const date = new Date(ts);
        const now = new Date();
        const isToday =
            date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear();
        if (isToday) {
            return date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });
        } else {
            return (
                date.toLocaleDateString([], {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                }) +
                " " +
                date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })
            );
        }
    }

    function handleFileSelect(e) {
        const file = e.target.files[0] || null;
        if (file) {
            sendFile(file);
        }
    }

    async function sendTyping() {
        pub(typingTopic, {
            user: me,
            typing: true,
            ts: getSecondsInTimezone(timezone),
            tsDb: Date.now(),
        });
        setTimeout(() => {
            pub(typingTopic, {
                user: me,
                typing: false,
                ts: getSecondsInTimezone(timezone),
                tsDb: Date.now(),
            });
        }, 1200);
    }

    async function send() {
        const text = draft.trim();
        if (!text) return;
        let m = {
            id: Date.now() + "_" + chatInfo.bookingRoomId,
            sender: me,
            tsString: new Date().toLocaleString("en-US", {
                timeZone: timezone,
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            }),
            role: "guest",
            type: "text",
            text,
            ts: getSecondsInTimezone(timezone),
            tsDb: Date.now(),
            booking_id: chatInfo.bookingId,
            booking_room_id: chatInfo.bookingRoomId,
            room_id: chatInfo.roomId,
            room_number: chatInfo.roomNumber,
            company_id: chatInfo.hotelId,
        };
        pub(msgTopic, m);
        upsertMessage(m);
        setDraft("");
        setTimeout(scrollToEnd, 0);
        ack(m.id);
        await sendTyping();
        setTimeout(scrollToEnd, 0);
        try {
            await api.post(`/chat_messages`, m);
        } catch { }
    }

    async function sendFile(file) {
        if (!file) return;
        try {
            const form = new FormData();
            form.append("file", file);
            form.append("sender", me);
            form.append("role", "guest");
            form.append("type", "file");
            form.append("ts", Date.now());
            form.append("booking_id", chatInfo.bookingId);
            form.append("booking_room_id", chatInfo.bookingRoomId);
            form.append("room_id", chatInfo.roomId);
            form.append("room_number", chatInfo.roomNumber);
            form.append("company_id", chatInfo.hotelId);
            const res = await api.post("/chat_messages_upload_file", form);
            const url = res && res.data.message.url;
            if (url === "null") {
                alert("File Upload Failed");
                return false;
            }
            const m = {
                id: Date.now() + "_" + chatInfo.bookingRoomId,
                sender: me,
                role: "guest",
                type: "file",
                url: url,
                filename: "image",
                ts: getSecondsInTimezone(timezone),
                tsString: new Date().toLocaleString("en-US", {
                    timeZone: timezone,
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                tsDb: Date.now(),
                booking_id: chatInfo.bookingId,
                booking_room_id: chatInfo.bookingRoomId,
                room_id: chatInfo.roomId,
                room_number: chatInfo.roomNumber,
                company_id: chatInfo.hotelId,
            };
            pub(msgTopic, m);
            upsertMessage(m);
            setTimeout(scrollToEnd, 0);
            ack(m.id);
            await sendTyping();
            setTimeout(scrollToEnd, 0);
        } catch (err) {
            alert("Upload failed");
        } finally {
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    }

    function viewImage(messageId, url) {
        setPreviewImageId(messageId);
        setPreviewImageUrl(url);
        setDialogPreviewImage(true);
    }

    function ack(id) {
        pub(ackTopic, {
            user: me,
            lastSeenId: id,
            ts: getSecondsInTimezone(timezone),
            tsDb: Date.now(),
        });
    }

    // Audio recording
    async function startRec() {
        try {
            const candidates = [
                "audio/webm;codecs=opus",
                "audio/webm",
                "audio/mp4",
            ];
            let mimeType = "";
            for (const c of candidates) {
                if (window.MediaRecorder.isTypeSupported(c)) {
                    mimeType = c;
                    break;
                }
            }
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mr = new window.MediaRecorder(stream, mimeType ? { mimeType } : {});
            setMediaRecorder(mr);
            setChunks([]);
            mr.ondataavailable = (e) => e.data.size && setChunks((prev) => [...prev, e.data]);
            mr.start();
            setRecording(true);
            setStartTs(Date.now());
            setSeconds(0);
            const interval = setInterval(() => {
                setSeconds(Math.round((Date.now() - startTs) / 1000));
            }, 200);
            setTmr(interval);
            mr.onstop = async () => {
                clearInterval(interval);
                if (mr.stream) {
                    mr.stream.getTracks().forEach((track) => track.stop());
                }
                setRecording(false);
                const blob = new Blob(chunks, {
                    type: mr.mimeType || "audio/webm",
                });
                // ... rest of your send logic
            };
        } catch (err) {
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                alert("Permission to access the microphone was denied. Please allow microphone access in your browser settings.");
            } else if (err.name === 'SecurityError') {
                alert("Microphone access is only allowed on a secure connection (HTTPS).");
            } else {
                alert(`An error occurred while trying to access the microphone: ${err.message}`);
            }
            console.error(err);
            setRecording(false);
        }
    }

    function stopRec() {
        if (mediaRecorder) {
            mediaRecorder.stop();
        }
    }

    function fileExt(mime) {
        if (
            mime.includes("mp4") ||
            mime.includes("x-m4a") ||
            mime.includes("aac")
        )
            return "m4a";
        if (mime.includes("webm")) return "webm";
        if (mime.includes("ogg")) return "ogg";
        return "dat";
    }

    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
            <header className="flex items-center justify-between p-4 sticky top-0 z-10 bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
                <div className="mx-auto max-w-screen-sm w-full flex justify-between items-center">
                    <button className="text-gray-700 dark:text-gray-200" onClick={() => router.push("/")}>
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">Chat Room : {chatInfo.roomNumber}</h1>
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
                                <p className="text-xs text-gray-500 dark:text-gray-400">{time(msg.ts)}</p>
                            </div>
                            <div
                                className={`mt-1 max-w-xs p-3 rounded-lg ${msg.role === "guest"
                                    ? "text-black rounded-tr-none"
                                    : "bg-gray-900 text-white rounded-tl-none"
                                    }`}
                            >
                                {msg.type === "text" && <p className="text-white">{msg.text}</p>}

                                {msg.type === "file" && (
                                    <div style={{ textAlign: "center" }}>
                                        <img
                                            src={msg.url}
                                            alt="file"
                                            onClick={() => viewImage(msg.id, msg.url)}
                                            style={{
                                                margin: "auto",
                                                width: 100,
                                                borderRadius: 10,
                                                textAlign: "right",
                                            }}
                                        />
                                    </div>
                                )}
                                {/* {msg.type === "audio" && (
                                    <audio
                                        style={{ height: 28 }}
                                        src={msg.url}
                                        controls
                                        controlsList="nodownload"
                                        preload="none"
                                    ></audio>
                                )} */}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </main>

            <div className="wa-chat max-w-xl mx-auto mt-5">
                {/* Image Preview Dialog */}
                {dialogPreviewImage && (
                    <div
                        style={{
                            position: "fixed",
                            zIndex: 1000,
                            left: 0,
                            top: 0,
                            width: "100vw",
                            height: "100vh",
                            background: "rgba(0,0,0,0.5)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onClick={() => setDialogPreviewImage(false)}
                    >
                        <div
                            style={{
                                background: "#fff",
                                borderRadius: 10,
                                padding: 20,
                                maxWidth: 400,
                                width: "100%",
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>Image</span>
                                <button onClick={() => setDialogPreviewImage(false)}>✕</button>
                            </div>
                            <img
                                src={previewImageUrl}
                                alt="Preview"
                                style={{ width: "100%", borderRadius: 10, marginTop: 10 }}
                            />
                        </div>
                    </div>
                )}
                {/* Messages */}

                <footer className="bg-white/90 backdrop-blur-sm p-4 sticky bottom-0 dark:bg-gray-950/90">
                    <div className="flex items-center gap-2 relative">
                        <input
                            className="flex-1 bg-gray-100 border-none rounded-full h-12 pr-20 pl-5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[var(--color-primary)] dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 focus:outline-none"
                            placeholder="Type a message..."
                            type="text"

                            ref={messageInputRef}
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    send();
                                }
                            }}
                            onInput={sendTyping}
                        />

                        {/* Camera & Mic buttons */}
                        <div className="absolute right-14 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            <input
                                style={{ display: "none" }}
                                accept="image/*"
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                            />
                            <button onClick={() => fileInputRef.current && fileInputRef.current.click()} className="rounded-full w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                                <span className="material-symbols-outlined text-base">photo_camera</span>
                            </button>

                            {!recording ? (

                                <button onClick={startRec} disabled={recording} className="rounded-full w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                                    <span className="material-symbols-outlined text-base">mic</span>
                                </button>

                            ) : (
                                <button onClick={stopRec} disabled={!recording} className="rounded-full w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                                    <span className="material-symbols-outlined text-base">mic</span>
                                    {/* <span>{recording && seconds + "s"}</span> */}
                                </button>
                            )}


                        </div>

                        {/* Send button */}
                        <button
                            className="bg-[var(--color-primary)] rounded-full w-12 h-12 flex items-center justify-center text-black hover:bg-opacity-80 transition-colors flex-shrink-0"
                            onClick={send}
                        >
                            <span className="material-symbols-outlined">send</span>
                        </button>
                    </div>

                </footer>
            </div>
        </div>

    );
}