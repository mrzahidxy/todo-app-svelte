<script lang="ts">
	import TodoList from '$lib/component/TodoList.svelte';
	import { alert } from '$lib/stores/store';


	let todos = $state<Ttodo[]>([
		{ id: 1, title: 'Todo 1', completed: false },
		{ id: 2, title: 'Todo 2', completed: false },
		{ id: 3, title: 'Todo 3', completed: false }
	]);

	let text = $state<string>('');

	function toogleTask(id: number) {
		const todo = todos.find((todo) => todo.id === id);
		if (todo) todo.completed = !todo.completed;
		alert.set('Task ' + todo?.title + ' is ' + (todo?.completed ? 'completed' : 'not completed'));
	}

	function addTodo() {
		todos.push({ id: Date.now(), title: text, completed: false });
        todos = todos;
		text = '';
		alert.set('Task ' + text + ' is added');
	}
</script>

<div class="bg-green-100 p-4">{$alert}</div>

<div class="flex flex-col items-center p-4">
	<label for="">
		<input
			type="text"
			name=""
			id=""
			class="border border-gray-400 p-2"
			bind:value={text}
		/>
        <button class="bg-gray-400 p-2" onclick={addTodo}>Add</button>
	</label>

	<TodoList {todos} {toogleTask} />
</div>
