<script setup lang="ts">
import { ref } from "vue";
import type { FormInstance } from "element-plus";

import { useFormVerifyStore } from "@/stores/login/form";
import { useLoginStore } from "@/stores/login/login";

const loginStore = useLoginStore();
const formStore = useFormVerifyStore();

const ruleFormRef = ref<FormInstance>();
function handleLogin() {
  ruleFormRef.value?.validate((valid) => {
    if (valid) {
      login();
    } else {
      ElMessage.error("表单验证失败");
      return false;
    }
  });
}

function login() {
  if (loginStore.loginWay === "account") {
    loginStore.loginAction({ name: loginStore.username, password: loginStore.password });
  } else {
    loginStore.loginAction({ cellphone: loginStore.cellphone, security: loginStore.security });
  }
}

defineExpose({
  handleLogin
});
</script>

<template>
  <el-form :model="loginStore" status-icon :rules="formStore.defaultRules" ref="ruleFormRef">
    <div v-if="loginStore.loginWay === 'account'">
      <el-form-item label="账号" prop="username">
        <el-input v-model="loginStore.username" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginStore.password" type="password" placeholder="请输入密码" />
      </el-form-item>
    </div>

    <div v-else-if="loginStore.loginWay === 'phone'">
      <el-form-item label="手机号" prop="cellphone">
        <el-input v-model="loginStore.cellphone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item class="flex-box" label="验证码" prop="security">
        <el-input v-model="loginStore.security" type="password" placeholder="请输入验证码" />
        <el-button>获取验证码</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<style scoped lang="scss">
:deep(.el-input__icon) {
  color: green;
}

.flex-box {
  display: flex;

  .el-input {
    flex: 1;
  }
}
</style>
