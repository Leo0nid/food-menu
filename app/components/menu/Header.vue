<script setup lang="ts">
const props = defineProps({
  tableName: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <header class="mb-8">
    <MenuLogo />

    <p class="mt-3 text-sm text-neutral-500">
      {{ props.tableName }}
    </p>

    <div class="mt-5 text-3xl font-bold tracking-tight">Меню</div>
  </header>
</template>
