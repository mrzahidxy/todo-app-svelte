// src/routes/api/sales-data-7d/+server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// (You would normally import these types from your shared lib)
interface ApiChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
    fill: boolean;
    borderDash?: number[];
  }>;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

export const GET: RequestHandler = () => {
  const salesData7d: ApiResponse<ApiChartData> = {
    success: true,
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Sales',
          data: [12500, 15200, 18700, 22100, 19800, 25300, 21600],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Target',
          data: [20000, 20000, 20000, 20000, 20000, 20000, 20000],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.1)',
          borderDash: [5, 5],
          tension: 0,
          fill: false
        }
      ]
    },
    timestamp: '2025-07-22T10:30:00Z'
  };

  return json(salesData7d);
};
