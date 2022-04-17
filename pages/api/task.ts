import nc from "next-connect";
import type { NextApiResponse, NextApiRequest } from "next";

import dbConnect from "../../lib/db";
import Task from "../../models/Task";

const handler = nc();
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  const { body, title } = req.body;
  await Task.create({ body, title });
  res.status(201).json({ message: "Successfully created task" });
});

export default handler;
