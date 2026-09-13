<template>
  <section
    class="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4"
    aria-label="Сводка заказов"
  >
    <article
      v-for="(item, index) in props.items"
      :key="item.label"
      class="rounded-lg border p-4"
      :class="
        index === 0
          ? 'border-black bg-black text-white'
          : 'border-neutral-200 bg-white'
      "
    >
      <p
        class="mb-3 text-sm"
        :class="index === 0 ? 'text-neutral-300' : 'text-neutral-500'"
      >
        {{ item.label }}
      </p>

      <p class="text-2xl font-bold">
        {{ item.value }}
      </p>
    </article>
  </section>
</template>

<script setup lang="ts">
type SummaryItem = {
  label: string;
  value: number;
};

const props = defineProps<{
  items: SummaryItem[];
}>();
</script>
