<script lang="ts">
	import { Dialog } from 'bits-ui';
</script>

<!-- Trigger -->
<Dialog.Root>
	<Dialog.Trigger
		class="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none"
	>
		New API key
	</Dialog.Trigger>

	<Dialog.Portal>
		<!-- Backdrop -->
		<Dialog.Overlay class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />

		<!-- Modal -->
		<Dialog.Content
			class="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-slate-200 bg-white p-6 shadow-xl focus:outline-none"
		>
			<Dialog.Title class="text-center text-lg font-semibold text-slate-900">
				Create API key
			</Dialog.Title>

			<hr class="my-4 border-slate-200" />

			<Dialog.Description class="mb-5 text-sm text-slate-600">
				Create and manage API keys. You can create multiple keys to organize your applications.
			</Dialog.Description>

			<div class="mb-8">
				<label for="apiKey" class="mb-1 block text-sm font-medium text-slate-700"> API Key </label>
				<div class="relative">
					<input
						id="apiKey"
						type="text"
						placeholder="secret_api_key"
						class="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 pr-10 text-sm placeholder-slate-400 shadow-sm focus:border-slate-500 focus:ring-1 focus:ring-slate-500 focus:outline-none"
					/>
					<!-- <LockKeyOpen
            class="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          /> -->
				</div>
			</div>

			<div class="flex justify-end">
				<Dialog.Close
					class="inline-flex items-center rounded-md bg-slate-900 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none"
				>
					Save
				</Dialog.Close>
			</div>

			<Dialog.Close
				class="absolute top-3 right-3 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none"
			>
				X
				<!-- <X class="h-5 w-5" /> -->
				<span class="sr-only">Close</span>
			</Dialog.Close>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
