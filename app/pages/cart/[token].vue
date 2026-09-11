<template>
  <div>
    <header class="mb-8 flex items-center gap-4">
      <UButton
        :to="`/menu/${tableToken}`"
        icon="i-lucide-arrow-left"
        color="neutral"
        variant="soft"
        class="size-10 justify-center p-0"
        aria-label="Вернуться в меню"
      />

      <h1 class="text-2xl font-bold tracking-tight">Ваш заказ</h1>
    </header>

    <section class="mb-8" aria-label="Состав заказа">
      <CartItem
        v-for="cartItem in cartStore.cartItems"
        :key="cartItem.product.id"
        :product="cartItem.product"
        :quantity="cartItem.quantity"
      />
    </section>

    <section class="mb-8">
      <div class="mb-3 flex items-baseline gap-3">
        <label for="order-comment" class="font-semibold">
          Комментарий к заказу
        </label>

        <span class="text-sm text-neutral-500">Необязательно</span>
      </div>

      <UTextarea
        v-model="orderComment"
        id="order-comment"
        :rows="4"
        size="xl"
        class="w-full"
        :ui="{ base: 'min-h-32 resize-none' }"
        placeholder="Например, не добавлять лук"
      />
    </section>

    <section class="border-t border-neutral-200 pt-5">
      <p class="mb-4 text-neutral-500">
        {{ formatProductCount(cartStore.totalItems) }}
      </p>

      <div class="mb-6 flex items-center justify-between text-xl font-bold">
        <span>Итого</span>
        <span>{{ formatPrice(cartStore.totalPriceKopecks) }}</span>
      </div>

      <UButton
        label="Оформить заказ"
        trailing-icon="i-lucide-arrow-right"
        color="neutral"
        :loading="isSubmitting"
        :disabled="cartStore.totalItems === 0"
        class="relative min-h-14 w-full justify-center text-base font-semibold"
        :ui="{ trailingIcon: 'absolute right-4 size-5' }"
        @click="submitOrder"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
type CreateOrderResponse = {
  orderId: string;
  totalKopecks: number;
};

const route = useRoute();
const cartStore = useCartStore();
const tableToken = computed(() => String(route.params.token ?? ""));

const orderComment = ref("");
const isSubmitting = ref(false);

async function submitOrder() {
  if (!cartStore.totalItems || isSubmitting.value) {
    return;
  }

  const items = cartStore.cartItems.map(({ product, quantity }) => ({
    menuItemId: product.id,
    quantity,
  }));

  isSubmitting.value = true;

  try {
    const order = await $fetch<CreateOrderResponse>("/api/orders", {
      method: "POST",
      body: {
        tableToken: tableToken.value,
        comment: orderComment.value.trim() || null,
        items,
      },
    });

    console.log("Заказ создан:", order);
  } catch (error) {
    console.error("Не удалось создать заказ:", error);
  } finally {
    isSubmitting.value = false;
  }
}
</script>
