import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

const statuses = ['all', 'completed', 'incomplete'] as const;
const payments = ['all', 'paid', 'unpaid'] as const;
type Payment = typeof payments[number];
type Status = typeof statuses[number];

const sales = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  item: `Product ${i + 1}`,
  amount: Math.floor(Math.random() * 1000),
  date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
  status: statuses[Math.floor(Math.random() * statuses.length)] as Status,
  payment: payments[Math.floor(Math.random() * payments.length)] as Payment
}));


export const GET: RequestHandler = ({ url }) => {
  const q = url.searchParams.get('q')?.toLowerCase() ?? '';
  const statusFilter = url.searchParams.get('status') ?? 'all';
  const paymentFilter = url.searchParams.get('payment') ?? '';
  const page = parseInt(url.searchParams.get('page') ?? '1', 10);
  const limit = parseInt(url.searchParams.get('limit') ?? '10', 10);

  let filtered = sales;

  if (q) {
    filtered = filtered.filter(s => s.item.toLowerCase().includes(q));
  }

  if (statusFilter !== 'all' && statuses.includes(statusFilter as Status)) {
    filtered = filtered.filter(s => s.status === statusFilter);
  }

  if(payments.includes(paymentFilter as Payment)) {
    filtered = filtered.filter(s => s.payment === paymentFilter);
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);

  return json({ page, limit, total, items });
};
