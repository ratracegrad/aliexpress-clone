<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const products = ref(null)

onBeforeMount(async () => {
  products.value = await useFetch(`/api/prisma/get-all-products`)
  setTimeout(() => userStore.isLoading = false, 1000)
})
</script>

<template>
  <div id="IndexPage" class="mx-auto mt-4 max-w-7xl px-2">
    <div v-if="products" class="grid grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-5">
      <div v-for="product in products.data" :key="product.id">
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>
