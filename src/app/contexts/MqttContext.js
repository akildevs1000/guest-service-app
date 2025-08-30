// context/MqttContext.js
import { createContext, useContext } from "react";
import { useMqtt } from "../lib/mqttClient";

const MqttContext = createContext(null);

export function MqttProvider({ children }) {
  const mqtt = useMqtt();
  return <MqttContext.Provider value={mqtt}>{children}</MqttContext.Provider>;
}

export function useMqttContext() {
  return useContext(MqttContext);
}
