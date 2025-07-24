<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	let { title, chartLables, chartData, dataLabel, onReload } = $props();

	let canvas: HTMLCanvasElement | null = $state(null);
	let chart: Chart | null = null;

	onMount(() => {
		if (canvas) {
			chart = new Chart(canvas, {
				type: 'bar',
				data: {
					labels: [],
					datasets: [
						{
							label: '',
							data: [],
							backgroundColor: 'rgba(75,192,192,0.4)'
						}
					]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						legend: {
							display: true,
							position: 'top',
							labels: {
								usePointStyle: true,
								boxWidth: 15,
								boxHeight: 15,
								padding: 20,
								font: {
									size: 12,
									family: 'Arial, sans-serif'
								}
							}
						},
						tooltip: {
							backgroundColor: 'rgba(0, 0, 0, 0.8)',
							titleColor: '#fff',
							bodyColor: '#fff',
							borderColor: 'rgba(255, 255, 255, 0.1)',
							borderWidth: 1,
							cornerRadius: 6,
							displayColors: true
						}
					},
					scales: {
						x: {
							grid: {
								display: true,
								color: 'rgba(200, 200, 200, 0.3)',
								lineWidth: 1
							},
							ticks: {
								font: {
									size: 10
								},
								color: '#666',
								maxRotation: 45,
								minRotation: 0
							},
							border: {
								display: true,
								color: '#ccc'
							}
						},
						y: {
							grid: {
								display: true,
								color: 'rgba(200, 200, 200, 0.3)',
								lineWidth: 1
							},
							ticks: {
								font: {
									size: 10
								},
								color: '#666',
								callback: function (value) {
									// Format large numbers (e.g., 250,000 -> ¥250,000)
									return '¥' + value.toLocaleString();
								}
							},
							border: {
								display: true,
								color: '#ccc'
							}
						}
					},
					elements: {
						bar: {
							borderRadius: {
								topLeft: 2,
								topRight: 2,
								bottomLeft: 0,
								bottomRight: 0
							},
							borderSkipped: false
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

		// Generate colors similar to the image - teal bars with red line
		const barColors = dataSnapshot.map(() => 'rgba(72, 187, 199, 0.8)'); // Teal color
		const lineData = dataSnapshot.map((_: number, index: number) => {
			// Create cumulative percentage line
			const total = dataSnapshot.reduce((sum: number, val: number) => sum + val, 0);
			const cumulative = dataSnapshot
				.slice(0, index + 1)
				.reduce((sum: number, val: number) => sum + val, 0);
			return (cumulative / total) * 100;
		});

		chart.data = {
			labels: [...labelsSnapshot],
			datasets: [
				{
					label: '純売上(合計)',
					data: [...dataSnapshot],
					backgroundColor: barColors,
					borderColor: 'rgba(72, 187, 199, 1)',
					borderWidth: 1,
					type: 'bar'
				},
				// {
				// 	label: '構成比(累計)',
				// 	data: [...dataSnapshot],
				// 	type: 'line',
				// 	borderColor: 'rgba(220, 53, 69, 1)',
				// 	backgroundColor: 'rgba(220, 53, 69, 0.1)',
				// 	borderWidth: 2,
				// 	fill: false,
				// 	tension: 0.4,
				// 	pointBackgroundColor: 'rgba(220, 53, 69, 1)',
				// 	pointBorderColor: '#fff',
				// 	pointBorderWidth: 2,
				// 	pointRadius: 4,
				// 	yAxisID: 'y1'
				// }
			]
		};

		// Add second y-axis for percentage
		if (chart.options.scales) {
			chart.options.scales.y1 = {
				type: 'linear',
				display: true,
				position: 'right',
				grid: {
					drawOnChartArea: false
				},
				ticks: {
					font: {
						size: 10
					},
					color: '#666',
					callback: function (value) {
						return value + '%';
					}
				},
				border: {
					display: true,
					color: '#ccc'
				}
			};
		}

		chart.update();
	});
</script>

<div class="chart-container">
	<h3 class="chart-title">{title}</h3>
	<canvas bind:this={canvas}></canvas>
</div>

<style>
	.chart-container {
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		padding: 16px;
		margin-bottom: 20px;
	}

	.chart-title {
		font-size: 16px;
		font-weight: 600;
		color: #333;
		margin: 0 0 16px 0;
		text-align: center;
	}

	canvas {
		width: 100% !important;
		height: 320px !important;
	}
</style>
