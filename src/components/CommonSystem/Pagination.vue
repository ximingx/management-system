<script setup lang="ts"></script>

<template>
  <el-pagination
    v-model:current-page="userSystemStore.currentPage"
    v-model:page-size="userSystemStore.pageSize"
    :page-sizes="[3, 5, 10, 25, 50, 100]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="userSystemStore.totalCount"
    @size-change="userSystemStore.handleSizeChange"
    @current-change="userSystemStore.handleCurrentChange"
  />
</template>

<style scoped lang="scss"></style>
