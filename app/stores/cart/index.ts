import type { MenuItem } from "~/types/menu/menu-item";

type CartItem = {
  product: MenuItem;
  quantity: number;
};

export const useCartStore = defineStore("cart", () => {
  const cartItems = ref<CartItem[]>([]);

  const totalItems = computed(() => {
    return cartItems.value.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);
  });

  const totalPriceKopecks = computed(() => {
    return cartItems.value.reduce((total, cartItem) => {
      const itemPrice = cartItem.product.priceKopecks * cartItem.quantity;

      return total + itemPrice;
    }, 0);
  });
  function incrementItem(product: MenuItem) {
    const cartItem = cartItems.value.find((cartItem) => {
      return cartItem.product.id === product.id;
    });

    if (cartItem) {
      cartItem.quantity += 1;
      return;
    }

    cartItems.value.push({
      product,
      quantity: 1,
    });
  }

  function getItemQuantity(productId: string) {
    const cartItem = cartItems.value.find((cartItem) => {
      return cartItem.product.id === productId;
    });

    return cartItem?.quantity ?? 0;
  }

  function removeItem(productId: string) {
    cartItems.value = cartItems.value.filter((cartItem) => {
      return cartItem.product.id !== productId;
    });
  }

  function decrementItem(productId: string) {
    const cartItem = cartItems.value.find((cartItem) => {
      return cartItem.product.id === productId;
    });

    if (!cartItem) {
      return;
    }

    cartItem.quantity -= 1;

    if (cartItem.quantity === 0) {
      removeItem(productId);
    }
  }

  return {
    cartItems,
    totalItems,
    totalPriceKopecks,
    incrementItem,
    decrementItem,
    getItemQuantity,
    removeItem,
  };
});
