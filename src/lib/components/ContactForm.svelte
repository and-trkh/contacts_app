<script lang="ts">
  import { db, type Contact } from '$lib/db/contactsDB';
  import { onMount, createEventDispatcher } from 'svelte';

  export let contact: Contact | null = null;

  const dispatch = createEventDispatcher();

  let name = '';
  let phone = '';
  let email = '';
  let address = '';

  onMount(() => {
    if (contact) {
      name = contact.name;
      phone = contact.phone;
      email = contact.email;
      address = contact.address || '';
    }
  });

  async function saveContact() {
    const contactData = {
      name,
      phone,
      email,
      address: address || undefined,
      createdAt: contact?.createdAt || new Date(),
      updatedAt: new Date()
    };

    if (contact?.id) {
      await db.contacts.update(contact.id, contactData);
    } else {
      await db.contacts.add(contactData);
    }
    dispatch('close'); // Закрыть форму после сохранения
  }

  function closeForm() {
    dispatch('close');
  }
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.key === 'Escape') closeForm();
  }}
/>

<form on:submit|preventDefault={saveContact} class="space-y-4">
  <div>
    <label for="name" class="block text-sm font-medium text-gray-700">Имя</label>
    <input
      id="name"
      bind:value={name}
      required
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    />
  </div>

  <div>
    <label for="phone" class="block text-sm font-medium text-gray-700">Телефон</label>
    <input
      id="phone"
      type="tel"
      bind:value={phone}
      required
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    />
  </div>

  <div>
    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
    <input
      id="email"
      type="email"
      bind:value={email}
      required
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    />
  </div>

  <div>
    <label for="address" class="block text-sm font-medium text-gray-700">Адрес (опционально)</label>
    <textarea
      id="address"
      bind:value={address}
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    ></textarea>
  </div>

  <div class="flex justify-end space-x-2">
    <button
      type="button"
      on:click={closeForm}
      class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
      >Отмена</button
    >
    <button
      type="submit"
      class="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
      >Сохранить</button
    >
  </div>
</form>
