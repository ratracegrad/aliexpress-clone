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

            <div class="border-t pt-2">
              <div class="pb-1 underline">
                Delivery Address
              </div>

              <ul class="text-xs">
                <li class="flex items-center gap-2">
                  <div>Contact name:</div>
                  <div class="font-bold">
                    TEST
                  </div>
                </li>
                <li class="flex items-center gap-2">
                  <div>Address:</div>
                  <div class="font-bold">
                    TEST
                  </div>
                </li>
                <li class="flex items-center gap-2">
                  <div>Zip Code:</div>
                  <div class="font-bold">
                    TEST
                  </div>
                </li>
                <li class="flex items-center gap-2">
                  <div>City:</div>
                  <div class="font-bold">
                    TEST
                  </div>
                </li>
                <li class="flex items-center gap-2">
                  <div>Country:</div>
                  <div class="font-bold">
                    TEST
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <NuxtLink v-else to="/address" class="flex items-center pb-2 text-blue-500 hover:text-red-400">
            <div class="i-material-symbols-add text-lg" />
            <span class="ml-2">Add New Address</span>
          </NuxtLink>
        </div>

        <div id="Items" class="mt-4 rounded-lg bg-white p-4">
          <div v-for="product in products" :key="product.id">
            <CheckoutItem :product="product" />
          </div>
        </div>
      </div>

      <div class="my-4 block md:hidden" />

      <div class="md-w-[35%]">
        <div id="PlaceOrder" class="rounded-lg bg-white p-4">
          <div class="mb-2 text-2xl font-extrabold">
            Summary
          </div>
          <div class="justify-betweeen my-4 flex items-center">
            <div>TotalS Shipping</div>
            <div>Free</div>
          </div>

          <div class="border-t" />

          <div class="my-4 flex items-center justify-between">
            <div class="font-semibold">
              Total
            </div>
            <div class="text-2xl font-semibold">
              $ <span class="font-extrabold">{{ total / 100 }}</span>
            </div>
          </div>

          <form @submit.prevent="pay()">
            <div id="card-element" class="border border-gray-500 rounded-sm p-2" />
            <p id="card-error" class="text-center text-red-700 font-semibold" role="alert" />

            <button
              :disabled="isProcessing"
              type="submit"
              class="mt-4 w-full rounded-full from-orange-500 to-orange-600 bg-gradient-to-r p-1.5 text-xl text-white font-semibold"
              :class="isProcessing ? 'opacity-70' : 'opacity-100'"
            >
              <div v-if="isProcessing" class="i-line-md-loading-loop" />
              <div v-else>
                Place Order
              </div>
            </button>
          </form>
        </div>

        <div class="mt-4 rounded-lg bg-white p-4">
          <div class="mb-2 mt-2 text-lg font-semibold">
            AliExpress
          </div>
          <p class="my-2">
            AliExpress keeps your information and payment safe
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
