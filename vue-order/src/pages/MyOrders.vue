<template>
  <div>
    <button
      type="button"
      class="btn btn-primary"
      @click="addItemToList"
    >
      Add Item
    </button>

    <ol class="list-group list-group-numbered m-5">
      <div 
        v-for="order in orders" 
        :key="order.id">
        <li class="list-group-item d-flex flex-column font-monospace">
          <div class="fs-6"> #{{ order.id }} </div>
          <div class="flex-grow-1 d-flex justify-content-between">
            <div> {{ order.description }}</div>
            <div class="d-flex">
              <div class="me-3 text-left"> {{ order.quantity }} </div>
              <div> R$ {{ order.total}} </div>
            </div>
          </div>          
        </li>
      </div>
    </ol>

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