import { defineStore } from "pinia";

export const useLayoutStore = defineStore("layoutStore", {
  state: () => {
    return {
      openedSubMenuParents: [] as string[],
    };
  },

  actions: {
    setOpenedSubMenuParents(list: string[]) {
      this.openedSubMenuParents = list;
    },
  },
});
