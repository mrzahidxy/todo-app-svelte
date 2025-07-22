<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	let { title, chartLables, chartData, dataLabel, onReload } = $props();

	let canvas: HTMLCanvasElement | null = $state(null);
	let chart: Chart | null = null;

	onMount(() => {
		if (!canvas) return;

		chart = new Chart(canvas, {
			type: 'line',
			data: {
				labels: [],
				datasets: [
					{
						label: '',
						data: []
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
					backgroundColor: 'rgba(75,192,192,0.4)',
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
