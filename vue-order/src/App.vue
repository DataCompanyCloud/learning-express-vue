<template>
    <router-view />
    <toast-controller />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ToastController from './components/core/ToastController.vue'
export default defineComponent({
  components: { ToastController },
  setup () { },
})
</script>
