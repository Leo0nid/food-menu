<script setup lang="ts">
import ErrorState from "~/components/ui/ErrorState.vue";
import { useTableMenu } from "~/composables/useTableMenu";
import { useCartStore } from "~/stores/cart";

const route = useRoute();
const cartStore = useCartStore();
const tableToken = computed(() => String(route.params.token ?? ""));

const { data, status, error, refresh } = await useTableMenu(tableToken);
</script>

<template>
  <AppContainer class="pb-28 pt-6">
    <div class="mx-auto w-full max-w-md">
      <MenuListSkeleton v-if="status === 'pending'" />

      <ErrorState
        v-else-if="error"
        message="Не удалось загрузить меню"
        @retry="refresh"
      />

      <template v-else-if="data">
        <MenuHeader :table-name="data.table.name" />
        <MenuList :items="data.items" @add="cartStore.addItem" />
      </template>
    </div>
  </AppContainer>

  <CartBar :item-count="cartStore.totalItems" />
</template>
