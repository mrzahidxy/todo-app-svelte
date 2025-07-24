<script lang="ts">
	import { onMount } from 'svelte';
	import BarChart from '$lib/component/BarChart.svelte';
	import LineChart from '$lib/component/LineChart.svelte';
	import Piechart from '$lib/component/Piechart.svelte';

	type Data = {
		labels: string[];
		lineData: number[];
		barData: number[];
		pieData: number[];
	};

	let config = $state<Data | null>(null);

	async function loadChart() {
		const res = await fetch('/api/fake-chart');
		config = await res.json();
	}

	onMount(loadChart); // first load
</script>

<div class="p-10">
	<button class="mb-4 rounded bg-blue-600 px-4 py-2 text-white" onclick={loadChart}>
		🔄 Reload
	</button>

	{#if config}
		<div class="flex gap-4">
			<div class="flex-1">
				<LineChart
					title="Line Chart"
					chartLables={[...config.labels]}
					chartData={[...config.lineData]}
					dataLabel="Demo"
					onReload={loadChart}
				/>
			</div>

			<div class="flex-1">
				<BarChart
					title="Bar Chart"
					chartLables={config.labels}
					chartData={config.barData}
					dataLabel="Demo"
					onReload={loadChart}
				/>
			</div>

			<div>
				<Piechart
					title="Pie Chart"
					chartLables={config.labels}
					chartData={config.pieData}
					dataLabel="Demo"
					onReload={loadChart}
				/>
			</div>
		</div>
	{:else}
		<p>Loading charts…</p>
	{/if}
</div>
