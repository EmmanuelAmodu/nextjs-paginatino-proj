// pages/api/myEndpoint.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import data from '../../../db/data';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  if (method == 'GET') {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 1;
    const search = req.query.search as string;

    let dataFiltered = data;
    if (search) {
      dataFiltered = data.filter((item) => {
        let result = item.snippet.title.toLowerCase().includes(search.toLowerCase());
        if (!result) result = item.snippet.description.toLowerCase().includes(search.toLowerCase());
        return result;
      });
    }
  
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = dataFiltered.slice(startIndex, endIndex);
    res.status(200).json({ data: results, page, limit, pageCount: Math.ceil(dataFiltered.length / limit) });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
