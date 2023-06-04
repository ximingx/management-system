<script setup lang="ts"></script>

<template>
  <el-dialog
    v-model="userSystemStore.dialog.show"
    title="用户信息"
    width="30%"
    center
    :show-close="false"
  >
    <el-form v-model="userSystemStore.dialog.form">
      <el-form-item label="用户昵称" prop="name">
        <el-input v-model="userSystemStore.dialog.form.name"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realname">
        <el-input v-model="userSystemStore.dialog.form.realname"></el-input>
      </el-form-item>
      <el-form-item v-if="!userSystemStore.dialog.edit" label="登录密码" prop="password">
        <el-input v-model="userSystemStore.dialog.form.password"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="cellphone">
        <el-input v-model="userSystemStore.dialog.form.cellphone"></el-input>
      </el-form-item>
      <el-form-item label="选择角色" prop="roleId">
        <el-select v-model="userSystemStore.dialog.form.roleId">
          <template v-for="item in userSystemStore.entireRole.list" :key="item.id">
            <el-option :label="item.name" :value="item.id"></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="选择部门" prop="departmentID">
        <el-select v-model="userSystemStore.dialog.form.departmentId">
          <template v-for="item in userSystemStore.entireDepartment.list" :key="item.id">
            <el-option :label="item.name" :value="item.id"></el-option>
          </template>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="flex-box flex-center">
      <el-button @click="userSystemStore.noAddUserAction">取消</el-button>
      <el-button @click="userSystemStore.addUserAction">执行</el-button>
    </div>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
