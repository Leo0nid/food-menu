<script setup lang="ts">
const props = defineProps<{
  message: string;
}>();

const emit = defineEmits<{
  retry: [];
}>();
</script>

<template>
  <section
    class="rounded-2xl border border-neutral-200 p-6 text-center"
    role="alert"
  >
    <h2 class="mb-2 text-lg font-semibold">Что-то пошло не так</h2>

    <p class="mb-5 text-sm text-neutral-500">
      {{ props.message }}
    </p>

    <UButton color="neutral" @click="emit('retry')">
      Попробовать снова
    </UButton>
  </section>
</template>
