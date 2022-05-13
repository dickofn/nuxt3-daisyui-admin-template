<template>
  <li class="mb-4 last:mb-0">
    <template v-if="!menu.subItems">
      <NuxtLink
        @click="onLinkClick(menu)"
        :to="menu.link"
        :class="{ active: isActive }"
      >
        <component :is="icon" class="h-4 w-4" />
        <span>{{ menu.label }}</span>
      </NuxtLink>
    </template>

    <template v-else>
      <button
        type="button"
        @click="toggleCollapse"
        :class="{ active: isActive }"
      >
        <component :is="icon" class="h-4 w-4" />
        <span class="flex-1 whitespace-nowrap text-left">
          {{ menu.label }}
        </span>
        <label class="swap-rotate swap">
          <input
            type="checkbox"
            v-model="isCollapsed"
            @click="toggleCollapse"
          />
          <ChevronDownIcon class="swap-on h-4 w-4" />
          <ChevronUpIcon class="swap-off h-4 w-4" />
        </label>
      </button>

      <transition
        enter-active-class="transition ease-out duration-150"
        enter-from-class="transform opacity-0 -translate-y-3"
        enter-to-class="transform opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="transform opacity-100 translate-y-0"
        leave-to-class="transform opacity-0 -translate-y-2"
      >
        <ul v-if="!isCollapsed" class="relative left-0 block space-y-2 py-2">
          <li v-for="subMenu in menu.subItems" :key="subMenu.link">
            <NuxtLink
              @click="onLinkClick(subMenu)"
              :to="subMenu.link"
              class="group flex w-full items-center rounded-lg p-2 pl-11"
              :class="{ active: isActiveSubmenu(subMenu.link) }"
            >
              {{ subMenu.label }}
            </NuxtLink>
          </li>
        </ul>
      </transition>
    </template>
  </li>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/outline";
import { TemplateIcon, ArchiveIcon } from "@heroicons/vue/solid";

import { Menu } from "~~/types/layout";

import { storeToRefs } from "pinia";
import { useLayoutStore } from "~~/store/layout";

const props = defineProps({
  menu: {
    type: Object as PropType<Menu>,
    required: true,
  },
});

const icon = computed(() => {
  switch (props.menu.icon) {
    case "TemplateIcon":
      return TemplateIcon;
    case "ArchiveIcon":
      return ArchiveIcon;
    default:
      return TemplateIcon;
  }
});

const route = useRoute();
const isActive = computed(() => {
  if (!props.menu.subItems) {
    return route.path === props.menu.link;
  }

  let check: boolean = false;
  props.menu.subItems.forEach((subMenu) => {
    if (route.path === subMenu.link) {
      check = true;
    }
  });

  return check;
});

function isActiveSubmenu(link: string) {
  return route.path === link;
}

const layoutStore = useLayoutStore();
const { openedSubMenuParents } = storeToRefs(layoutStore);

const isCollapsed = computed(() => {
  return !openedSubMenuParents.value.includes(props.menu.label);
});

function toggleCollapse() {
  if (openedSubMenuParents.value.includes(props.menu.label)) {
    const filtered = openedSubMenuParents.value.filter(
      (item) => item !== props.menu.label
    );
    layoutStore.setOpenedSubMenuParents(filtered);
  } else {
    const added = [...openedSubMenuParents.value, props.menu.label];
    layoutStore.setOpenedSubMenuParents(added);
  }
}

const emits = defineEmits<{
  (event: "click", menu: Menu): void;
}>();

function onLinkClick(menu: Menu) {
  emits("click", menu);
}
</script>
