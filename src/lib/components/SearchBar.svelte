<script lang="ts">
  export let searchTerm: string;
  export let placeholder = "Поиск контактов...";
</script>

<div class="relative rounded-md shadow-sm">
  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
    <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>
  </div>
  <input 
    type="text" 
    bind:value={searchTerm}
    class="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    placeholder={placeholder}
  />
</div>
