import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../sales-data/$types';


export const GET: RequestHandler = async () => {
  // fake 200 ms latency
  await new Promise(r => setTimeout(r, 200));

  // return exactly the shape your page expects
  return json({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    lineData: Array.from({ length: 5 }, () => Math.floor(Math.random() * 30)),
    barData:  Array.from({ length: 5 }, () => Math.floor(Math.random() * 30)),
    pieData:  Array.from({ length: 5 }, () => Math.floor(Math.random() * 30))
  });
};