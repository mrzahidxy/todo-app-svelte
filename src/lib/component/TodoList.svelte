<script lang="ts">
	import Card from './Card.svelte';
	import TodoItem from './TodoItem.svelte';

	let { todos, toogleTask } = $props();

	let showCompleted = $state(false);

	let filtersTodo = $derived(showCompleted ? todos.filter((todo: Ttodo) => todo.completed) : todos);
</script>

<Card>
	<!-- {#snippet header()}
		<h1>Todo List</h1>
	{/snippet} -->

	{#snippet children()}
		<label>
			<input type="checkbox" name="" id="" bind:checked={showCompleted} /> Completed
		</label>
		<ul class="flex flex-col items-start gap-2">
			{#each filtersTodo as todo}
				<TodoItem {todo} {toogleTask}>
					{#snippet children()}
						<span class="bg-blue-100 p-1 text-xs"
							>{todo?.completed ? 'Completed' : 'Not Completed'}</span
						>
					{/snippet}
				</TodoItem>
			{/each}
		</ul>
	{/snippet}
</Card>
