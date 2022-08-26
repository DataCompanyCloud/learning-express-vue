<template>
  <div
    class="d-flex flex-column vh-100"
  >
    <div
      class="flex-grow-1 d-flex justify-content-center align-items-center"
    >
      <div
        class="col-12 col-md-6 col-lg-5 col-xl-3 shadow-lg p-4 bg-light"
      >
        <div class="mb-3">
          <label
            for="exampleInputEmail1"
            class="form-label"
          >
            E-mail
          </label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          >
        </div>
        <div class="mb-3">
          <label
            for="exampleInputPassword1"
            class="form-label"
          >
            Senha
          </label>

          <input
            v-model="password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          >
        </div>

        <div
          class="col-12 d-flex flex-row-reverse"
        >
          <button
            type="submit"
            class="btn btn-primary"
            @click="handleLoginButton"
          >
            <div
              v-if="loading"
              class="spinner-border spinner-border-sm"
            />
            Entrar
          </button>
        </div>
      </div>
    </div>

    <footer>
      <p class="text-center text-muted">© 2022 Data Company Sistemas</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { LoginDTO } from '../dto/login.dto'
import axios, { AxiosError } from 'axios'
import UseAuth from '../reactive/useAuth'
import router from '../router/index'
import Toast from '../components/core/ToastController.vue'
import DefinedRoutes from '../router/defined-routes'

export default defineComponent({
  components: { Toast },
  setup () {
    const email = ref('') 
    const password = ref('')
    const loading = ref(false)

    const handleLoginButton = async () => {
      loading.value = true
      try {
        const response = await axios.post<LoginDTO>('http://localhost:3005/login-seller', {
          email: email.value,
          password: password.value
        })
        UseAuth.setToken(response.data.token)
        router.push({ name: DefinedRoutes.MyOrders })
      } catch (err: any) {
        if (axios.isAxiosError(err)) {
          const errObj = err.response?.data as any
          if (errObj) {
            return alert(errObj.message ?? 'Internal server error')
          }
          return alert('Internal server error')
        }
        alert('Internal server error')
      } finally {
        loading.value = false
      }
    }

    return {
      handleLoginButton,
      loading,
      email,
      password
    }
  }
})
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
