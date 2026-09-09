<script setup lang="ts">
const props = defineProps({
  itemCount: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <aside
    v-if="props.itemCount > 0"
    class="fixed inset-x-0 bottom-0 border-t border-neutral-200 bg-white/95 py-3 backdrop-blur"
    aria-live="polite"
  >
    <LayoutContainer>
      <div class="mx-auto flex min-h-12 w-full max-w-md items-center justify-between rounded-xl bg-black px-4 text-white">
        <span class="font-medium">Корзина</span>
        <span class="text-sm">Позиций: {{ props.itemCount }}</span>
      </div>
    </LayoutContainer>
  </aside>
</template>
