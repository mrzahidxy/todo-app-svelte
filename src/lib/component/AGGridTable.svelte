<!-- src/lib/component/AGGridTable.svelte -->
<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { ModuleRegistry, AllCommunityModule, createGrid } from 'ag-grid-community';
	import type { GridApi, GridOptions } from 'ag-grid-community';

	ModuleRegistry.registerModules([AllCommunityModule]);

	interface Props {
		data?: any[];
		columns?: any[];
		loading?: boolean;
	}

	let { data = [], columns = [], loading = false }: Props = $props();

	let gridDiv: HTMLDivElement;
	let gridApi: GridApi | undefined;

	const gridOptions: GridOptions = {
		defaultColDef: { flex: 1, minWidth: 100 },
		domLayout: 'autoHeight',
		animateRows: true,
		suppressRowClickSelection: true,
		onGridReady: (p) => p.api.sizeColumnsToFit(),
		onFirstDataRendered: (p) => p.api.sizeColumnsToFit()
	};

	onMount(() => {
		if (gridDiv && columns.length) {
			gridApi = createGrid(gridDiv, {
				...gridOptions,
				columnDefs: columns,
				rowData: data
			});
		}
	});

	$effect(() => {
		if (gridApi) gridApi.setGridOption('rowData', data);
	});

	$effect(() => {
		if (gridApi) gridApi.setGridOption('columnDefs', columns);
	});

	$effect(() => {
		if (gridApi) {
			loading ? gridApi.showLoadingOverlay() : gridApi.hideOverlay();
		}
	});

	onDestroy(() => gridApi?.destroy());
</script>

<div class="table-container" class:loading>
	{#if loading}
		<div class="loading-overlay">
			<div class="loading-spinner">
				<div class="spinner"></div>
				<span>Loading data...</span>
			</div>
		</div>
	{/if}

	<div bind:this={gridDiv} class="ag-theme-alpine grid-container"></div>

	{#if !loading && data.length === 0}
		<div class="empty-state">
			<div class="empty-icon">
				<svg class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
				</svg>
			</div>
			<h3 class="text-lg font-medium text-gray-900">No data found</h3>
			<p class="text-gray-500">Try adjusting your search or filter criteria.</p>
		</div>
	{/if}
</div>

<!-- original <style> unchanged -->
<style>
	.table-container {
		position: relative;
		background: white;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		border: 1px solid #e5e7eb;
		min-height: 200px;
	}
	.table-container.loading { pointer-events: none; }

	.loading-overlay {
		position: absolute;
		inset: 0;
		background: rgba(255, 255, 255, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}
	.loading-spinner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
	}
	.spinner {
		width: 24px;
		height: 24px;
		border: 2px solid #e5e7eb;
		border-top: 2px solid #3b82f6;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}
	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 48px 24px;
		text-align: center;
	}
	.empty-icon { margin-bottom: 16px; }

	.grid-container {
		width: 100%;
		height: auto;
		min-height: 200px;
	}

	:global(.ag-theme-alpine) {
		--ag-header-background-color: #f9fafb;
		--ag-header-foreground-color: #374151;
		--ag-border-color: #e5e7eb;
		--ag-row-hover-color: #f3f4f6;
		--ag-selected-row-background-color: #dbeafe;
		--ag-font-size: 13px;
		--ag-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		--ag-row-border-color: #f3f4f6;
	}

	:global(.ag-theme-alpine .ag-header-cell) {
		font-weight: 600;
		font-size: 12px;
		color: #374151;
		border-right: 1px solid #e5e7eb;
		padding: 0 12px;
		background-color: #f9fafb;
	}
	:global(.ag-theme-alpine .ag-row) {
		border-bottom: 1px solid #f3f4f6;
		font-size: 13px;
		transition: background-color 0.15s ease;
	}
	:global(.ag-theme-alpine .ag-row:nth-child(even)) { background-color: #fafafa; }
	:global(.ag-theme-alpine .ag-row:hover) { background-color: #f3f4f6; }
	:global(.ag-theme-alpine .ag-cell) {
		font-size: 13px;
		padding: 8px 12px;
		border-right: 1px solid #f3f4f6;
		display: flex;
		align-items: center;
		line-height: 1.4;
	}
</style>