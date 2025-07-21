<script lang="ts">
	import { db, type Contact } from '$lib/db/contactsDB';
	import { liveQuery } from 'dexie';
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte'; // Используется для совместимости со Svelte 4+

	const dispatch = createEventDispatcher();
	export let searchTerm = '';
	const contactQuery = liveQuery(async () => {
		if (!searchTerm) {
			return db.contacts.toArray();
		}
		return db.contacts
			.filter((contact) => {
				return (
					contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					contact.phone.includes(searchTerm) ||
					contact.email.toLowerCase().includes(searchTerm.toLowerCase())
				);
			})
			.toArray();
	});

	async function deleteContact(id: number) {
		await db.contacts.delete(id);
	}
</script>

<div class="overflow-hidden bg-white shadow sm:rounded-md">
	<ul role="list" class="divide-y divide-gray-200">
		{#each $contactQuery as contact (contact.id)}
			<li
				in:fade
				class="cursor-pointer px-4 py-4 sm:px-6"
				on:click={() => dispatch('click:contact', contact)}
				on:keydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						dispatch('click:contact', contact);
					}
				}}
				tabindex="0"
				role="button"
			>
				<div class="flex items-center justify-between">
					<div class="truncate text-sm font-medium text-indigo-600">{contact.name}</div>
					<div class="ml-2 flex flex-shrink-0">
						<button
							on:click|stopPropagation={() => deleteContact(contact.id!)}
							class="text-red-600 hover:text-red-900">Удалить</button
						>
					</div>
				</div>
				<div class="mt-2 sm:flex sm:justify-between">
					<div class="sm:flex">
						<div class="mr-6 flex items-center text-sm text-gray-500">
							<span class="mr-1">📱</span>
							{contact.phone}
						</div>
						<div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
							<span class="mr-1">✉️</span>
							{contact.email}
						</div>
					</div>
					<div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
						<span class="mr-1">🏠</span>
						{contact.address || 'Не указан'}
					</div>
				</div>
			</li>
		{:else}
			<li class="px-4 py-4 text-center text-gray-500">Нет контактов</li>
		{/each}
	</ul>
</div>
