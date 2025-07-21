<script lang="ts">
	import type { Snippet } from 'svelte';

	let { header, children }: { header?: Snippet; children: Snippet } = $props();
</script>

<div class="flex flex-col items-center gap-4 p-4">
	{#if header}
		<div class="mb-4 font-bold text-2xl">{@render header()}</div>
	{/if}

	{#if children}
		<div class="flex flex-col gap-4 bg-gray-100 p-4">{@render children()}</div>
	{/if}
</div>
