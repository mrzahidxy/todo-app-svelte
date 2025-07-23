<script lang="ts">
	interface Option {
		value: string;
		label: string;
	}

	interface Props {
		value: string;
		options: Option[];
		onchange?: (value: string) => void;
		disabled?: boolean;
	}

	let { value = $bindable(), options, onchange, disabled = false }: Props = $props();

	function handleChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		value = target.value;
		onchange?.(value);
	}
</script>

<select
	bind:value
	onchange={handleChange}
	{disabled}
	class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
>
	{#each options as option}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>