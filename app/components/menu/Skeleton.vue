<template>
  <section
    aria-label="Загружаем меню"
    aria-live="polite"
  >
    <div class="mb-8">
      <div class="h-4 w-20 animate-pulse rounded bg-neutral-200" />
      <div class="mt-4 h-9 w-28 animate-pulse rounded bg-neutral-200" />
    </div>

    <div
      v-for="item in 3"
      :key="item"
      class="flex items-center justify-between gap-4 border-b border-neutral-200 py-5"
    >
      <div class="flex-1">
        <div class="h-5 w-36 animate-pulse rounded bg-neutral-200" />
        <div class="mt-2 h-4 w-full max-w-60 animate-pulse rounded bg-neutral-100" />
        <div class="mt-3 h-5 w-16 animate-pulse rounded bg-neutral-200" />
      </div>

      <div class="size-10 animate-pulse rounded-xl bg-neutral-200" />
    </div>

    <span class="sr-only">Загружаем меню...</span>
  </section>
</template>
