<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 bg-light">
    <a href="/" class="d-flex justify-content-center align-items-center link-dark text-decoration-none">
      <span class="fs-4 fw-light">ORDER-APP</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li
        v-for="item in sideBarItems"
        :key="item.routeName"
        class="nav-item"
      >
        <a
          class="nav-link d-flex justify-content-between align-items-center pointer"
          role="button"
          :class="item.isActive ? 'active' : ''"
          aria-current="page"
          data-bs-toggle="offcanvas"
          :href="parentSlideId"
          @click="onMenuClick(item)"
        >
          <div>
            <font-awesome-icon :icon="item.icon" />
            <span
              class="ms-3"
            >
              {{ item.title }}
            </span>
          </div>
        </a>
      </li>
    </ul>
    <hr>
    <button
      class="btn btn-primary"
      data-bs-toggle="modal" 
      data-bs-target="#modal-logout"
    >
      Logout
    </button>    
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, ref, Ref } from 'vue'
import router from '../../router'
import { SidebarItem } from '../../types/SidebarItem'
import { useRoute } from 'vue-router'
import DefinedRoutes from '../../router/defined-routes'
import useAuth from '../../reactive/useAuth'

export default defineComponent({
  props: {
    parentSlideId: {
      type: String,
      default: ''
    }
  },
  emits: ['onMenuClick'],
  setup(prop, { emit }) {
    // @ts-ignore
    const sideBarItems: Ref<SidebarItem[]> = ref([
      {
        routeName: DefinedRoutes.MyOrders,
        title: 'Meus Pedidos',
        icon: 'fa-cart-shopping',
        isActive: computed(() => useRoute().name ===  DefinedRoutes.MyOrders),
        handleClick: () => {
          router.push({ name: DefinedRoutes.MyOrders })
        }
      },
      {
        routeName: DefinedRoutes.CreateOrder,
        title: 'Fazer Pedido',
        icon: 'fa-circle-plus',
        isActive: computed(() => useRoute().name ===  DefinedRoutes.CreateOrder),
        handleClick: () => {
          router.push({ name: DefinedRoutes.CreateOrder })
        }
      },
    ])

    const onMenuClick = (item: SidebarItem) => {
      item.handleClick()
      emit('onMenuClick', item)
    }

    const handleLogout = () => {
      try {
        useAuth.logout()
      } finally {
        router.push('login')
      }
    }

    return {
      onMenuClick,
      sideBarItems,
      routeName: computed(() => useRoute().name),
      handleLogout,
    }
  },
})
</script>

<style scoped>
  .bounce-enter-active {
    animation: bounce-in 0.5s;
  }
  .bounce-leave-active {
    animation: bounce-in 0.5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.25);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
