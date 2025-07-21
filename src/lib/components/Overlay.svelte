<script lang="ts">
  import { fly } from 'svelte/transition';

  export let isOpen: boolean;
  export let onClose: () => void;
  export let zIndexOverlay: string = 'z-10';
  export let zIndexContent: string = 'z-20';
  export let transitionType: any = fly;
  export let transitionParams: object = { y: -50, duration: 300 };

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      onClose();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
  <div
    class="fixed inset-0 {zIndexOverlay} bg-black/30 transition-opacity"
    aria-hidden="true"
    on:click={onClose}
  ></div>

  <div
    class="fixed inset-0 {zIndexContent} flex min-h-full items-center justify-center p-4 sm:p-0"
    transition:fly={transitionParams}
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
      <slot></slot>
    </div>
  </div>
{/if}
