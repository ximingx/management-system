<script setup lang="ts">
import { Message, MuteNotification, CircleClose, User } from "@element-plus/icons-vue";
import { usePageStore } from "@/stores/page";
import { useUserStore } from "@/stores/user";
const pageStore = usePageStore();
const userStore = useUserStore();
</script>

<template>
  <div class="info-box">
    <el-icon :size="pageStore.header.iconSize">
      <Message />
    </el-icon>
    <el-icon :size="pageStore.header.iconSize">
      <MuteNotification />
    </el-icon>
    <el-dropdown>
      <div class="user-info">
        <el-avatar
          shape="square"
          :size="pageStore.header.avatarSize"
          :src="pageStore.header.avatar"
          alt="avatar"
        />
        <div>{{ userStore.info.name }}</div>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-icon :size="pageStore.header.smallIconSize"><User /></el-icon>
            <span>个人中心</span>
          </el-dropdown-item>
          <el-dropdown-item @click="userStore.exitAction">
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
    margin: 0 10px 0 0;
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
