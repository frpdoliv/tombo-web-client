<template>
  <div class="d-flex align-items-center justify-content-center h-75">
    <div class="getting-started-item text-center">
      <img :src="require('@/assets/logo.png')">
      <h1 id="getting-started-header">Tombo</h1>
    </div>
    <div class="getting-started-item">
      <router-view class="gs-form-view" name="GettingStartedForm"></router-view>
    </div>
  </div>
</template>

<style>
  .gs-form-view {
    width: 100rem;
  }

  .getting-started-item {
    flex: 1;
  }
</style>
