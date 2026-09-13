<template>
  <article
    class="min-w-0 overflow-hidden rounded-lg border border-neutral-200 bg-white"
  >
    <header class="border-b border-neutral-200 px-5 py-4">
      <div class="mb-4 flex items-start justify-between gap-4">
        <p class="truncate text-sm font-medium text-neutral-500">
          Заказ №{{ order.id.slice(0, 8) }}
        </p>

        <UBadge color="neutral" variant="soft">
          {{ getStatusLabel(order.status) }}
        </UBadge>
      </div>

      <h2 class="mb-1 text-xl font-bold">
        Стол {{ order.tableId.slice(0, 8) }}
      </h2>

      <p class="text-sm text-neutral-500">
        {{ formatOrderDate(order.createdAt) }}
      </p>
    </header>

    <div class="px-5 py-4">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="font-semibold">
          Состав заказа
        </h3>

        <span class="text-sm text-neutral-500">
          {{ items.length }} поз.
        </span>
      </div>

      <ul>
        <li
          v-for="item in items"
          :key="item.id"
          class="mb-3 flex justify-between gap-4 border-b border-neutral-100 pb-3 last:mb-0 last:border-b-0 last:pb-0"
        >
          <div class="min-w-0">
            <p class="truncate font-medium">
              {{ item.nameSnapshot }}
            </p>

            <p class="text-sm text-neutral-500">
              {{ item.quantity }} ×
              {{ formatPrice(item.priceKopecksSnapshot) }}
            </p>
          </div>

          <p class="shrink-0 font-semibold">
            {{
              formatPrice(
                item.priceKopecksSnapshot * item.quantity,
              )
            }}
          </p>
        </li>
      </ul>

      <div
        v-if="order.comment"
        class="mt-4 rounded-lg bg-neutral-100 p-3"
      >
        <p
          class="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-500"
        >
          Комментарий
        </p>

        <p class="text-sm text-neutral-700">
          {{ order.comment }}
        </p>
      </div>
    </div>

    <footer class="border-t border-neutral-200 bg-neutral-50 px-5 py-4">
      <div class="mb-4 flex items-end justify-between">
        <p class="text-sm text-neutral-500">
          Итого
        </p>

        <p class="text-xl font-bold">
          {{ formatPrice(order.totalKopecks) }}
        </p>
      </div>

      <UButton color="neutral" block>
        Принять заказ
      </UButton>
    </footer>
  </article>
</template>

<script setup lang="ts">
import type { OrderDetails } from "~/types/order/order-details";

type OrderStatus = OrderDetails["order"]["status"];

const props = defineProps<{
  details: OrderDetails;
}>();

const order = computed(() => props.details.order);
const items = computed(() => props.details.items);

const statusLabels: Record<OrderStatus, string> = {
  new: "Новый",
  cooking: "Готовится",
  ready: "Готов",
  done: "Завершён",
};

const orderDateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

function getStatusLabel(status: OrderStatus): string {
  return statusLabels[status];
}

function formatOrderDate(date: string): string {
  return orderDateFormatter.format(new Date(date));
}
</script>
