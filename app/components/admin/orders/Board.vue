<template>
  <div class="overflow-x-auto pb-2">
    <div class="grid min-w-[996px] grid-cols-4 items-start gap-3">
      <section
        v-for="column in columns"
        :key="column.status"
        class="rounded-lg border border-neutral-200 bg-neutral-200/50 p-2"
      >
        <header class="flex items-center justify-between px-2 py-2">
          <h2 class="flex items-center gap-2">
            <UBadge
              color="neutral"
              variant="soft"
              size="lg"
              class="rounded-sm"
              :class="column.badgeClass"
            >
              {{ column.label }}
            </UBadge>
            <span
              class="text-sm font-medium text-neutral-500 tabular-nums"
              :aria-label="`Количество заказов: ${column.orders.length}`"
            >
              {{ column.orders.length }}
            </span>
          </h2>
        </header>

        <div class="mt-2">
          <AdminOrdersCard
            v-for="details in column.orders"
            :key="details.order.id"
            :details="details"
            :now="now"
            @show-details="openOrder(details.order.id)"
            class="mb-3 last:mb-0"
          />

          <p
            v-if="column.orders.length === 0"
            class="rounded-lg border border-dashed border-neutral-300 bg-white/60 p-6 text-center text-sm text-neutral-500"
          >
            Нет заказов
          </p>
        </div>
      </section>
    </div>
    <AdminOrdersModal
      v-if="selectedOrder"
      v-model:open="detailsOpen"
      :details="selectedOrder"
      :now="now"
    />
  </div>
</template>

<script setup lang="ts">
import { orderStatusColumns } from "~/constants/orderStatuses";
import type { OrderDetails } from "~/types/order/order-details";

const props = defineProps<{
  orders: OrderDetails[];
}>();

const selectedOrderId = ref<string | null>(null);
const detailsOpen = ref(false);
const selectedOrder = computed(() =>
  props.orders.find((details) => details.order.id === selectedOrderId.value) ?? null,
);

function openOrder(orderId: string): void {
  selectedOrderId.value = orderId;
  detailsOpen.value = true;
}

watch(selectedOrder, (details) => {
  if (!details) detailsOpen.value = false;
});

const initialTime = useState("orders-initial-time", () => Date.now());
const now = ref(initialTime.value);

let timer: ReturnType<typeof setInterval> | undefined;

onMounted(() => {
  now.value = Date.now();
  timer = setInterval(() => {
    now.value = Date.now();
  }, 30_000);
});

onUnmounted(() => {
  if (timer !== undefined) clearInterval(timer);
});

const columns = computed(() => {
  return orderStatusColumns.map((column) => ({
    ...column,
    orders: props.orders.filter((details) => {
      return details.order.status === column.status;
    }),
  }));
});
</script>
