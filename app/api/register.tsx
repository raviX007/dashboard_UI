import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    console.log("Inside Post(register)");
    const { email, password ,isAdmin} = req.body;

    const response = await fetch(`http://localhost:3000/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password,isAdmin }),
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(response.status).json(data);
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}