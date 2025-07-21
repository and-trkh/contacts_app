<script lang="ts">
  import { db, type Contact } from '$lib/db/contactsDB';
  import ContactForm from '$lib/components/ContactForm.svelte';
  import ContactList from '$lib/components/ContactList.svelte';
  import SearchBar from '$lib/components/SearchBar.svelte';

  let searchTerm = '';
  let showModal = false;
  let currentContact: Contact | null = null;

  function openEditModal(contact: Contact) {
    currentContact = contact;
    showModal = true;
  }

  function openCreateModal() {
    currentContact = null;
    showModal = true;
  }

  function closeModal() {
    currentContact = null;
    showModal = false;
  }
</script>

<div class="min-h-screen bg-gray-100">
  <div class="mx-auto max-w-4xl p-4 sm:p-6">
    <div class="mb-8 flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900">Список контактов</h1>
      <button
        on:click={openCreateModal}
        class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
      >
        + Добавить контакт
      </button>
    </div>

    <div class="mb-6">
      <SearchBar bind:searchTerm placeholder="Поиск по имени, телефону или email..." />
    </div>

    <ContactList bind:searchTerm on:click:contact={(event) => openEditModal(event.detail)} />

    {#if showModal}
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <!-- Оверлей -->
        <div
          class="fixed inset-0 bg-gray-500 opacity-75 transition-opacity"
          aria-hidden="true"
          on:click={closeModal}
          on:keydown={(e) => {
            if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
              closeModal();
            }
          }}
          role="button"
          tabindex="0"
        ></div>

        <div class="flex min-h-screen items-end justify-center p-4 sm:p-0">
          <span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true"
            >&#8203;</span
          >

          <div
            class="relative z-20 inline-block max-h-[90vh] transform overflow-hidden overflow-y-auto rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
          >
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h2 class="mb-4 text-lg font-medium text-gray-900">
                {currentContact ? 'Редактировать контакт' : 'Новый контакт'}
              </h2>
              <ContactForm
                contact={currentContact}
                on:save={() => closeModal()}
                on:close={closeModal}
              />
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
