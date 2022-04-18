import { FormEvent, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import axios from "axios";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const WebSocket = () => {
  const [input, setInput] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tasks, setTasks] = useState<{ title: string; body: string }[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const socketInitializer = async () => {
    await axios.post("/api/socket");
    socket = io();

    socket.on("connection", () => {
      console.log("client connected!");
    });
    setIsConnected(true);

    socket.on("update-input", (msg) => {
      setInput(msg);
    });

    socket.on("db-changes", (data) => {
      setTasks((prev) => {
        return [
          ...prev,
          { title: data.fullDocument.title, body: data.fullDocument.body },
        ];
      });
    });
  };

  useEffect(() => {
    socketInitializer();
  }, []);

  const onChangeHandler = (e: any) => {
    setInput(e.target.value);
    socket.emit("input-change", e.target.value);
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (title && body) await axios.post("/api/task", { title, body });
    setTitle("");
    setBody("");
  };

  return (
    <>
      <h2 className="text-xl font-bold">
        Out of the box works with WebSockets
      </h2>
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
      <form onSubmit={submitHandler}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
        />
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="body"
        />
        <button type="submit">send</button>
      </form>
      <ul>
        {tasks &&
          tasks.length > 0 &&
          tasks.map((task, idx) => (
            <li key={idx}>
              <span style={{ fontWeight: "bold" }}>{task.title}</span>;{" "}
              {task.body}
            </li>
          ))}
      </ul>
    </>
  );
};

export default WebSocket;
