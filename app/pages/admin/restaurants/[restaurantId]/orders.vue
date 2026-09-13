<template>
  <div>
    <header class="mb-6 flex items-end justify-between gap-6">
      <div>
        <p class="mb-2 text-sm text-neutral-500">SeatMe · Панель ресторана</p>

        <h1 class="mb-1 text-3xl font-bold tracking-tight">Заказы</h1>

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

    <AdminOrdersSummary :items="orderSummary" />

    <div
      v-if="status === 'pending'"
      class="grid items-start gap-5 lg:grid-cols-2 xl:grid-cols-3"
    >
      <UCard v-for="item in 6" :key="item">
        <USkeleton class="mb-5 h-5 w-32" />
        <USkeleton class="mb-3 h-7 w-24" />
        <USkeleton class="mb-2 h-4 w-full" />
        <USkeleton class="h-4 w-2/3" />
      </UCard>
    </div>

    <UiErrorState
      v-else-if="error"
      message="Не удалось загрузить заказы"
      @retry="refresh()"
    />

    <section
      v-else-if="orders?.length"
      class="grid items-start gap-5 lg:grid-cols-2 xl:grid-cols-3"
      aria-label="Список заказов"
    >
      <AdminOrdersCard
        v-for="details in orders"
        :key="details.order.id"
        :details="details"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { OrderDetails } from "~/types/order/order-details";

type OrderStatus = OrderDetails["order"]["status"];

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

const orderSummary = computed(() => {
  return [
    { label: "Всего заказов", value: orders.value?.length ?? 0 },
    { label: "Новые", value: countOrdersByStatus("new") },
    { label: "Готовятся", value: countOrdersByStatus("cooking") },
    { label: "Готовы", value: countOrdersByStatus("ready") },
  ];
});

function countOrdersByStatus(status: OrderStatus): number {
  return (orders.value ?? []).filter((item) => {
    return item.order.status === status;
  }).length;
}
</script>
