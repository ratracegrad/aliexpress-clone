<script setup lang="ts">
interface Product {
  id: number
  name: string
  price: number
  description: string
  url: string
}

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
})

const { product } = toRefs(props)
</script>

<template>
  <div class="my-2 flex justify-start">
    <img class="w-24 rounded-md md:w-40" :src="product.url" :alt="product.name">

    <div class="overflow-hidden pl-2">
      <div class="flex items-center">
        <span class="min-w-20 rounded-sm bg-rose-500 px-1 text-sm text-white font-semibold">Welcome Deal</span>
        <div class="truncate pl-2">
          {{ product.name }}
        </div>
      </div>
      <div class="text-lg font-semibold mt-2">
        $ <span class="font-bold">{{ product.price / 100 }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
