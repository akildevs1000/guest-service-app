import mqtt from "mqtt";

/**
 * Simple wildcard matcher for MQTT topics
 * Supports + (single level) and # (multi-level)
 */
function topicMatches(pattern, topic) {
  if (pattern === topic) return true;
  const p = pattern.split("/");
  const t = topic.split("/");

  for (let i = 0; i < p.length; i++) {
    const pp = p[i];
    const tt = t[i];
    if (pp === "#") return true; // match the rest
    if (pp === "+") continue; // match this level
    if (tt === undefined || pp !== tt) return false;
  }
  return p.length === t.length;
}

let client;

export function initMqtt() {
  if (!client) {
    const url = "wss://mqtt.xtremeguard.org:8084";
    const opts = {
      clean: true,
      reconnectPeriod: 2000,
      connectTimeout: 10_000,
    };
    client = mqtt.connect(url, opts);
  }
  return client;
}

export function useMqtt() {
  const client = initMqtt();

  return {
    pub(topic, payload, options) {
      let data = payload;
      if (typeof payload !== "string") {
        try {
          data = JSON.stringify(payload);
        } catch {
          data = String(payload);
        }
      }
      client.publish(topic, data, options || {});
    },

    sub(topic, handler) {
      const onMessage = (actualTopic, buf) => {
        if (typeof actualTopic !== "string") return;
        if (!topicMatches(topic, actualTopic)) return;

        let parsed;
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

      // cleanup function
      return () => {
        try {
          client.removeListener("message", onMessage);
        } catch {}
        try {
          client.unsubscribe(topic);
        } catch {}
      };
    },

    raw: client,
  };
}
