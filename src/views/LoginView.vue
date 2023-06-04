<script lang="ts" setup>
import { ref } from "vue";
import { User, Comment } from "@element-plus/icons-vue";
import LoginForm from "@/views/LoginView/LoginForm.vue";
import { useLoginStore } from "@/stores/login/login";

const loginStore = useLoginStore();

const accountRef = ref();
const phoneRef = ref();

function handleLogin() {
  if (loginStore.loginWay === "account") {
    accountRef.value.handleLogin();
  } else {
    phoneRef.value.handleLogin();
  }
}
</script>

<template>
  <div class="login-box">
    <div class="login-form">
      <div class="login-title">后台管理系统</div>

      <el-tabs type="border-card" v-model="loginStore.loginWay" stretch>
        <el-tab-pane name="account">
          <template #label>
            <el-icon><User /></el-icon>
            <div>账号登录</div>
          </template>
          <LoginForm loginWay="account" ref="accountRef" />
        </el-tab-pane>

        <el-tab-pane name="phone">
          <template #label>
            <el-icon><Comment /></el-icon>
            <div>手机号登录</div>
          </template>
          <LoginForm loginWay="phone" ref="phoneRef" />
        </el-tab-pane>
      </el-tabs>

      <div class="login-controls">
        <el-checkbox v-model="loginStore.remember" label="记住密码" />
        <span class="control-item">忘记密码</span>
      </div>

      <el-button class="login-button" plain @click="handleLogin">登陆</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/css/main.scss";
.login-box {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  width: 400px;
  min-width: 22vw;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  font-size: $large-size;
  padding: 20px;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .login-title {
    font-size: $extra-large-size;
    text-align: center;
    margin-bottom: 20px;
  }

  // tab样式
  :deep(.el-tabs__item) {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .login-controls {
    font-size: $small-size;
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    // 记住密码字体大小不一致
    :deep(.el-checkbox__label) {
      font-size: $small-size;
    }
  }

  .login-button {
    box-sizing: border-box;
  }
}
</style>
