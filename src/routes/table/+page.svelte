<script lang="ts">
	import DataTable from '$lib/component/DataTable.svelte';

	// Define the type for the column configuration
	type ColumnConfig = {
		key: string;
		label: string;
		sortable?: boolean;
		align?: 'left' | 'right' | 'center';
		format?: (value: any) => string;
		tooltip?: string;
	};

	// Define the columns configuration with explicit types
	const columns: ColumnConfig[] = [
		{ key: 'product', label: '商品名', tooltip: 'Product name' },
		{
			key: 'revenue',
			label: '純売上',
			sortable: true,
			align: 'right',
			format: (v: number) => `¥${v.toLocaleString()}`,
			tooltip: 'Total revenue from sales'
		},
		{
			key: 'composition',
			label: '構成比',
			align: 'right',
			format: (v: number) => `${v}%`,
			tooltip: 'Composition percentage'
		},
		{
			key: 'quantity',
			label: '販売点数',
			sortable: true,
			align: 'right',
			tooltip: 'Number of items sold'
		}
	];

	// Sample data for the table
	const data = [
		{ product: 'アルコール', revenue: 700100, composition: 30.9, quantity: 980 },
		{ product: '定食', revenue: 650200, composition: 28.7, quantity: 808 },
		{ product: '一品物', revenue: 411400, composition: 18.2, quantity: 433 },
		{ product: 'ソフトドリンク', revenue: 202600, composition: 8.9, quantity: 651 },
		{ product: 'おつまみ', revenue: 141600, composition: 6.3, quantity: 297 },
		{ product: 'ご飯', revenue: 67700, composition: 3.0, quantity: 297 },
		{ product: 'スープ', revenue: 24900, composition: 1.1, quantity: 125 },
		{ product: 'ご飯もの', revenue: 92800, composition: 4.1, quantity: 104 },
		{ product: 'デザート', revenue: 18100, composition: 0.8, quantity: 45 }
	];

	// Footer data for the table
	const footer = {
		product: '合計',
		revenue: 2264300,
		composition: '100%',
		quantity: 6393
	};
</script>

<div class="p-10">
	<DataTable {columns} {data} {footer} />
</div>
