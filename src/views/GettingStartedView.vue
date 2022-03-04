<template>
  <div class="d-flex align-items-center justify-content-center h-75">
    <div class="getting-started-item text-center">
      <img :src="require('@/assets/logo.png')">
      <h1 id="getting-started-header">Tombo</h1>
    </div>
    <div class="getting-started-item">
      <router-view class="gs-form-view" name="GettingStartedForm" @connectionError="handleConnectionError"></router-view>
    </div>
  </div>
  <ToastRetry ref="toastRetry" @retryClick="handleRetryEvent">
    Couldn't connect to the server. Check your internet connection and try again
  </ToastRetry>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ToastRetry from '@/components/ToastRetry.vue'

export default defineComponent({
  components: { ToastRetry },
  setup () {
    const toastRetry = ref<InstanceType<typeof ToastRetry>>()
    const retryHandler = ref<() => Promise<void>>()

    const handleConnectionError = (retryAction: () => Promise<void>) => {
      retryHandler.value = retryAction
      toastRetry.value?.show()
    }

    const handleRetryEvent = () => {
      console.log(retryHandler.value)
      retryHandler.value && retryHandler.value()
      retryHandler.value = undefined
    }

    return { toastRetry, handleConnectionError, handleRetryEvent }
  }
})
</script>

<style>
  .gs-form-view {
    width: 100rem;
  }

  .getting-started-item {
    flex: 1;
  }
</style>
