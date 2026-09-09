import { fileURLToPath } from "node:url";
import { createResolver } from "nuxt/kit";

const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  app: {
    head: {
      meta: [{ name: "robots", content: "noindex, nofollow" }],
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon", "@pinia/nuxt"],
  icon: {
    customCollections: [
      {
        prefix: "app-icon",
        dir: resolve("./app/assets/icons"),
      },
    ],
  },
  alias: {
    "#server": fileURLToPath(new URL("./server", import.meta.url)),
    "~repositories": fileURLToPath(
      new URL("./server/repositories", import.meta.url),
    ),
    "@usecases": fileURLToPath(
      new URL("./server/core/usecase", import.meta.url),
    ),
    "@api": fileURLToPath(new URL("./server/api", import.meta.url)),
    "@database": fileURLToPath(new URL("./server/db", import.meta.url)),
    "@entities": fileURLToPath(new URL("./server/entities", import.meta.url)),
    "@mappers": fileURLToPath(new URL("./server/mappers", import.meta.url)),
    "@errors": fileURLToPath(new URL("./server/core/errors", import.meta.url)),
  },
});