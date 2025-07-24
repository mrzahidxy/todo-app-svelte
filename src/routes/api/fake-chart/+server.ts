// src/routes/api/sales-data/+server.ts

import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

type Data = {
  labels: string[];
  barData: number[];
  lineData: number[];
  pieData: number[];
};

// fixed labels (languages)
const labels = [
  '日本語', '韓国語', 'ヒンディー語', '英語', 'ベトナム語', 'タイ語',
  '中国語', '南京官話', 'ビルマ語', 'ラオス語', 'カンボジア語',
  'マレー語', 'インドネシア語', 'タガログ語', 'シンハラ語',
  'テルグ語', 'タミル語', 'ウルドゥー語',
   '日本語', '韓国語', 'ヒンディー語', '英語', 'ベトナム語', 'タイ語',
  '中国語', '南京官話', 'ビルマ語', 'ラオス語', 'カンボジア語',
  'マレー語', 'インドネシア語', 'タガログ語', 'シンハラ語',
  'テルグ語', 'タミル語', 'ウルドゥー語',
   '日本語', '韓国語', 'ヒンディー語', '英語', 'ベトナム語', 'タイ語',
  '中国語', '南京官話', 'ビルマ語', 'ラオス語', 'カンボジア語',
  'マレー語', 'インドネシア語', 'タガログ語', 'シンハラ語',
  'テルグ語', 'タミル語', 'ウルドゥー語'
];

// helper to generate an array of random numbers
const randArr = (count: number, max: number) =>
  Array.from({ length: count }, () => Math.floor(Math.random() * max));

export const GET: RequestHandler = async (event) => {
  await new Promise(r => setTimeout(r, 200)); // simulate latency

  // disable caching entirely
  event.setHeaders({
    'Cache-Control': 'no-store, no-cache, must-revalidate'
  });

  const data: Data = {
    labels,
    barData: randArr(labels.length, 250000),
    lineData: randArr(labels.length, 250000),
    pieData: randArr(labels.length, 30)
  };

  return json(data);
};
