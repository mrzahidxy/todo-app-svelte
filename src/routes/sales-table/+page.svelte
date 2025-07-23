<script lang="ts">
	import DataTable from '$lib/component/DataTable.svelte';
	import Input from '$lib/component/Input.svelte';
	import Select from '$lib/component/Select.svelte';
	import TabFilter from '$lib/component/TabFilter.svelte';
	import { onMount } from 'svelte';

	interface TSales {
		id: number;
		item: string;
		amount: number;
		date: string;
	}

	interface ApiResponse {
		page: number;
		limit: number;
		total: number;
		items: TSales[];
	}

	let tabs: { id: string; label: string; count?: number }[] = [
		{ id: 'all', label: 'All', count: 0 },
		{ id: 'completed', label: 'Completed', count: 0 },
		{ id: 'incomplete', label: 'Incomplete', count: 0 }
	];

	let payments: { value: string; label: string }[] = [
		{ value: 'paid', label: 'Paid' },
		{ value: 'unpaid', label: 'Unpaid' }
	];

	let columns: { key: string; label: string; align?: 'left' | 'right' | 'center' }[] = [
		{ key: 'item', label: 'Item' },
		{ key: 'amount', label: 'Amount' },
		{ key: 'date', label: 'Date' },
		{ key: 'status', label: 'Status' },
		{ key: 'payment', label: 'Payment' }
	];

	let data = $state<TSales[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);
	let query = $state('');
	let payment = $state('');
	let page = $state(1);
	let activeTab = $state<string>('all');

	async function getData() {
		try {
			const params = new URLSearchParams({
				page: page.toString(),
				status: activeTab,
				limit: '10',
				payment: payment
			});

			if (query) {
				params.set('q', query);
			}
			const res = await fetch(`/api/sales?${params}`);

			let payload: ApiResponse = await res.json();

			data = payload?.items;
		} catch {
			error = 'Something went wrong';
		} finally {
			loading = false;
		}
	}
	onMount(() => getData());

	const nextPage = () => {
		page++;
		getData();
	};

	const prevPage = () => {
		page--;
		getData();
	};

    const onTabChange = (tabId: string) => {
        activeTab = tabId;
        page = 1;
        getData();
    }
</script>

<div class="space-y-4 p-10">
	<h1 class="text-2xl">Sales</h1>

	<div class="grid grid-cols-4 gap-4">
		<div class="">
			<Input type="text" name="" bind:value={query} />
		</div>

		<div>
			<Select bind:value={payment} options={payments} />
		</div>
		<button onclick={getData} class="w-24 mb-4 cursor-pointer rounded bg-blue-600 px-4 py-2 text-white"
			>Search</button
		>
	</div>

	{#if loading}
		<p>Loading...</p>
	{:else if error}
		<p>{error}</p>
	{:else}
		<TabFilter {tabs} {activeTab} {onTabChange} />
		<DataTable {data} {columns} />
		<div>
			<button type="button" onclick={prevPage} disabled={page === 1} class="mr-2 bg-gray-200 px-2"
				>Previous</button
			>
			<button type="button" onclick={nextPage} class="bg-gray-200 px-2">Next</button>
		</div>
	{/if}
</div>
