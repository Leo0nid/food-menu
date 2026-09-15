<template>
  <div class="w-full">
    <header class="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="mb-2 text-sm text-neutral-500">
          SeatMe · Панель ресторана
        </p>

        <h1 class="mb-1 text-3xl font-bold tracking-tight">
          Заказы
        </h1>

        <p class="text-sm text-neutral-500">
          Следите за текущими заказами ресторана
        </p>
      </div>

      <UButton
        color="neutral"
        variant="outline"
        icon="i-lucide-refresh-cw"
        :loading="status === 'pending'"
        @click="refresh()"
      >
        Обновить
      </UButton>
    </header>

    <div v-if="status === 'pending'" class="overflow-x-auto pb-2">
      <div class="grid min-w-[996px] grid-cols-4 items-start gap-3">
        <UCard v-for="item in 4" :key="item">
          <USkeleton class="mb-5 h-5 w-32" />
          <USkeleton class="mb-3 h-7 w-24" />
          <USkeleton class="mb-2 h-4 w-full" />
          <USkeleton class="h-4 w-2/3" />
        </UCard>
      </div>
    </div>

    <UiErrorState
      v-else-if="error"
      message="Не удалось загрузить заказы"
      @retry="refresh()"
    />

    <AdminOrdersBoard v-else :orders="orders ?? []" />
  </div>
</template>

<script setup lang="ts">
import type { OrderDetails } from "~/types/order/order-details";

definePageMeta({
  layout: "admin",
});

const route = useRoute();

const restaurantId = computed(() => {
  return String(route.params.restaurantId ?? "");
});

const {
  data: orders,
  status,
  error,
  refresh,
} = await useFetch<OrderDetails[]>(() => {
  return `/api/restaurants/${restaurantId.value}/orders`;
});
</script>
