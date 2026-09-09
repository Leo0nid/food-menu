import type { MaybeRefOrGetter } from "vue";
import type { TableMenuResponse } from "~/types/menu/table-menu-response";

export function useTableMenu(token: MaybeRefOrGetter<string>) {
  const endpoint = computed(() => {
    const tableToken = encodeURIComponent(toValue(token));
    return `/api/tables/${tableToken}`;
  });

  return useFetch<TableMenuResponse>(endpoint);
}
