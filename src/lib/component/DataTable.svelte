<script lang="ts">
	let { columns, data, footer } = $props<{
		columns: Array<{ key: string; label: string; sortable?: boolean }>;
		data: Record<string, any>[];
		footer?: any;
	}>();

	let sortKey = $state<string>('');
	let sortAsc = $state<boolean>(true);

	function sortBy(key: string) {
		if (sortKey === key) {
			sortAsc = !sortAsc; // Toggle sort direction
		} else {
			sortKey = key; // Set new sort key
			sortAsc = true; // Default to ascending
		}
	}

	// Derived state using $derived instead of $effect
	let sortedData = $derived(sortData(data));

	function sortData(data: Record<string, any>[]): Record<string, any>[] {
		if (!sortKey) return data; // Return original data if no sort key
		return [...data].sort((a, b) => {
			const aVal = a[sortKey];
			const bVal = b[sortKey];

			// Handle null/undefined values
			if (aVal == null && bVal == null) return 0;
			if (aVal == null) return sortAsc ? 1 : -1;
			if (bVal == null) return sortAsc ? -1 : 1;

			// Type-aware comparison
			if (typeof aVal === 'number' && typeof bVal === 'number') {
				return sortAsc ? aVal - bVal : bVal - aVal;
			}

			// String comparison
			const aStr = String(aVal).toLowerCase();
			const bStr = String(bVal).toLowerCase();

			if (aStr < bStr) return sortAsc ? -1 : 1;
			if (aStr > bStr) return sortAsc ? 1 : -1;
			return 0;
		});
	}
</script>

<table class="w-full border-collapse text-sm">
	<thead>
		<tr class="bg-gray-100">
			{#each columns as col}
				<th
					class="relative cursor-pointer border px-3 py-2 text-left select-none {col.align ===
					'right'
						? 'text-right'
						: ''}"
					onclick={() => col.sortable && sortBy(col.key)}
				>
					<div class="flex items-center">
						<span>{col.label}</span>
						{#if col.tooltip}
							<button
								class="ml-2 cursor-pointer text-gray-500"
								onclick={(e) => {
									e.stopPropagation();
									const tooltip = (e.target as HTMLElement).nextElementSibling as HTMLElement;
									tooltip.classList.toggle('hidden');
								}}
							>
								?
							</button>
							<div
								class="absolute mt-2 hidden rounded border border-gray-300 bg-gray-200 p-2"
								style="transform: translateX(100%);"
							>
								{col.tooltip}
							</div>
						{/if}
					</div>
					{#if col.sortable}
						<span class="ml-1 text-gray-500">
							{sortKey === col.key ? (sortAsc ? '▲' : '▼') : '↕'}
						</span>
					{/if}
				</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each sortedData as row}
			<tr class="even:bg-gray-50">
				{#each columns as col}
					<td class="border px-3 py-1 {col.align === 'right' ? 'text-right' : ''}">
						{col.format ? col.format(row[col.key]) : row[col.key]}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>

	{#if footer}
		<tfoot>
			<tr class="bg-gray-200 font-bold">
				{#each columns as col}
					<td class="border px-3 py-2 {col.align === 'right' ? 'text-right' : ''}">
						{footer[col.key] ? (col.format ? col.format(footer[col.key]) : footer[col.key]) : ''}
					</td>
				{/each}
			</tr>
		</tfoot>
	{/if}
</table>

<style>
	th,
	td {
		white-space: nowrap;
	}

	/* Tooltip styles */
	.tooltip {
		opacity: 0;
		transition: opacity 0.3s;
	}

	.question-mark:hover + .tooltip {
		opacity: 1;
	}
</style>
