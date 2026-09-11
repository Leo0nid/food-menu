<template>
  <article class="border-b border-neutral-200 py-5">
    <div class="mb-4 flex items-start justify-between gap-4">
      <div class="min-w-0">
        <h2 class="mb-2 font-semibold">{{ props.product.name }}</h2>
        <p class="text-sm text-neutral-500">
          {{ formatPrice(props.product.priceKopecks) }} за порцию
        </p>
      </div>

      <UButton
        icon="i-lucide-trash-2"
        color="neutral"
        variant="soft"
        class="size-10 shrink-0 justify-center p-0"
        :aria-label="`Удалить «${props.product.name}»`"
        @click="cartStore.removeItem(props.product.id)"
      />
    </div>

    <div class="flex items-center justify-between">
      <CartQuantityControl
        :product="props.product"
        :quantity="props.quantity"
      />

      <p class="font-semibold">
        {{ formatPrice(props.product.priceKopecks * props.quantity) }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { MenuItem } from "~/types/menu/menu-item";

const props = defineProps<{
  product: MenuItem;
  quantity: number;
}>();

const cartStore = useCartStore();
</script>
