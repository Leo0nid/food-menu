<template>
  <header class="mb-8">
    <MenuLogo class="mb-3" />

    <p class="mb-5 text-sm text-neutral-500">
      {{ props.tableName }}
    </p>

    <div class="text-3xl font-bold tracking-tight">Меню</div>
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{ tableName: string }>();
</script>
