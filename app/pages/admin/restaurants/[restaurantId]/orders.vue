<template>
  <header class="mb-8 flex items-end justify-between">
    <div>
      <p class="mb-2 text-sm text-neutral-500">Панель ресторана</p>

      <h1 class="text-3xl font-bold">Заказы</h1>
    </div>

    <UBadge color="neutral" variant="soft">
      {{ orders?.length ?? 0 }}
    </UBadge>
  </header>

  <div v-if="status === 'pending'">
    <UCard v-for="item in 3" :key="item" class="mb-4">
      <USkeleton class="mb-4 h-6 w-40" />
      <USkeleton class="mb-2 h-4 w-full" />
      <USkeleton class="h-4 w-2/3" />
    </UCard>
  </div>

  <UAlert
    v-else-if="error"
    color="error"
    title="Не удалось загрузить заказы"
    description="Проверьте подключение и попробуйте ещё раз"
    icon="i-lucide-circle-alert"
  >
    <template #actions>
      <UButton color="neutral" variant="solid" @click="refresh()">
        Повторить
      </UButton>
    </template>
  </UAlert>

  <div v-else-if="orders?.length" class="grid items-start gap-5 lg:grid-cols-2">
    <article
      v-for="{ order, items } in orders"
      :key="order.id"
      class="min-w-0 overflow-hidden rounded-lg border border-neutral-300 bg-white"
    >
      <header
        class="flex items-start justify-between border-b border-neutral-200 bg-neutral-50 px-5 py-4"
      >
        <div class="min-w-0">
          <p class="mb-1 truncate text-sm text-neutral-500">
            Заказ №{{ order.id.slice(0, 8) }}
          </p>

          <h2 class="text-xl font-bold">
            Стол {{ order.tableId.slice(0, 8) }}
          </h2>

          <p class="mt-1 text-sm text-neutral-500">
            {{ formatOrderDate(order.createdAt) }}
          </p>
        </div>

        <UBadge color="neutral" variant="solid">
          {{ getStatusLabel(order.status) }}
        </UBadge>
      </header>

      <div class="px-5 py-5">
        <h3 class="mb-4 font-semibold">Состав заказа</h3>

        <ul>
          <li
            v-for="item in items"
            :key="item.id"
            class="mb-4 flex justify-between border-b border-neutral-100 pb-4 last:mb-0 last:border-b-0 last:pb-0"
          >
            <div class="min-w-0">
              <p class="truncate font-medium">
                {{ item.nameSnapshot }}
              </p>

              <p class="mt-1 text-sm text-neutral-500">
                {{ item.quantity }} ×
                {{ formatPrice(item.priceKopecksSnapshot) }}
              </p>
            </div>

            <p class="ml-4 shrink-0 font-semibold">
              {{ formatPrice(item.priceKopecksSnapshot * item.quantity) }}
            </p>
          </li>
        </ul>

        <div v-if="order.comment" class="mt-5 rounded-lg bg-neutral-100 p-4">
          <p class="mb-1 text-sm font-medium">Комментарий</p>

          <p class="text-sm text-neutral-600">
            {{ order.comment }}
          </p>
        </div>
      </div>

      <footer
        class="flex items-center justify-between border-t border-neutral-200 bg-neutral-50 px-5 py-4"
      >
        <div>
          <p class="text-sm text-neutral-500">Итого</p>

          <p class="text-xl font-bold">
            {{ formatPrice(order.totalKopecks) }}
          </p>
        </div>

        <UButton color="neutral"> Принять заказ </UButton>
      </footer>
    </article>
  </div>

  <div v-else class="rounded-lg border border-neutral-200 p-10 text-center">
    <UIcon name="i-lucide-receipt-text" class="mb-4 size-10 text-neutral-400" />

    <h2 class="mb-2 font-semibold">Заказов пока нет</h2>

    <p class="text-sm text-neutral-500">Новые заказы появятся здесь</p>
  </div>
</template>

<script setup lang="ts">
import type { OrderDetails } from "~/types/order/order-details";

const route = useRoute();

definePageMeta({
  layout: "admin",
});

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

const statusLabels = {
  new: "Новый",
  cooking: "Готовится",
  ready: "Готов",
  done: "Завершён",
} as const;

function getStatusLabel(status: OrderDetails["order"]["status"]): string {
  return statusLabels[status];
}

function formatOrderDate(date: string): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}
</script>
