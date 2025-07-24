<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import {
		createGrid,
		ModuleRegistry,
		AllCommunityModule,
		type GridOptions
	} from 'ag-grid-community';

	// // Import AG Grid styles
	// import 'ag-grid-community/styles/ag-grid.css';
	// import 'ag-grid-community/styles/ag-theme-alpine.css';

	// Register all community modules (sorting, pagination, filtering, etc.)
	ModuleRegistry.registerModules([AllCommunityModule]);

	let gridDiv: HTMLDivElement;

	const salesData = [
		{
			day: '月曜日',
			visits: 0,
			sales: 0,
			commission: 0,
			customers: 0,
			points: 0,
			unitPrice: 0,
			orders: 0,
			avgOrder: 0
		},
		{
			day: '火曜日',
			visits: 5,
			sales: 289630,
			commission: 23170,
			customers: 847,
			points: 198,
			unitPrice: 1463,
			orders: 312,
			avgOrder: 928
		},
		{
			day: '水曜日',
			visits: 5,
			sales: 301482,
			commission: 24118,
			customers: 892,
			points: 205,
			unitPrice: 1471,
			orders: 325,
			avgOrder: 928
		},
		{
			day: '木曜日',
			visits: 5,
			sales: 368981,
			commission: 29519,
			customers: 1089,
			points: 248,
			unitPrice: 1488,
			orders: 398,
			avgOrder: 927
		},
		{
			day: '金曜日',
			visits: 4,
			sales: 502130,
			commission: 40170,
			customers: 1421,
			points: 295,
			unitPrice: 1702,
			orders: 542,
			avgOrder: 927
		},
		{
			day: '土曜日',
			visits: 4,
			sales: 412037,
			commission: 33163,
			customers: 1165,
			points: 268,
			unitPrice: 1537,
			orders: 445,
			avgOrder: 926
		},
		{
			day: '日曜日',
			visits: 4,
			sales: 387685,
			commission: 31215,
			customers: 1095,
			points: 254,
			unitPrice: 1526,
			orders: 419,
			avgOrder: 925
		}
	];

	const gridOptions: GridOptions = {
		columnDefs: [
			{
				headerName: '曜日',
				
				field: 'day',
				width: 100,
				cellStyle: { fontWeight: 'bold' },
				type: 'rightAligned'
			},
			{
				headerName: '回数',
				field: 'visits',
				width: 80,
				cellStyle: { textAlign: 'center' }
			},
			{
				headerName: '純売上',
				field: 'sales',
				width: 120,
				valueFormatter: (params) => `¥${params.value.toLocaleString()}`
			},
			{
				headerName: '値引',
				field: 'commission',
				width: 100,
				valueFormatter: (params) => `¥${params.value.toLocaleString()}`
			},
			{
				headerName: '販売点数',
				field: 'customers',
				width: 100,
				cellStyle: { textAlign: 'center' }
			},
			{
				headerName: '組数',
				field: 'points',
				width: 80,
				cellStyle: { textAlign: 'center' }
			},
			{
				headerName: '組単価',
				field: 'unitPrice',
				width: 100,
				valueFormatter: (params) => `¥${params.value.toLocaleString()}`
			},
			{
				headerName: '客数',
				field: 'orders',
				width: 80,
				cellStyle: { textAlign: 'center' }
			},
			{
				headerName: '客単価',
				field: 'avgOrder',
				width: 100,
				valueFormatter: (params) => `¥${params.value.toLocaleString()}`,
			}
		],
		rowData: salesData,
		defaultColDef: {
			flex: 1,
			minWidth: 100,
			sortable: true,
			resizable: true,
			cellStyle: { textAlign: 'right' }
		},

		paginationPageSize: 5,
		domLayout: 'autoHeight',
		headerHeight: 40,
		rowHeight: 40
	};

	onMount(() => {
		createGrid(gridDiv, gridOptions);
	});
</script>

<!-- AG Grid Table -->
<div class="table-container">
	<div bind:this={gridDiv} class="ag-theme-alpine grid-container"></div>
</div>

<style>
	.table-container {
		background: white;
		border-radius: 4px;
		overflow: hidden;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		padding: 10px;
	}

	.grid-container {
		width: 100%;
		height: auto;
	}

	:global(.ag-theme-alpine) {
		--ag-header-background-color: #f8f9fa;
		--ag-header-foreground-color: #333;
		--ag-border-color: #e9ecef;
		--ag-row-hover-color: #f8f9fa;
	}

	:global(.ag-theme-alpine .ag-header-cell) {
		font-weight: 600;
		font-size: 12px;
	}

	:global(.ag-theme-alpine .ag-cell) {
		font-size: 12px;
	}

	:global(.ag-theme-alpine .ag-row) {
		border-bottom: 1px solid #e9ecef;
	}
</style>
