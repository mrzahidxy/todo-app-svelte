<script lang="ts">
	interface Props {
		value: string;
		name?: string;
		type?: string;
		onSearch?: (value: string) => void;
		placeholder?: string;
		disabled?: boolean;
	}

	let { value = $bindable(), type = "text", onSearch, placeholder = "Search...", disabled = false }: Props = $props();

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		value = target.value;
		onSearch?.(value);
	}
</script>

<div class="relative w-full">
	<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
		<svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
		</svg>
	</div>
	<input
		{type}
		{value}
		oninput={handleInput}
		{placeholder}
		{disabled}
		class="block w-full rounded-md border-gray-300 pl-10 pr-3 py-2 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
	/>
</div>