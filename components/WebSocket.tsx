import { Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

const WebSocket = ({
  socket,
  input,
  setInput,
}: {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
}) => {
  const onChangeHandler = (e: any) => {
    setInput(e.target.value);
    socket.emit("input-change", e.target.value);
  };

  return (
    <>
      <h2>Out of the box works with WebSockets</h2>
      <p>Open multiple instances to see the content of input field sync up.</p>
      <input
        placeholder="type something"
        value={input}
        onChange={onChangeHandler}
      />
    </>
  );
};

export default WebSocket;
