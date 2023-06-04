import { defineStore } from "pinia";
import { useGlobalStore } from "@/stores/global";

export const usePageStore = defineStore("page", {
  state: () => {
    return {
      aside: {
        collapse: true,
        width: 60,
        expandWidth: 200,
        asideWidth: 60
      },
      header: {
        iconSize: "18px",
        smallIconSize: "12px"
      }
    };
  },
  actions: {
    toggleCollapse() {
      this.aside.collapse = !this.aside.collapse;
      this.aside.asideWidth = this.aside.collapse ? this.aside.width : this.aside.expandWidth;
    },
    getBreadcrumb(path: any) {
      const globalStore = useGlobalStore();
      const menu: any = globalStore.menu;
      const breadcrumb = [];
      for (const item of menu) {
        for (const subMenu of (item as any).children) {
          if (subMenu.url === path) {
            breadcrumb.push({
              name: item.name
            });
            breadcrumb.push({
              name: subMenu.name,
              path: subMenu.url
            });
            return breadcrumb;
          }
        }
      }
    }
  }
});
