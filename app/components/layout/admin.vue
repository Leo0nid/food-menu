<template>
  <div class="min-h-dvh bg-neutral-100 text-black">
    <header class="border-b border-neutral-200 bg-white">
      <UContainer class="max-w-5xl">
        <div class="flex min-h-16 items-center justify-between">
          <NuxtLink to="/admin" class="text-xl font-bold"> SeatMe </NuxtLink>

          <p class="text-sm text-neutral-500">Панель администратора</p>
        </div>
      </UContainer>
    </header>

    <main>
      <UContainer class="max-w-5xl py-8">
        <slot />
      </UContainer>
    </main>
  </div>
</template>
