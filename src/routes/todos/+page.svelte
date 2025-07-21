<script lang="ts">
	import Card from '$lib/component/Card.svelte';
	import TodoItem from '$lib/component/TodoItem.svelte';

	let todos = $state([
		{ id: 1, title: 'Todo 1', completed: false },
		{ id: 2, title: 'Todo 2', completed: false },
		{ id: 3, title: 'Todo 3', completed: false }
	]);

	let showCompleted = $state(false);

	let filtersTodo = $derived(showCompleted ? todos.filter((todo) => todo.completed) : todos);

	function toogleTask(id: number) {
		const todo = todos.find((todo) => todo.id === id);
		if (todo) todo.completed = !todo.completed;
	}
</script>

<Card>
	{#snippet header()}
		<h1>Todo List</h1>
	{/snippet}

	{#snippet children()}
		<label>
			<input type="checkbox" name="" id="" bind:checked={showCompleted} /> Completed
		</label>
		<ul class="flex flex-col items-start gap-2">
			{#each filtersTodo as todo}
				<TodoItem {todo} {toogleTask} />
			{/each}
		</ul>
	{/snippet}
</Card>
