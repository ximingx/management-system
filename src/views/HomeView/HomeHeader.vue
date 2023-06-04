<script setup lang="ts">
import HeaderInfo from "./HeaderSection/HeaderInfo.vue";
import HeaderBread from "./HeaderSection/HeaderBread.vue";
import { Fold, Expand } from "@element-plus/icons-vue";
import { usePageStore } from "@/stores/main/page";
const pageStore = usePageStore();
</script>

<template>
  <div class="header-box">
    <el-icon :size="pageStore.header.iconSize" @click="pageStore.toggleCollapse">
      <component :is="pageStore.aside.collapse ? Expand : Fold" />
    </el-icon>
    <div class="header-main">
      <HeaderBread />
      <HeaderInfo />
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-box {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header-main {
    margin-left: 20px;
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
}
</style>
