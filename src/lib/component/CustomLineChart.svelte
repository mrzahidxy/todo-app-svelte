<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	let { title, chartLables, chartData, dataLabel, onReload } = $props();

	let canvas: HTMLCanvasElement | null = $state(null);
	let chart: Chart | null = null;

	onMount(() => {
		if (canvas) {
			chart = new Chart(canvas, {
				type: 'line',
				data:  {
				labels: [],
				datasets: [
					{
						label: '',
						data: []
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
							displayColors: true,
							callbacks: {
								label: function(context) {
									return '¥' + context.parsed.y.toLocaleString();
								}
							}
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
								color: '#666'
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
								callback: function(value) {
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
						line: {
							tension: 0.4, // Smooth curves
							borderWidth: 2
						},
						point: {
							radius: 0, // Hide points by default
							hoverRadius: 6,
							hitRadius: 10
						}
					},
					interaction: {
						intersect: false,
						mode: 'index'
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

		chart.data = {
			labels: [...labelsSnapshot],
			datasets: [
				{
					label: '純売上(合計)',
					data: [...dataSnapshot],
					borderColor: 'rgba(72, 187, 199, 1)',
					backgroundColor: 'rgba(72, 187, 199, 0.1)',
					fill: true,
					tension: 0.4,
					borderWidth: 2,
					pointBackgroundColor: 'rgba(72, 187, 199, 1)',
					pointBorderColor: '#fff',
					pointBorderWidth: 2,
					pointRadius: 0,
					pointHoverRadius: 6
				}
			]
		};

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