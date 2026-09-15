<template>
  <article
    class="min-w-0 overflow-hidden rounded-lg border border-neutral-200 bg-white"
  >
    <header class="border-b border-neutral-200 px-4 py-3">
      <div
        class="mb-1 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1"
      >
        <h2 class="text-lg font-bold">Стол {{ order.tableId.slice(0, 8) }}</h2>
        <p class="whitespace-nowrap text-sm text-neutral-500">
          {{ elapsedTime }}
        </p>
      </div>
      <p class="truncate text-sm text-neutral-500">
        Заказ №{{ order.id.slice(0, 8) }}
      </p>
    </header>

    <div class="px-4 py-3">
      <div class="mb-2 flex items-center justify-between">
        <h3 class="font-semibold">Состав заказа</h3>

        <span class="text-sm text-neutral-500"> {{ items.length }} поз. </span>
      </div>

      <ul class="mb-2">
        <li
          v-for="item in visibleItems"
          :key="item.id"
          class="mb-2 flex justify-between gap-3 border-b border-neutral-100 pb-2 last:mb-0 last:border-b-0 last:pb-0"
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
            {{ formatPrice(item.priceKopecksSnapshot * item.quantity) }}
          </p>
        </li>
      </ul>

      <div
        class="flex flex-wrap items-center gap-x-2 gap-y-1"
        :class="hasComment ? 'mb-2' : undefined"
      >
        <p v-if="remainingCount > 0" class="text-sm text-neutral-500">
          Ещё {{ formatPositionCount(remainingCount) }}
        </p>

        <UButton
          type="button"
          color="neutral"
          variant="link"
          trailing-icon="i-lucide-arrow-right"
          class="ml-auto min-h-9 shrink-0 px-0"
          aria-haspopup="dialog"
          @click="emit('showDetails')"
        >
          Подробнее
        </UButton>
      </div>

      <p
        v-if="hasComment"
        class="flex items-center gap-2 text-sm text-neutral-600"
      >
        <UIcon
          name="i-lucide-message-square"
          class="size-5 shrink-0"
          aria-hidden="true"
        />
        Есть комментарий
      </p>
    </div>

    <footer class="border-t border-neutral-200 bg-neutral-50 px-4 py-3">
      <div class="mb-2 flex items-end justify-between">
        <p class="text-sm text-neutral-500">Итого</p>

        <p class="text-lg font-bold">
          {{ formatPrice(order.totalKopecks) }}
        </p>
      </div>

      <UButton
        color="neutral"
        class="mx-auto flex w-fit justify-center px-6 cursor-pointer"
      >
        Принять заказ
      </UButton>
    </footer>
  </article>
</template>

<script setup lang="ts">
import type { OrderDetails } from "~/types/order/order-details";

const props = defineProps<{
  details: OrderDetails;
  now: number;
}>();

const emit = defineEmits<{
  showDetails: [];
}>();

const order = computed(() => props.details.order);
const hasComment = computed(() => Boolean(order.value.comment?.trim()));
const items = computed(() => props.details.items);
const visibleItems = computed(() => items.value.slice(0, 3));
const remainingCount = computed(() => Math.max(0, items.value.length - 3));

const elapsedTime = computed(() =>
  dayjs(order.value.createdAt).from(props.now),
);
</script>
