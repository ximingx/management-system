<script setup lang="ts">
import {
  Message,
  MuteNotification,
  CircleClose,
  User,
  Sunny,
  Setting
} from "@element-plus/icons-vue";
import { usePageStore } from "@/stores/main/page";
import { useLoginStore } from "@/stores/login/login";

const pageStore = usePageStore();
const loginStore = useLoginStore();
</script>

<template>
  <div class="info-box">
    <el-icon :size="pageStore.header.iconSize">
      <Message />
    </el-icon>
    <el-icon :size="pageStore.header.iconSize">
      <MuteNotification />
    </el-icon>
    <el-icon :size="pageStore.header.iconSize">
      <Sunny />
    </el-icon>
    <el-dropdown>
      <el-icon :size="pageStore.header.iconSize"><Setting /></el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-icon :size="pageStore.header.smallIconSize"><User /></el-icon>
            <span>个人中心</span>
          </el-dropdown-item>
          <el-dropdown-item @click="loginStore.exitAction">
            <el-icon :size="pageStore.header.smallIconSize"><CircleClose /></el-icon>
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss">
.info-box {
  display: flex;
  align-items: center;

  .el-icon {
    margin: 0 20px 0 0;
  }

  .user-info {
    display: flex;
    align-items: center;

    .el-avatar {
      margin: 0 5px 0 0;
    }
  }
}
</style>
