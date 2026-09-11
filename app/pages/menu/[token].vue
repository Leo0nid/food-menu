<template>
  <MenuSkeleton v-if="status === 'pending'" />

  <UiErrorState
    v-else-if="error"
    message="Не удалось загрузить меню"
    @retry="refresh"
  />

  <template v-else-if="data">
    <MenuHeader :table-name="data.table.name" />

    <MenuEmpty v-if="data.items.length === 0" />

    <section v-else aria-label="Список блюд">
      <MenuItem v-for="item in data.items" :key="item.id" :item="item" />
    </section>
  </template>

  <CartLink
    :item-count="cartStore.totalItems"
    :total-price-kopecks="cartStore.totalPriceKopecks"
    :table-token="tableToken"
  />
</template>

<script setup lang="ts">
const route = useRoute();
const cartStore = useCartStore();
const tableToken = computed(() => String(route.params.token ?? ""));

const { data, status, error, refresh } = await useTableMenu(tableToken);
</script>
