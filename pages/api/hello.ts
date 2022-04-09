import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc();
handler.use((req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ name: "i am moh3a" });
});

export default handler;
