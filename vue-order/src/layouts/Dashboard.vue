<template>
  <div
    class="main-layout d-flex"
  >
    <side-bar
      style="width: 280px"
    />
    <div
      class="flex-grow-1 d-flex flex-column"
    >
      <nav class="navbar bg-light">
        <div class="container-fluid">
          <span class="navbar-brand">
            Vue Order App
          </span>
        </div>
      </nav>
      <div
        class="flex-grow-1 overflow-auto"
      >
        <router-view v-slot="{ Component }">
          <transition>
            <KeepAlive>
              <component :is="Component" />
            </KeepAlive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Toast from '../components/core/ToastController.vue'
import SideBar from '../components/core/SideBar.vue'
import Login from '../pages/Login.vue'
import useAuth from '../reactive/useAuth'
import router from '../router'
  
export default defineComponent({
  components: { Login, Toast, SideBar },
  setup () {
    const handleLogout = () => {
      try {
        useAuth.logout()
      } finally {
        router.push('login')
      }
    }

    return {
      isLoggedIn: useAuth.isLoggedIn,
      handleLogout
    }
  },
})
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
</script>

<style>
  .main-layout {
    width: 100vw;
    height: 100vh;
    min-width: 768px;
    overflow-x: scroll
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .route-enter-from {
    opacity: 0; 
    transform: translateX(100px);
  }

  .route-enter-active {
    transition: ass 0.3 ease-out;
  }

  .route-leave-to {
    opacity: 0;
    transform: translateX(-100px);
  }

  .route-leave-active {
    transition: all 0.3s ease-in;
  }
</style>