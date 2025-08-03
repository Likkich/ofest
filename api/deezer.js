import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { q = 'lofi', limit = 10 } = req.query;

  try {
    const response = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(q)}&limit=${limit}`);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Deezer API error' });
    }
    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*'); // разрешаем CORS
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
