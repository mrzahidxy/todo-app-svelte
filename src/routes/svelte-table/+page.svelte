<script lang="ts">
	import { Table } from '@flowbite-svelte-plugins/datatable';
	const paginationOptions: any = {
		paging: false,
		sortable: true
	};
</script>

<Table
	items={[
		{ id: 1, name: 'John', age: 30 },
		{ id: 2, name: 'Jane', age: 25 },
		{ id: 3, name: 'Bob', age: 40 },
		{ id: 4, name: 'Alice', age: 35 }
	]}
	dataTableOptions={{ paging: false, sortable: true, searchable: false }}
/>
