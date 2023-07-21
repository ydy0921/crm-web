<template>
  <div class="container">
    <section class="page-404">
      <el-button size="mini"
                 @click="backToPrevPage"
                 type="primary">返回上一页</el-button>
    </section>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss" scoped>
.container {
  min-width: 564px;
  min-height: 472px;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}
.page-404 {
  position: relative;
  width: 563px;
  height: 472px;
  // background: #fff url('~@/app/styles/images/404.png') center center no-repeat;
  .el-button {
    position: absolute;
    left: 50%;
    width: 100px;
    height: 30px;
    margin-left: -50px;
    top: 80px;
  }
}
</style>
