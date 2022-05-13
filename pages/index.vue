<template>
  <div class="flex min-h-screen items-center justify-center p-2">
    <div class="p-2">
      <div class="mx-auto w-full">
        <img
          class="mx-auto mb-4 h-24 w-auto"
          src="~/assets/images/logo--dark.png"
          alt="Logo"
        />

        <div class="text-center">
          <div class="font-bold">Hello! I'm Dicko Finus.</div>
          <div class="text-sm">I'm your friendly neighbourhood programmer</div>
        </div>

        <AuthLoginForm @submit="login" />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "clean",
});

function login({ email, password }) {
  console.log("[LOG] | login | email, password", email, password);
  return { email, password };
}
</script>
