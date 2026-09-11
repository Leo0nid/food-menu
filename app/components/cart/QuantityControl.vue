<template>
  <div
    class="inline-flex h-12 shrink-0 items-center overflow-hidden rounded-lg bg-neutral-100"
  >
    <UButton
      icon="i-lucide-minus"
      color="neutral"
      variant="ghost"
      class="h-12 w-12 justify-center rounded-none p-0"
      :aria-label="`Уменьшить количество «${props.product.name}»`"
      @click="cartStore.decrementItem(props.product.id)"
    />

    <span
      class="grid h-12 min-w-12 place-items-center border-x border-neutral-200 font-semibold"
    >
      {{ props.quantity }}
    </span>

    <UButton
      icon="i-lucide-plus"
      color="neutral"
      variant="ghost"
      class="h-12 w-12 justify-center rounded-none p-0"
      :aria-label="`Увеличить количество «${props.product.name}»`"
      @click="cartStore.incrementItem(props.product)"
    />
  </div>
</template>

<script setup lang="ts">
import type { MenuItem } from "~/types/menu/menu-item";

const props = defineProps<{
  product: MenuItem;
  quantity: number;
}>();

const cartStore = useCartStore();
</script>
