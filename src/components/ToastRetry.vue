<template>
  <div class="position-absolute bottom-0 start-50 translate-middle-x mb-4">
    <div ref="toastElem" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-body">
        {{ innerText }}
        <div class="mt-2 pt-2 border-top">
          <button type="button" class="btn btn-secondary btn-sm m-1" data-bs-dismiss="toast">Close</button>
          <button type="button" class="btn btn-primary btn-sm mr-1" @click.stop="retryClickHandler">Retry</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeUnmount, onMounted } from 'vue'
import { Toast } from 'bootstrap'

export default defineComponent({
  props: ['innerText', 'retryAction'],
  setup (props) {
    const toastElem = ref(null)
    const show = () => {
      if (toastElem.value) {
        Toast.getInstance(toastElem.value)?.show()
      }
    }
    const retryClickHandler = () => {
      props.retryAction()
      if (toastElem.value) {
        Toast.getInstance(toastElem.value)?.hide()
      }
    }

    onMounted(() => {
      if (toastElem.value) {
        Toast.getOrCreateInstance(toastElem.value)
      }
    })

    onBeforeUnmount(() => {
      if (toastElem.value) {
        Toast.getInstance(toastElem.value)?.dispose()
      }
    })

    return { toastElem, show, retryClickHandler }
  }
})
</script>
