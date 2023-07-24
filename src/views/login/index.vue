<template>
  <el-container class="crm-login-view">
    <section class="login-view-left"></section>
    <section class="login-view-right">
      <el-button @click="onLogin">登录</el-button>
    </section>
  </el-container>
</template>

<script src="./index.ts"></script>

<style lang="scss" scoped>
.crm-login-view {
  display: flex;
  height: 100%;
  min-height: 600px;
  padding: 20px;
  border-radius: 24px;
  overflow: hidden;

  section {
    width: 50%;
  }

  .login-view-left {
    min-width: 460px;
    border-radius: 24px 0 0 24px;
    background: #3f8cff;
  }
  .login-view-right {
    min-width: 680px;
    border-radius: 0 24px 24px 0;
    background: #ffffff;
  }
}
</style>
