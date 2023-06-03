<script setup lang="ts">
import { useRoute } from "vue-router";
import { usePageStore } from "@/stores/page";
import { useUserStore } from "@/stores/user";
import { computed } from "vue";

const pageStore = usePageStore();
const userStore = useUserStore();
const router = useRoute();
const bread = computed(() => {
  return pageStore.getBreadcrumb(router.path);
});
userStore.firstMenu = router;
</script>

<template>
  <el-breadcrumb separator="/">
    <template v-for="item in bread" :key="item.name">
      <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<style scoped lang="scss"></style>
