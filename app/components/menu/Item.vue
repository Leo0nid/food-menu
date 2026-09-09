<script setup lang="ts">
import type { PropType } from "vue";
import type { MenuItem } from "~/types/menu/menu-item";

const props = defineProps({
  item: {
    type: Object as PropType<MenuItem>,
    required: true,
  },
});

const emit = defineEmits<{
  add: [itemId: string];
}>();
</script>

<template>
  <article class="flex items-center justify-between gap-4 border-b border-neutral-200 py-5">
    <div class="min-w-0">
      <h2 class="font-semibold">
        {{ props.item.name }}
      </h2>

      <p
        v-if="props.item.description"
        class="mt-1 text-sm leading-5 text-neutral-500"
      >
        {{ props.item.description }}
      </p>

      <p class="mt-2 font-semibold">
        {{ formatPrice(props.item.priceKopecks) }}
      </p>
    </div>

    <UiIconButton
      :aria-label="`Добавить «${props.item.name}»`"
      @click="emit('add', props.item.id)"
    >
      <span aria-hidden="true">+</span>
    </UiIconButton>
  </article>
</template>
