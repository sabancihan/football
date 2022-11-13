import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from "@/lib/mongoose"
import { searchPlayer, updatePlayer } from 'lib/api/player';
import { getSession } from 'next-auth/react';
import { getMdxSource } from 'lib/api/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await mongoose
  if (req.method === 'GET') {
    try {
      const result = await searchPlayer(req.query.query as string);
      return res.status(200).json(result);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: e.toString()
      });
    }
  } else if (req.method === 'PUT') {
    const { username, bio } = req.body;
    const session = await getSession({ req });
    if (!session || session.user.username !== username) {
      return res.status(401).json({
        error: 'Unauthorized'
      });
    }
    try {
      const result = await updatePlayer(username, bio);
      if (result) {
        await res.revalidate(`/${username}`);
      }
      const bioMdx = await getMdxSource(bio); // return bioMdx to optimistically show updated state
      return res.status(200).json(bioMdx);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: e.toString()
      });
    }
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
