<script setup lang="ts">
import { useRoute } from "vue-router";
import { usePageStore } from "@/stores/main/page";
import { useGlobalStore } from "@/stores/global";
import { computed } from "vue";

const pageStore = usePageStore();
const globalStore = useGlobalStore();
const router = useRoute();
const bread = computed(() => {
  return pageStore.getBreadcrumb(router.path);
});
globalStore.firstMenu = router;
</script>

<template>
  <el-breadcrumb separator="/">
    <template v-for="item in bread" :key="item.name">
      <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<style scoped lang="scss"></style>
