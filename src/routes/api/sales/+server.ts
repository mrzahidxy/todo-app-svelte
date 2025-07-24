// src/routes/api/sales/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

const statuses = ['all', 'completed', 'incomplete'] as const;
const payments = ['all', 'paid', 'unpaid'] as const;
type Payment = typeof payments[number];
type Status = typeof statuses[number];

// Generate random sales data
const generateSalesData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    item: `Product ${i + 1}`,
    amount: Math.floor(Math.random() * 10000) + 100, // 100-10000
    date: new Date(Date.now() - Math.floor(Math.random() * 365) * 86400000).toISOString().split('T')[0],
    status: statuses[Math.floor(Math.random() * statuses.length)] as Status,
    payment: payments[Math.floor(Math.random() * payments.length)] as Payment
  }));
};

// Generate a larger dataset for pagination demo
const salesData = generateSalesData(500); // 500 items for better pagination demo

export const GET: RequestHandler = async ({ url }) => {
  // Simulate network delay
  const delay = Math.floor(Math.random() * 1000) + 500; // 500-1500ms delay
  await new Promise(resolve => setTimeout(resolve, delay));

  try {
    const q = url.searchParams.get('q')?.toLowerCase() ?? '';
    const statusFilter = url.searchParams.get('status') ?? 'all';
    const paymentFilter = url.searchParams.get('payment') ?? 'all';
    const page = parseInt(url.searchParams.get('page') ?? '1', 10);
    const limit = parseInt(url.searchParams.get('limit') ?? '10', 10);

    // Validate pagination parameters
    const validPage = isNaN(page) || page < 1 ? 1 : page;
    const validLimit = isNaN(limit) || limit < 1 ? 10 : Math.min(limit, 100); // Max 100 items per page

    let filtered = [...salesData];

    // Apply search filter
    if (q) {
      filtered = filtered.filter(s => 
        s.item.toLowerCase().includes(q) ||
        s.id.toString().includes(q)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all' && statuses.includes(statusFilter as Status)) {
      filtered = filtered.filter(s => s.status === statusFilter);
    }

    // Apply payment filter
    if (paymentFilter !== 'all' && payments.includes(paymentFilter as Payment)) {
      filtered = filtered.filter(s => s.payment === paymentFilter);
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / validLimit);
    const start = (validPage - 1) * validLimit;
    const items = filtered.slice(start, start + validLimit);

    // Add some random data variations for demo purposes
    const itemsWithVariations = items.map(item => ({
      ...item,
      amount: item.amount + Math.floor(Math.random() * 1000) - 500, // Add some variation
      date: new Date(new Date(item.date).getTime() - Math.floor(Math.random() * 30) * 86400000).toISOString().split('T')[0]
    }));

    return json({
      page: validPage,
      limit: validLimit,
      total,
      totalPages,
      items: itemsWithVariations
    });
  } catch (error) {
    console.error('Sales API error:', error);
    return json(
      { 
        error: 'Failed to fetch sales data', 
        page: 1, 
        limit: 10, 
        total: 0, 
        totalPages: 0, 
        items: [] 
      }, 
      { status: 500 }
    );
  }
};