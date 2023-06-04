<script setup lang="ts">
import { formatUTC } from "@/utils/day";
</script>

<template>
  <el-card>
    <template #header>
      <span>用户管理</span>
      <el-button @click="userSystemStore.addAction">新建用户</el-button>
    </template>
    <el-table style="width: 100%" :data="userSystemStore.userList">
      <el-table-column align="center" type="selection" width="100" />
      <el-table-column align="center" type="index" label="序号" width="100" />
      <el-table-column align="center" prop="id" label="id" sortable width="100"></el-table-column>
      <el-table-column align="center" prop="name" label="昵称" width="100"></el-table-column>
      <el-table-column
        align="center"
        prop="realname"
        label="真实姓名"
        width="100"
      ></el-table-column>
      <el-table-column align="center" prop="cellphone" label="手机号码"></el-table-column>
      <el-table-column align="center" prop="departmentId" label="部门id"></el-table-column>
      <el-table-column align="center" prop="roleId" label="权限id"></el-table-column>
      <el-table-column align="center" prop="createAt" label="创建时间" sortable>
        <template #default="scope">
          {{ formatUTC(scope.row.createAt) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updateAt" label="更新时间" sortable>
        <template #default="scope">
          {{ formatUTC(scope.row.updateAt) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="enable" label="状态" width="100" fixed="right">
        <template #default="scope">
          <el-button link>
            {{ scope.row.enable === 1 ? "正常" : "禁用" }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="140">
        <template #default="scope">
          <el-button link @click="userSystemStore.deleteUserAction(scope.row.id)">删除</el-button>
          <el-button link @click="userSystemStore.handleEdit(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style scoped lang="scss"></style>
