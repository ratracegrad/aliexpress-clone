<script setup lang="ts">
import { useUserStore } from '@/stores/user'

interface Product {
  id: number
  name: string
  price: number
  url: string
  description: string
}

const userStore = useUserStore()
const user = useSupabaseUser()
const selectedArray = ref([]) as Ref<Product[]>
const cards = ref([
  'visa.png',
  'mastercard.png',
  'paypal.png',
  'applepay.png',
])

onMounted(() => {
  setTimeout(() => userStore.isLoading = false, 200)
})

const totalPriceComputed = computed(() => {
  let total = 0
  userStore.cart.forEach((item) => {
    total += item.price
  })
  return total / 100
})

function selectedRadioFunc(e: Product) {
  if (!selectedArray.value.length) {
    selectedArray.value.push(e)
    return
  }

  selectedArray.value.forEach((item: Product, idx) => {
    if (item.id !== e.id)
      selectedArray.value.push(e)
    else
      selectedArray.value.splice(idx, 1)
  })
}

function goToCheckout() {
  const ids: number[] = []
  userStore.checkout = []

  selectedArray.value.forEach(item => ids.push(item.id))

  const res = userStore.cart.filter((item) => {
    return ids.includes(item.id)
  })

  res.forEach((item) => userStore.checkout.push(toRaw(item)));

  return navigateTo('/checkout')
}
</script>

<template>
  <div id="ShoppingCartPage" class="mx-auto mt-4 max-w-7xl px-2">
    <div v-if="!userStore.cart.length" class="items.center h-[500px] flex justify-center">
      <div class="pt-20">
        <img class="mx-auto" width="250" src="/cart-empty.png" alt="empty cart">

        <div class="mt-4 text-center text-xl">
          No items yet?
        </div>
        <div v-if="!user" class="flex text-center">
          <NuxtLink to="/auth" class="mt-4 w-full rounded-full bg-rose-500 p-1.5 text-xl text-white font-semibold">
            Sign in
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-else class="mx-auto w-full justify-between gap-4 md-flex">
      <div class="md:w-[65%]">
        <div class="rounded-lg bg-white p-4">
          <div class="mb-2 text-2xl font-bold">
            Shopping Cart({{ userStore.cart.length }})
          </div>
        </div>

        <div class="mt-4 rounded-lg bg-rose-50 p-4">
          <div class="text-red-500 font-bold">
            Welcome Deal applicable on 1 item only
          </div>
        </div>

        <div id="Items" class="mt-4 rounded-lg bg-white p-4">
          <div v-for="product in userStore.cart" :key="product.id">
            <CartItem :product="product" :selected-array="selectedArray" @selected-radio="selectedRadioFunc" />
          </div>
        </div>
      </div>

      <div class="my-4 block md-hidden" />

      <div class="md:w-[35%]">
        <div id="Summary" class="rounded-lg bg-white p-4">
          <div class="mb-2 text-2xl font-semibold">
            Summary
          </div>
          <div class="my-4 flex items-center justify-between">
            <div class="font-semibold">
              Total
            </div>
            <div class="text-2xl font-semibold">
              $ <span class="font-extrabold">{{ totalPriceComputed }}</span>
            </div>
          </div>

          <button
            class="mt-4 w-full flex items-center justify-center rounded-full bg-rose-500 p-1.5 text-xl font-semibold"
            @click="goToCheckout"
          >
            Checkout
          </button>
        </div>

        <div id="PaymentProtection" class="mt-4 rounded-lg bg-white p-4">
          <div class="mb-2 text-lg font-semibold">
            Payment Methods
          </div>
          <div class="my-4 flex items-center justify-start gap-8">
            <div v-for="(card, cardIdx) in cards" :key="cardIdx">
              <img :src="card" alt="card" class="h-6">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
