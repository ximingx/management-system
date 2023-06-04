<script setup lang="ts">
import { Refresh, Search } from "@element-plus/icons-vue";
</script>

<template>
  <el-card>
    <template #header>
      <span>搜索</span>
    </template>
    <el-form :model="userSystemStore.searchForm" ref="formRef">
      <el-row :gutter="24" justify="space-between">
        <el-col :span="8">
          <el-form-item label="用户昵称" prop="name">
            <el-input v-model="userSystemStore.searchForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="userSystemStore.searchForm.realname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话号码" prop="cellphone">
            <el-input v-model="userSystemStore.searchForm.cellphone"></el-input> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item label="个人状态" prop="enable">
            <el-select v-model="userSystemStore.searchForm.enable" placeholder="选择查询状态">
              <el-option label="正常" :value="1"></el-option>
              <el-option label="禁用" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8"
          ><el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="userSystemStore.searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            /> </el-form-item
        ></el-col>
        <el-col :span="8"></el-col>
      </el-row>
      <div class="flex-box">
        <el-button :icon="Refresh" @click="userSystemStore.resetSearchForm(formRef)"
          >重置</el-button
        >
        <el-button :icon="Search" @click="userSystemStore.getUserListAction">查询</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<style scoped lang="scss"></style>
