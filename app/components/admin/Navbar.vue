<template>
  <aside
    class="flex items-center justify-between gap-4 border-b border-neutral-200 bg-white px-2.5 py-4 md:sticky md:top-0 md:h-dvh md:w-64 lg:w-72 md:shrink-0 md:flex-col md:items-stretch md:justify-start md:gap-0 md:border-r md:border-b-0 md:py-6"
  >
    <div class="flex items-center gap-3 px-3 md:mb-8">
      <UIcon
        name="i-lucide-utensils"
        class="size-8 shrink-0"
        aria-hidden="true"
      />
      <p class="text-lg leading-5 font-bold">Панель<br />ресторана</p>
    </div>

    <nav aria-label="Навигация ресторана">
      <NuxtLink
        :to="ordersPath"
        class="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
        :class="
          route.path === ordersPath
            ? 'bg-neutral-900 text-white'
            : 'text-neutral-700 hover:bg-neutral-100'
        "
      >
        <UIcon
          name="i-lucide-receipt-text"
          class="size-5 shrink-0"
          aria-hidden="true"
        />
        Заказы
      </NuxtLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute();
const ordersPath = computed(
  () => `/admin/restaurants/${encodeURIComponent(String(route.params.restaurantId ?? ""))}/orders`,
);
</script>
