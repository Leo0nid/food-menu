<template>
  <article
    class="flex items-center justify-between gap-4 border-b border-neutral-200 py-5"
  >
    <div class="min-w-0">
      <h2 class="mb-1 font-semibold">
        {{ props.item.name }}
      </h2>

      <p
        v-if="props.item.description"
        class="mb-2 text-sm leading-5 text-neutral-500"
      >
        {{ props.item.description }}
      </p>

      <p class="font-semibold">
        {{ formatPrice(props.item.priceKopecks) }}
      </p>
    </div>

    <div class="shrink-0">
      <CartQuantityControl
        v-if="quantity > 0"
        :product="props.item"
        :quantity="quantity"
      />

      <UButton
        v-else
        icon="i-lucide-plus"
        color="neutral"
        variant="soft"
        label="Добавить"
        class="h-12 px-4 text-base font-semibold"
        :aria-label="`Добавить «${props.item.name}»`"
        @click="cartStore.incrementItem(props.item)"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import type { MenuItem } from "~/types/menu/menu-item";

const props = defineProps<{
  item: MenuItem;
}>();

const cartStore = useCartStore();
const quantity = computed(() => cartStore.getItemQuantity(props.item.id));
</script>
