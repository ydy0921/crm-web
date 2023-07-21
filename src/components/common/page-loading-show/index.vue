<template>
  <div v-loading="customControl.loading"
       class="comp-page-loading">
    <section v-show="!customControl.loading">
      <section v-show="customControl.showPage">
        <slot />
      </section>
      <section v-show="!customControl.showPage">
        <slot name="empty">
          <!-- 默认空态 -->
        </slot>
      </section>
      <template>
        <!-- visible控制;不受空态遮盖的组件位置(如dialog等) -->
        <slot name="other" />
      </template>
    </section>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" scoped>
.comp-page-loading {
  flex: 1;
  height: 100%;
}
</style>