export const useCartStore = defineStore("cart", () => {
  const itemQuantities = ref<Record<string, number>>({});

  const totalItems = computed(() =>
    Object.values(itemQuantities.value).reduce(
      (total, quantity) => total + quantity,
      0,
    ),
  );

  function addItem(itemId: string) {
    itemQuantities.value[itemId] = (itemQuantities.value[itemId] ?? 0) + 1;
  }

  return {
    itemQuantities,
    totalItems,
    addItem,
  };
});
