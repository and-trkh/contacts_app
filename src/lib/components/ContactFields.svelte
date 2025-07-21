<!-- src/lib/components/ContactFields.svelte -->
<script lang="ts">
  import type { Contact } from '$lib/db/contactsDB';

  export let contact: Contact; // Принимаем объект контакта для привязки
</script>

<div>
  <label for="name" class="block text-sm font-medium text-gray-700">Имя</label>
  <input
    type="text"
    id="name"
    bind:value={contact.name}
    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    required
  />
</div>
<div>
  <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
  <input
    type="email"
    id="email"
    bind:value={contact.email}
    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    required
  />
</div>
<div>
  <label for="phone" class="block text-sm font-medium text-gray-700">Телефон</label>
  <input
    type="tel"
    id="phone"
    bind:value={contact.phone}
    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    required
  />
</div>
<div>
  <label for="address" class="block text-sm font-medium text-gray-700">Адрес</label>
  <input
    type="text"
    id="address"
    bind:value={contact.address}
    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
  />
</div>
