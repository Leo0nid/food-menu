<template>
  <section
    aria-label="Загружаем меню"
    aria-live="polite"
  >
    <div class="mb-8">
      <USkeleton class="mb-4 h-4 w-20" />
      <USkeleton class="h-9 w-28" />
    </div>

    <div
      v-for="item in 3"
      :key="item"
      class="flex items-center justify-between gap-4 border-b border-neutral-200 py-5"
    >
      <div class="flex-1">
        <USkeleton class="mb-2 h-5 w-36" />
        <USkeleton class="mb-3 h-4 w-full max-w-60" />
        <USkeleton class="h-5 w-16" />
      </div>

      <USkeleton class="size-10 rounded-lg" />
    </div>

    <span class="sr-only">Загружаем меню...</span>
  </section>
</template>
