<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		todo,
		toogleTask,
		children
	}: {
		todo: { id: number; title: string; completed: boolean };
		toogleTask: (id: number) => void;
		children?: Snippet;
	} = $props();
</script>

<div class="flex gap-2">
	<input
		type="checkbox"
		name=""
		id=""
		bind:checked={todo.completed}
		onclick={() => toogleTask(todo.id)}
	/>
	<li>{todo.title}</li>


	{#if children}
	{@render children()}
	{/if}
</div>
