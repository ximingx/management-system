<script setup lang="ts">
import Dialog from "@/components/CommonSystem/Dialog.vue";
import Pagination from "@/components/CommonSystem/Pagination.vue";
import Search from "@/components/CommonSystem/Search.vue";
import Table from "@/components/CommonSystem/Table.vue";
</script>

<template>
  <div class="system">
    <Dialog />
    <Pagination />
    <Search />
    <Table />
  </div>
</template>

<style lang="scss">
.flex-box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.flex-center {
  justify-content: center;
}

:deep(.el-card__header) {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.el-table__cell) {
  padding: 20px 0;
}

:deep(.el-pagination) {
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
