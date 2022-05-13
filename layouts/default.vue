<template>
  <div class="drawer-mobile drawer">
    <LayoutSidebar :menus="menus" />

    <div class="drawer-content">
      <LayoutHeader />

      <!-- Page content -->
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Menu } from "~~/types/layout";

const menus = reactive<Menu[]>([
  {
    id: 1,
    label: "Dashboard",
    name: "dashboard",
    icon: "TemplateIcon",
    link: "/dashboard",
    role: "employee",
  },
  {
    id: 2,
    label: "Menu",
    name: "menu",
    icon: "ArchiveIcon",
    role: "main",
    subItems: [
      {
        label: "Parent Menu",
        link: "/menu",
      },
      {
        label: "Sub Menu",
        link: "/menu/submenu",
      },
    ],
  },
]);
</script>
