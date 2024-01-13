<script setup lang="ts">
import { useUserStore } from '../../stores/user'

interface Product {
  id: number
  name: string
  description: string
  price: number
  url: string
}

const userStore = useUserStore()
const currentImage = ref('')
const product = ref({} as any)
const images = ref([
  '',
  'https://picsum.photos/id/212/800/800',
  'https://picsum.photos/id/233/800/800',
  'https://picsum.photos/id/165/800/800',
  'https://picsum.photos/id/99/800/800',
  'https://picsum.photos/id/144/800/800',
])
const route = useRoute()

onBeforeMount(async () => {
  product.value = await useFetch(`/api/prisma/get-product-by-id/${route.params.id}`)
})

watchEffect(() => {
  if (product.value && product.value.data) {
    currentImage.value = product.value.data.url
    images.value[0] = product.value.data.url
    userStore.isLoading = false
  }
})

const priceComputed = computed(() => {
  if (product.value && product.value.data) 
    return product.value.data.price / 100
  
  return '0.00'
})

const isInCart = computed(() => {
	let res = false
  userStore.cart.forEach((prod: { id: number; name: string; price: number; image: string; quantity: number; }) => {
		if (Number(route.params.id) === prod.id)
			res = true
	})
	return res
})

function addToCart() {
  userStore.cart.push(product.value.data)
}
</script>

<template>
  <div id="ItemPage" class="mx-auto mt-4 max-w-7xl px-2">
    <div class="mx-auto w-full justify-between gap-4 md:flex">
      <div class="md:w-[40%]">
        <img v-if="currentImage" :src="currentImage" alt="random picture" class="object-fit rounded-lg">
        <div v-if="images[0] !== ''" class="mt-2 flex items-center justify-center">
          <div v-for="(image, index) in images" :key="index">
            <img
              :src="image"
              alt="random picture"
              class="object-fit cursor-pointer border-[3px] rounded-md"
              :class="currentImage === image ? 'border-rose-500' : ''"
              width="70"
              @mouseover="currentImage = image"
              @click="currentImage = image"
            >
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-white p-3 md:w-[60%]">
        <div v-if="product && product.data">
          <p class="mb-2">
            {{ product.data.name }}
          </p>
          <p class="mb-2 text-sm font-light">
            {{ product.data.description }}
          </p>
        </div>
        <div class="5 flex items-center pt-1">
          <span class="mr-2 h-4 min-w-4 rounded-full bg-yellow-400 p-0 p-0.5">
            <div class="i-material-symbols-star -mt-4.5" />
          </span>
          <p class="text-rose-500">
            Extra 5% off
          </p>
        </div>

        <div class="my-2 flex items-center justify-start">
          <div class="i-material-symbols-star text-rose-400" />
          <div class="i-material-symbols-star text-rose-400" />
          <div class="i-material-symbols-star text-rose-400" />
          <div class="i-material-symbols-star text-rose-400" />
          <div class="i-material-symbols-star text-rose-400" />
          <span class="ml-2 text-sm font-light">5 213 Reviews, 1,000+ orders</span>
        </div>

        <div class="border-b" />

        <div class="my-2 flex items-center justify-start gap-2">
          <div class="text-xl font-bold">
            ${{ priceComputed }}
          </div>
          <span class="border rounded-sm bg-neutral-100 px-1.5 text-sm text-amber-600 font-semibold">70% off</span>
        </div>

        <p class="pt-1 text-xs text-emerald-600 font-semibold">
          Free 11-day delivery over £8.28
        </p>

        <p class="pt-1 text-xs text-emerald-600 font-semibold">
          Free shipping
        </p>

        <div class="py-2" />

        <button :disabled="isInCart" class="tex-lg rounded-lg from-orange-500 to-amber-400 bg-gradient-to-r px-6 py-2 text-white font-semibold" @click="addToCart">
          <div v-if="isInCart">
            Is Added
          </div>
          <div v-else>
            Add to Cart
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
