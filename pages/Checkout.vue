<script setup lang="ts">
import { useUserStore } from '@/stores/user'

interface Product {
  id: number
  name: string
  price: number
  url: string
  description: string
}

const route = useRoute()
const userStore = useUserStore()
const stripe = null
const elements = null
const card = null
const form = null
const total = ref(0)
const clientSecret = null
const currentAddress = ref(null)
const isProcessing = ref(false)
const products = [
  {
    id: 4,
    name: 'Product 4',
    price: 4796,
    url: 'https://picsum.photos/id/11/800/800',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel urna eget massa mollis aliquam. Donec euismod, nisl eget aliquet ultricies, nunc nisl aliquet nunc, quis ali',
  },
  {
    id: 5,
    name: 'Product 5',
    price: 5995,
    url: 'https://picsum.photos/id/12/800/800',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel urna eget massa mollis aliquam. Donec euismod, nisl eget aliquet ultricies, nunc nisl aliquet nunc, quis ali',
  },
]

watch(() => total.value, () => {
  if (total.value > 0)
    stripeInit()
})

async function stripeInit() {}
onMounted(() => {
  isProcessing.value = true

  userStore.checkout.forEach((product: Product) => {
    total.value += product.price
  })
})

async function pay() {}

async function createOrder() {}

async function showError() {}
</script>

<template>
  <div id="CheckoutPage" class="mx-auto mt-4 max-w-7xl px-2">
    <div class="mx-auto w-full justify-between gap-4 md:flex">
      <div class="md:w-[65%]">
        <div class="rounded-lg bg-white p-4">
          <div class="mb-2 text-xl font-semibold">
            Shipping Address
          </div>
          <div v-if="true">
            <NuxtLink to="/address" class="flex items-center pb-2 text-blue-500 hover:text-red-400">
              <div class="i-material-symbols-add text-lg" />
              <span class="ml-2">Update Address</span>
            </NuxtLink>

            <div class="pt-2 border-t">
              <div class="underline pb-1">Delivery Address</div>
              
              <ul class="text-xs">
                <li class="flex items-center gap-2">
                  <div>Contact name:</div>
                  <div class="font-bold">TEST</div>
                </li>
                <li class="flex items-center gap-2">
                  <div>Address:</div>
                  <div class="font-bold">TEST</div>
                </li>
                <li class="flex items-center gap-2">
                  <div>Zip Code:</div>
                  <div class="font-bold">TEST</div>
                </li>
                <li class="flex items-center gap-2">
                  <div>City:</div>
                  <div class="font-bold">TEST</div>
                </li>
                <li class="flex items-center gap-2">
                  <div>Country:</div>
                  <div class="font-bold">TEST</div>
                </li>
              </ul>
            </div>
          </div>

          <NuxtLink v-else to="/address" class="flex items-center pb-2 text-blue-500 hover:text-red-400">
              <div class="i-material-symbols-add text-lg" />
              <span class="ml-2">Add New Address</span>
            </NuxtLink>
        </div>

        <div id="Items" class="bg-white rounded-lg p-4 mt-4">
          <div v-for="product in products" :key="product.id">
            <CheckoutItem :="product" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
