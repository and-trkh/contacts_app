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
            if (e.key === 'Escape') {
              closeModal();
            }
          }}
          role="button"
          tabindex="0"
        ></div>

        <ContactForm contact={currentContact} on:save={() => closeModal()} onClose={closeModal} />
      </div>
    {/if}
  </div>
</div>
