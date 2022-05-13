<template>
  <header class="navbar bg-base-100">
    <div class="flex-none">
      <label for="sidebar" class="btn btn-ghost btn-square mr-2 lg:hidden">
        <MenuIcon class="h-5 w-5" />
      </label>
    </div>
    <div class="flex-1">
      <div class="breadcrumbs text-sm">
        <ul>
          <li
            v-for="breadcrumb in breadcrumbs"
            :key="breadcrumb.label"
            class="capitalize"
          >
            <NuxtLink :to="breadcrumb.path">
              {{ breadcrumb.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex-none">
      <button>
        <UserCircleIcon class="h-5 w-5" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { UserCircleIcon, MenuIcon } from "@heroicons/vue/outline";

import { Breadcrumb } from "~~/types/layout";

const route = useRoute();

const path = computed<string>(() => route.path);

const breadcrumbs = computed<Breadcrumb[]>(() => {
  const splitted = path.value.split("/").filter((i) => !!i);

  return splitted.map((i) => ({
    label: i.replace(/-/g, " "),
    path: (() => {
      let path: string = "";
      const endOfIndex: number = splitted.indexOf(i) + 1;

      for (let j = 0; j < endOfIndex; j++) {
        path += `/${splitted[j]}`;
      }

      return path;
    })(),
  }));
});
</script>
