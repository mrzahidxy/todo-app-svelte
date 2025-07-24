<script lang="ts">
	import CustomBarchart from '$lib/component/CustomBarchart.svelte';
	import CustomLineChart from '$lib/component/CustomLineChart.svelte';
	import CustomPieChart from '$lib/component/CustomPieChart.svelte';
	import { onMount } from 'svelte';

	type Data = {
		labels: string[];
		lineData: number[];
		barData: number[];
		pieData: number[];
	};

	let config = $state<Data | null>(null);


	async function loadChart() {
		try {
			const res = await fetch('/api/fake-chart');
				config = await res.json();

		} catch (error) {
			console.warn('API not available, using sample data:', error);
		}
	}

	onMount(loadChart);

	$inspect('config', config);
</script>

<div class="dashboard">
	<div class="dashboard-header">
		<h1>Dashboard Charts</h1>
		<button class="reload-btn" onclick={loadChart}> 🔄 Reload Charts </button>
	</div>

	{#if config}
		<div class="charts-grid">
			<!-- Combined Bar and Line Chart (like Image 1) -->
			<div class="chart-item full-width">
				<CustomBarchart
					title="売上と構成比"
					chartLables={config.labels}
					chartData={config.barData}
					dataLabel="Demo"
					onReload={loadChart}
				/>
			
			</div>

			<!-- Line Chart (like Image 2) -->
			<div class="chart-item">
				<CustomLineChart
					title="時系列データ"
					chartLables={Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))}
					chartData={config.lineData}
					dataLabel="Demo"
					onReload={loadChart}
				/>
			</div>

			<!-- Pie Chart (like Image 3) -->
			<div class="chart-item">
				<CustomPieChart
					title="構成比"
					chartLables={config.labels}
					chartData={config.pieData}
					dataLabel="Demo"
					onReload={loadChart}
				/>
			</div>
		</div>
	{:else}
		<div class="loading">
			<p>Loading charts…</p>
		</div>
	{/if}
</div>

<style>
	.dashboard {
		padding: 20px;
		background-color: #f5f5f5;
		min-height: 100vh;
		font-family: 'Arial', sans-serif;
	}

	.dashboard-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;
		padding: 0 10px;
	}

	.dashboard-header h1 {
		color: #333;
		font-size: 28px;
		font-weight: 600;
		margin: 0;
	}

	.reload-btn {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		padding: 12px 24px;
		border-radius: 8px;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
	}

	.reload-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
	}

	.reload-btn:active {
		transform: translateY(0);
	}

	.charts-grid {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 20px;
		grid-template-rows: auto auto;
	}

	.chart-item {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
		overflow: hidden;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.chart-item:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
	}

	.full-width {
		grid-column: 1 / -1;
	}

	.placeholder-card {
		padding: 40px;
		text-align: center;
		color: #666;
		background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
	}

	.placeholder-card h3 {
		margin: 0 0 10px 0;
		color: #333;
		font-size: 18px;
	}

	.placeholder-card p {
		margin: 0;
		font-style: italic;
	}

	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 200px;
		font-size: 18px;
		color: #666;
	}

	@media (max-width: 1024px) {
		.charts-grid {
			grid-template-columns: 1fr;
		}

		.full-width {
			grid-column: 1;
		}
	}
</style>
