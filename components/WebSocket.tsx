import { useCallback, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import axios from "axios";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const WebSocket = () => {
  const [input, setInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const socketInitializer = useCallback(async () => {
    await axios.post("/api/socket");
    socket = io();

    socket.on("connection", () => {
      console.log("client connected!");
    });
    setIsConnected(true);

    socket.on("update-input", (msg) => {
      setInput(msg);
    });
  }, []);

  useEffect(() => {
    socketInitializer();
  }, [socketInitializer]);

  const onChangeHandler = (e: any) => {
    setInput(e.target.value);
    socket.emit("input-change", e.target.value);
  };

  return (
    <>
      <h2>Out of the box works with WebSockets</h2>
      <p>Open multiple instances to see the content of input field sync up.</p>
      {isConnected ? (
        <p style={{ color: "green" }}>ur connected</p>
      ) : (
        <p style={{ color: "red" }}>ur not connected</p>
      )}
      <input
        placeholder="type something"
        value={input}
        onChange={onChangeHandler}
      />
    </>
  );
};

export default WebSocket;
