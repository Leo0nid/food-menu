<script setup lang="ts">
import type { PropType } from "vue";
import type { MenuItem } from "~/types/menu/menu-item";

const props = defineProps({
  items: {
    type: Array as PropType<MenuItem[]>,
    required: true,
  },
});

const emit = defineEmits<{
  add: [itemId: string];
}>();
</script>

<template>
  <p
    v-if="props.items.length === 0"
    class="rounded-2xl border border-neutral-200 p-6 text-center text-neutral-500"
  >
    В меню пока нет блюд
  </p>

  <section v-else aria-label="Список блюд">
    <MenuItemCard
      v-for="item in props.items"
      :key="item.id"
      :item="item"
      @add="emit('add', $event)"
    />
  </section>
</template>
