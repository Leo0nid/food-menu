<script setup lang="ts">
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
});

const emit = defineEmits<{
  retry: [];
}>();
</script>

<template>
  <section
    class="rounded-2xl border border-neutral-200 p-6 text-center"
    role="alert"
  >
    <h2 class="text-lg font-semibold">
      Что-то пошло не так
    </h2>

    <p class="mt-2 text-sm text-neutral-500">
      {{ props.message }}
    </p>

    <button
      type="button"
      class="mt-5 min-h-11 rounded-xl bg-black px-5 py-3 font-medium text-white transition hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
      @click="emit('retry')"
    >
      Попробовать снова
    </button>
  </section>
</template>
