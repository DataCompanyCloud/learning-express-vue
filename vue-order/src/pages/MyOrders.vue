<template>
  <div>
    <button
      type="button"
      class="btn btn-primary"
      @click="addItemToList"
    >
      Add Item
    </button>

    {{ orders }}
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, onMounted, Ref, ref } from 'vue'
import { OrderDTO } from '../dto/order.dto'
import UseAuth from '../reactive/useAuth'
import { OrderItem } from '../types/OrderItem'

export default defineComponent({
  setup () {
    const orders: Ref<OrderItem[]> = ref([])
    
    onMounted(async () => {
      orders.value = []
      try {
        const response = await axios.get<OrderDTO>('http://192.168.254.129:3005/get-my-orders', {
          headers: {
            Authorization: UseAuth.getToken() as string
          }
        })
        orders.value = response.data.data
      } catch (err: any) {
        alert('Internal Server Error')
      }
    })

    const addItemToList = () => {
      orders.value.push({
        id: 9999,
        id_seller: 99999,
        quantity: 1000,
        description: 'A beatifull ice-cream',
        total: 100000
      })
    }

    return {
      orders,
      addItemToList
    }
  }
})
</script>