import type { NextApiRequest, NextApiResponse } from 'next';
import data from '../../../db/data';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  if (method == 'GET') {
    const dataMap = data.find((item) => {
      let result = item.id.videoId === req.query.id;
      if (!result) result = item.etag === req.query.id;
      return result;
    });
  
    if (dataMap)
      res.status(200).json(data);
    else
      res.status(404).json({ message: "Not Found" });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
