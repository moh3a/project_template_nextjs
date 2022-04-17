import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { Server } from "socket.io";

import dbConnect from "../../lib/db";
import Task from "../../models/Task";

/**
 * web socket works
 * but multiple responses everytime page reloads
 * needs fix
 */

const handler = nc();
handler.use(async (req: NextApiRequest, res: NextApiResponse | any) => {
  await dbConnect();

  if (!res.socket.server.io) {
    console.log("Iinitializing web socket...");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.broadcast.emit("connected");
      socket.on("input-change", (msg) => {
        socket.broadcast.emit("update-input", msg);
      });
      Task.watch().on("change", (data) => {
        socket.broadcast.emit("db-changes", data);
      });
    });
  }
  res.end();
});

export default handler;
