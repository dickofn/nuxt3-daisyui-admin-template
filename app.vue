<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { themeChange } from "theme-change";

// Update html <head />
useHead({
  title: "Dashboard",
  titleTemplate: "%s | NuxtJS x DaisyUI",
  meta: [
    {
      name: "description",
      content:
        "Hello! I'm Dicko Finus, I'm your friendly neighbourhood programmer",
    },
  ],
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
  ],
});

// Theme change required settings ref: https://github.com/saadeghi/theme-change
onMounted(() => {
  themeChange(false);
});

// Check default theme
if (process.client) {
  const storedTheme = localStorage.getItem("theme");
  if (!storedTheme) localStorage.setItem("theme", "inft");
}
</script>

<style>
html {
  @apply h-full bg-white text-black;
}
body {
  @apply h-full bg-white text-black;
}
</style>
