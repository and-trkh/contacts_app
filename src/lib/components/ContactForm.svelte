<script lang="ts">
  import { db, type Contact } from '$lib/db/contactsDB';
  import { onMount } from 'svelte';
  import ContactFields from './ContactFields.svelte';
  import Overlay from './Overlay.svelte';

  export let contact: Contact | null = null;
  export let onClose: () => void;

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
      contactData = { ...contact };
    }
  });

  async function saveContact() {
    if (contactData.id) {
      await db.contacts.update(contactData.id, contactData);
    } else {
      await db.contacts.add(contactData);
    }
    onClose();
  }
</script>

<form on:submit|preventDefault={saveContact}>
  <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
    <h3 class="text-lg leading-6 font-semibold text-gray-900" id="modal-title">Добавить контакт</h3>
    <div class="mt-4 grid grid-cols-1 gap-y-6">
      <ContactFields contact={contactData} />
    </div>
  </div>
  <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
    <button
      type="submit"
      class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
    >
      Сохранить
    </button>
    <button
      type="button"
      on:click={onClose}
      class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
    >
      Отмена
    </button>
  </div>
</form>
