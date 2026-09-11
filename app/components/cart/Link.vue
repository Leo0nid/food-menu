<template>
  <aside
    v-if="props.itemCount > 0"
    class="fixed inset-x-0 bottom-0 z-10 mx-auto w-full max-w-2xl px-4 py-3 sm:px-6"
    aria-live="polite"
  >
    <UButton
      :to="`/cart/${props.tableToken}`"
      color="neutral"
      class="min-h-14 w-full justify-between px-4 text-base font-semibold"
    >
      <span>Корзина · {{ formatProductCount(props.itemCount) }}</span>

      <span class="flex items-center gap-3">
        {{ formatPrice(props.totalPriceKopecks) }}
        <UIcon name="i-lucide-arrow-right" class="size-5" />
      </span>
    </UButton>
  </aside>
</template>

<script setup lang="ts">
const props = defineProps<{
  itemCount: number;
  totalPriceKopecks: number;
  tableToken: string;
}>();
</script>
