import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { Server } from "socket.io";

const handler = nc();
handler.use((req: NextApiRequest, res: NextApiResponse | any) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket initializing...");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("input-change", (msg) => {
        socket.broadcast.emit("update-input", msg);
      });
    });
  }
  res.end();
});

export default handler;