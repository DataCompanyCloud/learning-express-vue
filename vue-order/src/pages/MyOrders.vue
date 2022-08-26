<template>
  <div class="p-5">
    <div class="mb-3">
      <button
        type="button"
        class="btn btn-primary"
        @click="addItemToList(0)"
      >
        Add Item
      </button>
    </div>

    <ol class="list-group list-group-numbered">
      <div 
        v-for="order in orders" 
        :key="order.id">
        <li class="list-group-item d-flex flex-column"> 
          <div class="fs-6"> #{{ order.id }} </div>
          <div class="flex-grow-1 row justify-content-between">
            <div class="col-6 col-md-7 col-lg-9"> {{ order.description }}</div>
            <div class="col-6 col-md-5 col-lg-3 col-xl-2 d-flex">
              <div class="flex-grow-1 me-3 text-left"> x{{ order.quantity }} </div>
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

    const addItemToList = (id: number) => {
      orders.value.push({
        id: id,
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