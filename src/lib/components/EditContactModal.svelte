<script lang="ts">
  import { db, type Contact } from '$lib/db/contactsDB';
  import { fly } from 'svelte/transition';
  import ContactFields from './ContactFields.svelte';

  export let contact: Contact;
  export let onClose: () => void;

  // Создаем локальную копию для редактирования, чтобы не изменять prop напрямую
  let editableContact = { ...contact };

  async function handleSave() {
    if (!contact.id) return;
    try {
      // Обновляем только те поля, которые могут быть изменены
      await db.contacts.update(contact.id, {
        name: editableContact.name,
        email: editableContact.email,
        phone: editableContact.phone,
        address: editableContact.address
      });
      onClose(); // Закрываем модальное окно после успешного сохранения
    } catch (error) {
      console.error('Не удалось обновить контакт:', error);
      // Здесь можно добавить уведомление для пользователя об ошибке
    }
  }

  // Закрываем модальное окно по нажатию на Escape
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      onClose();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- Фон модального окна -->
<div
  class="fixed inset-0 z-10 bg-black/30 transition-opacity"
  aria-hidden="true"
  on:click={onClose}
></div>

<!-- Панель модального окна -->
<div
  class="fixed inset-0 z-20 flex min-h-full items-center justify-center p-4 sm:p-0"
  transition:fly={{ y: -50, duration: 300 }}
>
  <div
    class="relative max-h-[90vh] w-full max-w-lg transform overflow-hidden overflow-y-auto rounded-lg bg-white text-left shadow-xl transition-all sm:my-8"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    tabindex="-1"
    on:click|stopPropagation
    on:keydown={() => {}}
  >
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
  </div>
</div>
