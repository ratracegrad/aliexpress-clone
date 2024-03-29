<script setup lang="ts">
import { useUserStore } from '@/stores/user'

interface Product {
  id: number
  name: string
  price: number
  url: string
  description: string
}

const user = useSupabaseUser()
const route = useRoute()
const userStore = useUserStore()
let stripe: any = null
let elements = null
let card: any = null
const form = null
const total = ref(0)
let clientSecret: any = null
const currentAddress = ref(null)
const isProcessing = ref(false)

watch(() => total.value, () => {
  if (total.value > 0)
    stripeInit()
})


watchEffect(() => {
  if (route.fullPath === '/checkout' && !user.value)
    return navigateTo('/auth')
})

onBeforeMount(async () => {
  if (userStore.checkout.length < 1)
    return navigateTo('/shoppingcart')

  total.value = 0.00

  if (user.value) {
    currentAddress.value = await useFetch(`/api/prisma/get-address-by-user/${user.value.id}`)
    setTimeout(() => userStore.isLoading = false, 2000)
  }
})

onMounted(() => {
  isProcessing.value = true

  userStore.checkout.forEach((product: Product) => {
    total.value += product.price
  })
})

async function stripeInit() {
  const runtimeConfig = useRuntimeConfig()
  stripe = Stripe(runtimeConfig.stripePK)

  const res = await $fetch('/api/stripe/paymentintent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: total.value })
  })

  clientSecret = res.client_secret

  elements = stripe.elements()
  const style = {
    base: {
      fontSize: '18px',
    },
    invalid: {
      fontFamily: 'Arial, sans-serif',
      color: '#EE4B2B',
      iconColor: '#EE4B2B'
    }
  }
  card = elements.create('card', { 
    hidePostalCode: true,
    style 
  })

  card.mount("#card-element")
  card.on('change', (event: any) => {
    document.querySelector('button')!.disabled = event.empty;
    document.querySelector('#card-error')!.textContent = event.error ? event.error.message : '';
  })

  isProcessing.value = false
}

async function pay() {
  if (currentAddress.value && currentAddress.value.data === '') {
    showError('Please add a shipping address!')
    return
  }

  isProcessing.value = true

  const result = await stripe.confirmCardPayment(clientSecret, {
    payment_method: { card }
  })

  if (result.error) {
    showError(result.error.message);
    isProcessing.value = false
  } else {
    await createOrder(result.paymentIntent.id)
    userStore.cart = []
    userStore.checkout = []
    setTimeout(() => {
      return navigateTo('/success')
    }, 500)
  }
}

async function createOrder(stripeId) {
  await useFetch('/api/prisma/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: user.value!.id,
      stripeId,
      name: currentAddress.value!.data.name,
      address: currentAddress.value!.data.address,
      zipcode: currentAddress.value!.data.zipcode,
      city: currentAddress.value!.data.city,
      country: currentAddress.value!.data.country,
      products: userStore.checkout,
    })
  })
}

async function showError(errorMsgText: string): Promise<void> {
  const errorMsg = document.querySelector('#card-error')!
  errorMsg.textContent = errorMsgText
}
</script>

<template>
  <div id="CheckoutPage" class="mx-auto mt-4 max-w-7xl px-2">
    <div class="mx-auto w-full justify-between gap-4 md:flex">
      <div class="md:w-[65%]">
        <div class="rounded-lg bg-white p-4">
          <div class="mb-2 text-xl font-semibold">
            Shipping Address
          </div>
          <div v-if="currentAddress && currentAddress.data">
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
                    {{ currentAddress.data.name }}
                  </div>
                </li>
                <li class="flex items-center gap-2">
                  <div>Address:</div>
                  <div class="font-bold">
                    {{ currentAddress.data.address }}
                  </div>
                </li>
                <li class="flex items-center gap-2">
                  <div>Zip Code:</div>
                  <div class="font-bold">
                    {{ currentAddress.data.zipcode }}
                  </div>
                </li>
                <li class="flex items-center gap-2">
                  <div>City:</div>
                  <div class="font-bold">
                    {{ currentAddress.data.city }}
                  </div>
                </li>
                <li class="flex items-center gap-2">
                  <div>Country:</div>
                  <div class="font-bold">
                    {{ currentAddress.data.country }}
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
          <div v-for="product in userStore.checkout" :key="product.id">
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
