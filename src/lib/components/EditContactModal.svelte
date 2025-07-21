<script lang="ts">
  import { db, type Contact } from '$lib/db/contactsDB';
  import ContactFields from './ContactFields.svelte';
  import Overlay from './Overlay.svelte';

  export let contact: Contact;
  export let onClose: () => void;

  let editableContact = { ...contact };

  async function handleSave() {
    if (!contact.id) return;
    try {
      await db.contacts.update(contact.id, {
        name: editableContact.name,
        email: editableContact.email,
        phone: editableContact.phone,
        address: editableContact.address
      });
      onClose();
    } catch (error) {
      console.error('Не удалось обновить контакт:', error);
    }
  }
</script>

<Overlay isOpen={true} {onClose} transitionParams={{ y: -50, duration: 300 }}>
  <form on:submit|preventDefault={handleSave}>
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <h3 class="text-lg leading-6 font-semibold text-gray-900" id="modal-title">
        Редактировать контакт
      </h3>
      <div class="mt-4 grid grid-cols-1 gap-y-6">
        <ContactFields contact={editableContact} />
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
</Overlay>
