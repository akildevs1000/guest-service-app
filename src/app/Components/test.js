import { useMqttContext } from "../contexts/MqttContext";
import { useEffect } from "react";

export default function Home() {
    const mqtt = useMqttContext();

    useEffect(() => {

        let topic = `chat/hotel/3/room/2524/message`;

        const unsubscribe = mqtt.sub(topic, (msg, topic) => {
            console.log("Received:", msg, "from", topic);
        });


        mqtt.pub(topic, {
            "id": "1756566639769_2524",
            "sender": "307:Mr.New User",
            "tsString": "08/30/2025, 08:40 PM",
            "role": "guest",
            "type": "text",
            "text": "francis",
            "ts": 1756572039000,
            "tsDb": 1756566639773,
            "booking_id": "1974",
            "booking_room_id": "2524",
            "room_id": "100",
            "room_number": "307",
            "company_id": "3"
        });

        return () => unsubscribe();
    }, [mqtt]);

    return <div>MQTT Next.js Example</div>;
}
