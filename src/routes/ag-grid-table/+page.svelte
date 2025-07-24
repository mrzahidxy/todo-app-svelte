<!-- src/routes/+page.svelte (Svelte 5) -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import AgGridTable from '$lib/component/AGGridTable.svelte';
	import Input from '$lib/component/Input.svelte';
	import Select from '$lib/component/Select.svelte';
	import TabFilter from '$lib/component/TabFilter.svelte';
	import type { PageProps } from '../ag-grid-table/$types';
	import type { ColumnDef } from '$lib/types/agGrid';
	import { columns, limitOptions, paymentOptions, tabs } from '$lib/table';

	let { data }: PageProps = $props();

	// Local reactive form state
	let searchQuery = $state(data.query);
	let selectedPayment = $state(data.payment);
	let selectedLimit = $state(data.limit.toString());
	let isNavigating = $state(false);

	// Derived data
	let currentPage = $derived(data.currentPage);
	let totalPages = $derived(data.totalPages);
	let totalItems = $derived(data.totalItems);
	let activeTab = $derived(data.status);
	let salesData = $derived(data.sales);
	let error = $derived(data.error);

	function navigateWithParams(updates: Record<string, string | number | null>) {
		if (!browser) return;

		// Svelte 5: the current URL lives in $page.url
		const params = new URLSearchParams(page.url.searchParams);

		Object.entries(updates).forEach(([k, v]) => {
			const val = String(v).trim();
			if (
				!val ||
				val === '0' ||
				(k === 'page' && val === '1') ||
				(k === 'limit' && val === '10') ||
				(k === 'status' && val === 'all') ||
				(k === 'payment' && val === 'all')
			) {
				params.delete(k);
			} else {
				params.set(k, val);
			}
		});

		// Reset to page 1 on new search/filter
		if ('q' in updates || 'status' in updates || 'payment' in updates || 'limit' in updates) {
			params.delete('page');
		}

		isNavigating = true;
		goto(`?${params}`, { replaceState: false, noScroll: true, keepFocus: true });
	}


	// Handlers
	const handleSearch = () => navigateWithParams({ q: searchQuery.trim(), payment: selectedPayment });
	const handlePaymentChange = () => navigateWithParams({ payment: selectedPayment });
	const handleLimitChange = () => navigateWithParams({ limit: parseInt(selectedLimit) });
	const handleTabChange = (tabId: string) => navigateWithParams({ status: tabId });
	const handlePageChange = (p: number) => {
		if (p >= 1 && p <= totalPages && p !== currentPage) navigateWithParams({ page: p });
	};


	// Sync local state when URL changes
	$effect(() => {
		searchQuery = data.query;
		selectedPayment = data.payment;
		selectedLimit = data.limit.toString();
		isNavigating = false;
	});

</script>

<div class="min-h-screen bg-gray-50 p-6">
	<div class="mx-auto max-w-7xl space-y-6">
		<!-- Header -->
		<div class="flex items-center justify-between">
			<h1 class="text-3xl font-bold text-gray-900">Sales Dashboard</h1>
		</div>

		<!-- Filters -->
		<div class="rounded-lg bg-white p-6 shadow-sm">
			<div class="grid grid-cols-1 gap-4 md:grid-cols-5">
				<div class="md:col-span-2">
					<label for="search" class="mb-2 block text-sm font-medium text-gray-700"
						>Search Products</label
					>
					<Input
						type="text"
						name="search"
						bind:value={searchQuery}
						placeholder="Search products..."
						disabled={isNavigating}
					/>
				</div>

				<div>
					<label for="payment" class="mb-2 block text-sm font-medium text-gray-700"
						>Payment Status</label
					>
					<Select
						bind:value={selectedPayment}
						options={paymentOptions}
						disabled={isNavigating}
					/>
				</div>

				<div class="flex items-end">
					<button
						onclick={handleSearch}
						disabled={isNavigating}
						class="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
					>
						{isNavigating ? 'Searching...' : 'Search'}
					</button>
				</div>
			</div>
		</div>

		<!-- Content -->
		<div class="space-y-4">
			{#if error}
				<div class="rounded-md border border-red-300 bg-red-50 p-4">
					<div class="flex">
						<div class="flex-shrink-0">
							<svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<div class="ml-3">
							<h3 class="text-sm font-medium text-red-800">Error</h3>
							<p class="mt-1 text-sm text-red-700">{error}</p>
						</div>
					</div>
				</div>
			{:else}
				<TabFilter {tabs} {activeTab} onTabChange={handleTabChange} disabled={isNavigating} />

				{#if isNavigating}
					<div class="flex h-32 items-center justify-center rounded-lg bg-white shadow-sm">
						<div class="flex items-center space-x-3">
							<div
								class="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"
							>
							<span class="text-sm text-gray-600">Loading...</span>
							</div>
						</div>
					</div>
				{:else}
					<div class="rounded-lg bg-white shadow-sm">
						<AgGridTable data={salesData} {columns} />
					</div>
				{/if}
			{/if}
		</div>
	</div>
</div>
