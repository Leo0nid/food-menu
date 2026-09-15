<template>
  <div class="min-h-dvh bg-neutral-100 text-black antialiased md:flex">
    <AdminNavbar />

    <main class="min-w-0 flex-1 py-6">
      <div class="w-full px-4 xl:px-6">
        <slot />
      </div>
    </main>
  </div>
</template>
