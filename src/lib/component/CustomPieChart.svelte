<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	let { title, chartLables, chartData, dataLabel, onReload } = $props();

	let canvas: HTMLCanvasElement | null = $state(null);
	let chart: Chart | null = null;

	// Generate vibrant colors similar to the image
	const generateColors = (count: number) => {
		const colors = [
			'rgba(72, 187, 199, 0.8)',   // Teal
			'rgba(255, 99, 132, 0.8)',   // Pink/Red
			'rgba(75, 192, 75, 0.8)',    // Green
			'rgba(153, 102, 255, 0.8)',  // Purple
			'rgba(255, 159, 64, 0.8)',   // Orange
			'rgba(54, 162, 235, 0.8)',   // Blue
			'rgba(255, 206, 86, 0.8)',   // Yellow
			'rgba(231, 233, 237, 0.8)',  // Light Gray
			'rgba(255, 99, 255, 0.8)',   // Magenta
			'rgba(99, 255, 132, 0.8)',   // Light Green
			'rgba(132, 99, 255, 0.8)',   // Light Purple
			'rgba(255, 132, 99, 0.8)',   // Light Orange
			'rgba(99, 132, 255, 0.8)',   // Light Blue
			'rgba(255, 255, 99, 0.8)',   // Light Yellow
			'rgba(199, 199, 199, 0.8)',  // Gray
		];
		
		// If we need more colors than predefined, generate them
		const result = [];
		for (let i = 0; i < count; i++) {
			if (i < colors.length) {
				result.push(colors[i]);
			} else {
				// Generate additional colors using HSL
				const hue = (i * 137.508) % 360; // Golden angle approximation
				result.push(`hsla(${hue}, 70%, 50%, 0.8)`);
			}
		}
		return result;
	};

	onMount(() => {
		if (canvas) {
			chart = new Chart(canvas, {
				type: 'pie',
				data:  {
				labels: [],
				datasets: [
					{
						label: '',
						data: [],
						backgroundColor: [] // will be overwritten
					}
				]
			},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						legend: {
							display: false // Hide default legend, we'll create a custom one if needed
						},
						tooltip: {
							backgroundColor: 'rgba(0, 0, 0, 0.8)',
							titleColor: '#fff',
							bodyColor: '#fff',
							borderColor: 'rgba(255, 255, 255, 0.1)',
							borderWidth: 1,
							cornerRadius: 6,
							displayColors: true,
							callbacks: {
								label: function(context) {
									const label = context.label || '';
									const value = context.parsed;
									const total = context.dataset.data.reduce((a, b) => a + b, 0);
									const percentage = ((value / total) * 100).toFixed(1);
									return `${label}: ${percentage}%`;
								}
							}
						}
					},
					elements: {
						arc: {
							borderWidth: 2,
							borderColor: '#fff'
						}
					}
				}
			});
		}
	});

	$effect(() => {
		if (!chart) return;

				// Create snapshots to avoid Svelte state issues with Chart.js
		const dataSnapshot = $state.snapshot(chartData);
		const labelsSnapshot = $state.snapshot(chartLables);

		const colors = generateColors(chartData.length);

		chart.data = {
			labels: [...labelsSnapshot],
			datasets: [
				{
					label: dataLabel,
					data: [...dataSnapshot],
					backgroundColor: colors,
					borderColor: colors.map(color => color.replace('0.8', '1')),
					borderWidth: 2,
					hoverBorderWidth: 3,
					hoverBorderColor: '#fff'
				}
			]
		};

		chart.update();
	});
</script>

<div class="chart-container">
	<h3 class="chart-title">{title}</h3>
	<div class="pie-chart-wrapper">
		<canvas bind:this={canvas}></canvas>
	</div>
</div>

<style>
	.chart-container {
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		padding: 16px;
		margin-bottom: 20px;
		max-width: 400px;
	}

	.chart-title {
		font-size: 16px;
		font-weight: 600;
		color: #333;
		margin: 0 0 16px 0;
		text-align: center;
	}

	.pie-chart-wrapper {
		position: relative;
		width: 100%;
		height: 320px;
	}

	canvas {
		width: 100% !important;
		height: 100% !important;
	}
</style>