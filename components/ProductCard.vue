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

const priceComputed = computed(() => {
  return product.value.price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
})

const oldPriceComputed = computed(() => {
  return (product.value.price * 1.2).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
})
</script>

<template>
  <div :id="`ProductComponent${product.id}`" class="inline-block cursor-pointer rounded bg-white hover:shadow-[0_0_10px_3px_rgba(0,0,0,0.16)]">
    <NuxtLink :to="`/item/${product.id}`">
      <img :src="product.url" class="h-full w-full object-cover">
      <div id="ProductDetails">
        <span class="flex items-center justify-start gap-3 px-1 pt-1">
          <span class="text-neutral-800 font-semibold">${{ priceComputed }}</span>
          <span class="text-sm text-gray-500 text-light line-through">${{ oldPriceComputed }}</span>
        </span>

        <span class="relative px-1 text-xs text-neutral-800 font-semibold -top-1.5">
          Extra 5% off
        </span>

        <div class="relative flex items-center gap-1 px-1 -top-1">
          <span class="rounded-sm bg-rose-500 px-1.5 text-sm text-white font-semibold">Welcome Deal</span>
          <span class="border rounded-sm bg-neutral-100 px-1.5 text-sm text-amber-600 font-semibold">Top Selling</span>
        </div>

        <p class="flex items-center px-1 pt-0.5 text-xs text-neutral-800">
          <span>5,000+ sold</span>
          <span class="i-material-symbols-star ml-1.5 block" />
          <span>4.7</span>
        </p>

        <p class="px-1 pt-0.5 text-xs text-neutral-800">
          {{ product.name.substring(0, 60) }}
        </p>

        <p class="px-1 pb-1">
          <span class="text-xs text-emerald-600 font-semibold">Free Shipping</span>
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>

</style>
