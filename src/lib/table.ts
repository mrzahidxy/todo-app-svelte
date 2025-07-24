import type { ColumnDef } from "$lib/types/agGrid";

export const columns: ColumnDef[] = [
	{
		headerName: 'ID',
		field: 'id',
		width: 80,
		cellStyle: { textAlign: 'center' },
		headerTooltip: 'Sales ID',
		headerComponentParams: {
			template: `
                    <div class="ag-header-cell-label custom-header">
                        <span class="ag-header-cell-text">純売上</span>
                        <span class="ml-1 text-[10px] bg-red-200 rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0">?</span>
                    </div>
                `
		}
	},
	{ headerName: '商品', field: 'item', width: 150, cellStyle: { fontWeight: 'bold' } },
	{
		headerName: '金額',
		field: 'amount',
		width: 120,
		cellStyle: { textAlign: 'right' },
		cellRenderer: (params) => `¥${params.value.toLocaleString()}`
	},
	{ headerName: '日付', field: 'date', width: 120 },
	{ headerName: 'ステータス', field: 'status', width: 120, cellStyle: { textAlign: 'center' } },
	{ headerName: '支払い', field: 'payment', width: 120, cellStyle: { textAlign: 'center' } }
];

export const tabs = [
	{ id: 'all', label: 'All' },
	{ id: 'completed', label: 'Completed' },
	{ id: 'incomplete', label: 'Incomplete' }
];

export const paymentOptions = [
	{ value: 'all', label: 'All Payments' },
	{ value: 'paid', label: 'Paid' },
	{ value: 'unpaid', label: 'Unpaid' }
];

export const limitOptions = [
	{ value: '10', label: '10 per page' },
	{ value: '20', label: '20 per page' },
	{ value: '50', label: '50 per page' },
	{ value: '100', label: '100 per page' }
];