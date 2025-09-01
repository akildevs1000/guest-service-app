import mqtt from "mqtt";

import { useEffect, useState } from "react";

const MQTT_URL = "wss://mqtt.xtremeguard.org:8084";

function topicMatches(pattern, topic) {
    if (pattern === topic) return true;
    const p = pattern.split("/");
    const t = topic.split("/");
    for (let i = 0; i < p.length; i++) {
        const pp = p[i];
        const tt = t[i];
        if (pp === "#") return true;
        if (pp === "+") continue;
        if (tt === undefined || pp !== tt) return false;
    }
    return p.length === t.length;
}

function useMqtt() {
    const [client, setClient] = useState(null);

    useEffect(() => {
        const c = mqtt.connect(MQTT_URL, {
            clean: true,
            reconnectPeriod: 2000,
            connectTimeout: 10000,
        });
        setClient(c);
        return () => c.end();
    }, []);

    const pub = (topic, payload, options) => {
        if (!client) return;
        let data = payload;
        if (typeof payload !== "string") {
            try {
                data = JSON.stringify(payload);
            } catch {
                data = String(payload);
            }
        }
        client.publish(topic, data, options || {});
    };

    const sub = (topic, handler) => {
        if (!client) return () => { };
        const onMessage = (actualTopic, buf) => {
            if (typeof actualTopic !== "string") return;
            if (!topicMatches(topic, actualTopic)) return;
            let parsed = null;
            const text = buf ? buf.toString() : "";
            try {
                parsed = JSON.parse(text);
            } catch {
                parsed = text;
            }
            handler(parsed, actualTopic);
        };
        client.on("message", onMessage);
        client.subscribe(topic, (err) => {
            if (err) console.error("MQTT subscribe error:", err, "topic=", topic);
        });
        return () => {
            try {
                client.removeListener("message", onMessage);
            } catch { }
            try {
                client.unsubscribe(topic);
            } catch { }
        };
    };

    return { pub, sub, client };
}

export default useMqtt;