<script setup lang="ts">
import { ref } from "vue";
import type { FormInstance } from "element-plus";
import { useUserStore } from "@/stores/user";
import { useFormStore } from "@/stores/form";

const userStore = useUserStore();
const formStore = useFormStore();

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
  if (userStore.login.loginWay === "account") {
    const { username, password } = userStore.login;
    userStore.loginAction({ name: username, password });
  } else {
    const { mobile, security } = userStore.login;
    userStore.loginAction({ mobile, security });
  }
}

defineExpose({
  handleLogin
});
</script>

<template>
  <el-form :model="userStore.login" status-icon :rules="formStore.formRules" ref="ruleFormRef">
    <div v-if="userStore.login.loginWay === 'account'">
      <el-form-item label="账号" prop="username">
        <el-input v-model="userStore.login.username" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userStore.login.password" type="password" placeholder="请输入密码" />
      </el-form-item>
    </div>

    <div v-else-if="userStore.login.loginWay === 'phone'">
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="userStore.login.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item class="flex-box" label="验证码" prop="security">
        <el-input v-model="userStore.login.security" type="password" placeholder="请输入验证码" />
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
