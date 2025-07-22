<script>
	import BarChart from '$lib/component/BarChart.svelte';
	import LineChart from '$lib/component/LineChart.svelte';
	import Piechart from '$lib/component/Piechart.svelte';

	const chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
	const config = $state({
		lineData: [12, 19, 3, 5, 2],
		barData: [8, 15, 6, 10, 4],
		pieData: [5, 10, 15, 20, 25]
	});

	function reloadAll() {
		config.lineData = config.lineData.map(() => Math.floor(Math.random() * 30));
		config.barData = config.barData.map(() => Math.floor(Math.random() * 30));
		config.pieData = config.pieData.map(() => Math.floor(Math.random() * 30));
	}
</script>

<div class="p-10">
	<button class="mb-4 rounded bg-blue-600 px-4 py-2 text-white" onclick={reloadAll}>
		🔄 Reload
	</button>
	<div class="flex gap-4">
		<div class="flex-1">
			<LineChart
				title="Line Chart"
				chartLables={chartLabels}
				chartData={config.lineData}
				dataLabel="Demo"
				onReload={() => {}}
			/>
		</div>

		<div class="flex-1">
			<BarChart
				title="Bar Chart"
				chartLables={chartLabels}
				chartData={config.barData}
				dataLabel="Demo"
				onReload={() => {}}
			/>
		</div>

		<div>
			<Piechart
				title="Pie Chart"
				chartLables={chartLabels}
				chartData={config.pieData}
				dataLabel="Demo"
				onReload={() => {}}
			/>
		</div>
	</div>
</div>
