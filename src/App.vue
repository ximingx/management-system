<script lang="ts" setup="">
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <router-view />
  </ElConfigProvider>
</template>
