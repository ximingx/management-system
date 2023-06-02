import { defineStore } from "pinia";

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
      main: {}
    };
  },
  actions: {
    toggleCollapse() {
      this.aside.collapse = !this.aside.collapse;
      this.aside.asideWidth = this.aside.collapse ? this.aside.width : this.aside.expandWidth;
    }
  }
});
