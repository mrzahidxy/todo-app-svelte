<script lang="ts">
	interface Tab {
		id: string;
		label: string;
		count?: number;
	}

	interface Props {
		tabs: Tab[];
		activeTab: string;
		onTabChange: (tabId: string) => void;
		disabled?: boolean;
	}

	let {tabs, onTabChange, activeTab, disabled = false}: Props = $props();
</script>

<div class="border-b border-gray-200">
	<nav class="-mb-px flex space-x-8">
		{#each tabs as tab}
			<button
				onclick={() => !disabled && onTabChange(tab.id)}
				class="border-b-2 px-1 py-2 text-sm font-medium whitespace-nowrap {activeTab === tab.id
					? 'border-blue-500 text-blue-600'
					: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} {disabled
					? 'cursor-not-allowed opacity-50'
					: ''}"
				{disabled}
			>
				{tab.label}
				<!-- {#if tab.count > 0}
					<span class="ml-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-900">
						{tab.count}
					</span>
				{/if} -->
			</button>
		{/each}
	</nav>
</div>
