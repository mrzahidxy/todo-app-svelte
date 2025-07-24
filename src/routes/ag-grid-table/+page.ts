// src/routes/+page.ts
import type { PageLoad } from './$types';

export interface SalesItem {
    id: number;
    item: string;
    amount: number;
    date: string;
    status: string;
    payment: string;
}

export interface SalesResponse {
    items: SalesItem[];
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
}

export interface LoadData {
    sales: SalesItem[];
    totalPages: number;
    totalItems: number;
    currentPage: number;
    limit: number;
    status: string;
    payment: string;
    query: string;
    error?: string;
}

export const load: PageLoad = async ({ url, fetch }) => {
    // Extract and validate search parameters
    const searchParams = url.searchParams;
    
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, Math.max(10, parseInt(searchParams.get('limit') || '10')));
    const status = searchParams.get('status') || 'all';
    const payment = searchParams.get('payment') || 'all';
    const query = searchParams.get('q')?.trim() || '';

    // Build API parameters
    const apiParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        status,
        payment
    });

    if (query) {
        apiParams.set('q', query);
    }

    try {
        // Fetch data from API
        const response = await fetch(`/api/sales?${apiParams}`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data: SalesResponse = await response.json();

        return {
            sales: data.items || [],
            totalPages: data.totalPages || 1,
            totalItems: data.total || 0,
            currentPage: page,
            limit,
            status,
            payment,
            query
        } satisfies LoadData;

    } catch (error) {
        console.error('Failed to load sales data:', error);
        
        return {
            sales: [],
            totalPages: 1,
            totalItems: 0,
            currentPage: page,
            limit,
            status,
            payment,
            query,
            error: error instanceof Error ? error.message : 'Failed to fetch sales data'
        } satisfies LoadData;
    }
};



