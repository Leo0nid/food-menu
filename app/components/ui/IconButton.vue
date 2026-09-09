<script setup lang="ts">
const props = defineProps({
  ariaLabel: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <button
    type="button"
    :aria-label="props.ariaLabel"
    :disabled="props.disabled"
    class="grid size-10 shrink-0 place-items-center rounded-xl bg-black text-xl leading-none text-white transition hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-neutral-300"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>
