<script lang="ts">
  import { db, type Contact } from '$lib/db/contactsDB';
  import { onMount, createEventDispatcher } from 'svelte';
  import ContactFields from './ContactFields.svelte'; // Импортируем новый компонент

  export let contact: Contact | null = null;

  const dispatch = createEventDispatcher();

  // Используем один объект для данных формы
  let contactData: Contact = {
    id: contact?.id,
    name: '',
    phone: '',
    email: '',
    address: '',
    createdAt: contact?.createdAt || new Date(),
    updatedAt: new Date()
  };

  onMount(() => {
    if (contact) {
      // Копируем данные из prop в contactData
      contactData = { ...contact };
    }
  });

  async function saveContact() {
    if (contactData.id) {
      await db.contacts.update(contactData.id, contactData);
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

<form on:submit|preventDefault={saveContact} class="space-y-4 p-4">
  <ContactFields contact={contactData} />
  <!-- Используем новый компонент -->

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
