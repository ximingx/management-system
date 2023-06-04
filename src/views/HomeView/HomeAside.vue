<script setup lang="ts">
import { House, Monitor, Setting, Goods, ChatSquare } from "@element-plus/icons-vue";
import { useGlobalStore } from "@/stores/global";
import { usePageStore } from "@/stores/main/page";

const globalStore = useGlobalStore();
const pageStore = usePageStore();
const icons = [House, Monitor, Setting, Goods, ChatSquare];
</script>

<template>
  <div class="aside-container">
    <el-menu
      :default-active="globalStore.firstMenu.path"
      :collapse="pageStore.aside.collapse"
      :collapse-transition="false"
      unique-opened
      router
    >
      <template v-for="item in globalStore.menu" :key="item.id">
        <el-sub-menu :index="item.url">
          <template #title>
            <el-icon>
              <!--<component :is="item.icon.split('-icon-')[1]" />-->
              <!-- 动态引入图标 -->
              <template v-if="item.icon?.split('-icon-')[1] == 'monitor'">
                <component :is="icons[1]"></component>
              </template>
              <template v-else-if="item.icon?.split('-icon-')[1] == 'setting'">
                <component :is="icons[2]"></component>
              </template>
              <template v-else-if="item.icon?.split('-icon-')[1] == 'goods'">
                <component :is="icons[3]"></component>
              </template>
              <template v-else-if="item.icon?.split('-icon-')[1] == 'chat-line-round'">
                <component :is="icons[4]"></component>
              </template>
              <template v-else>
                <component :is="icons[4]"></component>
              </template>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="subItem in item.children" :key="subItem.id + ''">
            <el-menu-item :index="subItem.url">
              <template #title>
                <span>{{ subItem.name }}</span>
              </template>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.aside-container {
  height: 100vh;

  &::-webkit-scrollbar {
    width: 0;
  }

  .el-menu {
    height: 100%;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 0;
    }
  }
}
</style>
