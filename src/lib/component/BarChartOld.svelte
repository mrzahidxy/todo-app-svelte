<script lang="ts">
  import { onMount } from 'svelte';
  import { Chart, type ChartConfiguration } from 'chart.js/auto';

  let canvas: HTMLCanvasElement;
  let chart: Chart | undefined;   // <- explicit type

  const cfg: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [{
        label: 'Demo',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } }
    }
  };

  onMount(() => {
    chart = new Chart(canvas, cfg);
    return () => chart?.destroy();
  });
</script>

<canvas bind:this={canvas} width="400" height="200"></canvas>