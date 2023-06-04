<script setup lang="ts">
import HomeAside from "./HomeView/HomeAside.vue";
import HomeHeader from "./HomeView/HomeHeader.vue";
import HomeMain from "./HomeView/HomeMain.vue";
import { usePageStore } from "@/stores/main/page";
const pageStore = usePageStore();
</script>

<template>
  <el-container class="main-container">
    <el-aside :style="{ width: pageStore.aside.asideWidth + 'px' }">
      <HomeAside />
    </el-aside>
    <el-container>
      <el-header>
        <HomeHeader />
      </el-header>
      <el-main>
        <HomeMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.main-container {
  height: 100vh;
  width: 100vw;

  .el-header {
    height: 60px;
    display: flex;
  }
}
</style>
