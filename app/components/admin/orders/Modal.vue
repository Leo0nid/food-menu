<template>
  <USlideover
    v-model:open="open"
    side="right"
    :title="`Заказ № ${props.details.order.id.slice(0, 8)}`"
    :description="`Стол ${props.details.order.tableId.slice(0, 8)} · ${elapsedTime}`"
    :ui="{
      content: 'w-full max-w-xl',
      header: 'items-start',
      wrapper: 'min-w-0 flex-1 pr-8',
      title: 'mb-1 text-2xl font-bold',
      description: 'mt-0',
      body: 'min-h-0',
      footer: 'shrink-0',
    }"
  >
    <template #body>
      <UBadge
        v-if="status"
        color="neutral"
        variant="soft"
        size="lg"
        class="mb-6 rounded-sm"
        :class="status.badgeClass"
      >
        {{ status.orderLabel }}
      </UBadge>

      <div
        v-if="props.details.order.comment"
        class="mb-6 flex gap-3 rounded-lg bg-neutral-100 p-4"
      >
        <UIcon
          name="i-lucide-message-square"
          class="size-5 shrink-0"
          aria-hidden="true"
        />
        <div class="min-w-0">
          <h3 class="mb-1 font-semibold">Комментарий гостя</h3>
          <p class="whitespace-pre-wrap text-sm">
            {{ props.details.order.comment }}
          </p>
        </div>
      </div>

      <h3 class="mb-4 text-lg font-semibold">
        Состав заказа · {{ formatPositionCount(details.items.length) }}
      </h3>

      <ul class="divide-y divide-neutral-200 border-y border-neutral-200">
        <li
          v-for="item in details.items"
          :key="item.id"
          class="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-1 py-4 sm:grid-cols-[minmax(0,1fr)_auto_auto]"
        >
          <p class="min-w-0 font-medium">{{ item.nameSnapshot }}</p>
          <p
            class="col-start-1 row-start-2 text-sm text-neutral-500 sm:col-start-2 sm:row-start-1"
          >
            {{ item.quantity }} × {{ formatPrice(item.priceKopecksSnapshot) }}
          </p>
          <p
            class="col-start-2 row-start-1 whitespace-nowrap text-right font-semibold sm:col-start-3"
          >
            {{ formatPrice(item.quantity * item.priceKopecksSnapshot) }}
          </p>
        </li>
      </ul>
    </template>

    <template #footer>
      <div class="flex w-full items-center justify-between gap-4">
        <p class="text-lg font-semibold">Итого</p>
        <p class="text-2xl font-bold">
          {{ formatPrice(props.details.order.totalKopecks) }}
        </p>
      </div>
    </template>
  </USlideover>
</template>

<script setup lang="ts">
import { orderStatusColumns } from "~/constants/orderStatuses";
import type { OrderDetails } from "~/types/order/order-details";

const props = defineProps<{
  details: OrderDetails;
  now: number;
}>();

const open = defineModel<boolean>("open", { required: true });
const status = computed(() =>
  orderStatusColumns.find(
    (column) => column.status === props.details.order.status,
  ),
);
const elapsedTime = computed(() =>
  dayjs(props.details.order.createdAt).from(props.now),
);
</script>
