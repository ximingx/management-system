import { defineStore } from "pinia";
import { useUserStore } from "./user";

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
        smallIconSize: "12px",
        avatarSize: 25,
        avatar:
          "https://tse3-mm.cn.bing.net/th/id/OIP-C.-spcVjHPu5cNr2NQodNOfQAAAA?w=204&h=204&c=7&r=0&o=5&dpr=2&pid=1.7"
      },
      main: {},
      router: {}
    };
  },
  actions: {
    toggleCollapse() {
      this.aside.collapse = !this.aside.collapse;
      this.aside.asideWidth = this.aside.collapse ? this.aside.width : this.aside.expandWidth;
    },
    getBreadcrumb(path: any) {
      const userStore = useUserStore();
      const menu: any = userStore.menu;
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
