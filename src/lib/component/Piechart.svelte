<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	let { title, chartLables, chartData, dataLabel, onReload } = $props();

	let canvas: HTMLCanvasElement | null = $state(null);
	let chart: Chart | null = null;

	onMount(() => {
		if (!canvas) return;

		chart = new Chart(canvas, {
			type: 'pie',
			options: {
				plugins: {
					legend: { display: true, position: 'right' }
				}
			},
			data: {
				labels: [],
				datasets: [
					{
						label: '',
						data: [],
						backgroundColor: [] // will be overwritten
					}
				]
			}
		});
	});

	$effect(() => {
		if (!chart) return;
		chart.data = {
			labels: chartLables,
			datasets: $state.snapshot([
				{
					label: dataLabel,
					data: chartData,
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(255, 159, 64, 0.2)'
					],
					fill: true
				}
			])
		};

		chart.update();
	});
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		width: 100%;
		height: 320px;
	}
</style>
