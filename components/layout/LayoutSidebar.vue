<template>
  <!-- Rootless component -->
  <!-- See: v3-migration.vuejs.org/new/fragments.html  -->
  <input id="sidebar" type="checkbox" class="drawer-toggle" v-model="isOpen" />
  <div v-bind="$attrs" class="drawer-side">
    <label for="sidebar" class="drawer-overlay z-10"></label>
    <ul
      class="no-scrollbar menu w-72 overflow-y-auto bg-neutral p-4 text-white"
    >
      <LayoutSidebarMenuItem
        v-for="menu in menus"
        :key="menu.label"
        :menu="menu"
        @click="onMenuClick"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

import { Menu } from "~~/types/layout";

import { storeToRefs } from "pinia";
import { useLayoutStore } from "~~/store/layout";

const props = defineProps({
  menus: {
    type: Array as PropType<Menu[]>,
    required: true,
  },
});

const isOpen = ref(false);

const layoutStore = useLayoutStore();
const { openedSubMenuParents } = storeToRefs(layoutStore);

function onMenuClick(menuPayload: Menu) {
  let parent: string = "";

  props.menus.forEach((menu) => {
    if (menu.subItems) {
      menu.subItems.forEach((subMenu) => {
        if (subMenu.link === menuPayload.link) {
          parent = menu.label;
        }
      });
    }
  });

  const leftOpenedParent = openedSubMenuParents.value.filter(
    (item) => item === parent
  );
  layoutStore.setOpenedSubMenuParents(leftOpenedParent);

  isOpen.value = false;
}
</script>
