<template>
  <div
    ref="toastContainerRef"
    class="toast-container position-fixed bottom-0 end-0 p-3"
  >
    <!--div ref="toastRef" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="me-auto">Bootstrap</strong>
        <small class="text-muted">just now</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        See? Just like this.
      </div>
    </div>

    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="me-auto">Bootstrap</strong>
        <small class="text-muted">2 seconds ago</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        Heads up, toasts will stack automatically
      </div>
    </div-->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue'
import bootstrap from '../../bootstrap'

export default defineComponent({
  setup: () => {
    const toastContainerRef = ref(null) as Ref<any>

    onMounted(() => {
        /*
        console.log('teste')
        const toast = new bootstrap.Toast(toastRef.value)
        toast.show()
        */
    })

    return {
      toastContainerRef
    }
  }
})
</script>