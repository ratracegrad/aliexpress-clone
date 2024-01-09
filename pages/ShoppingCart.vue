<script setup lang="ts">
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
</script>

<template>
  <div id="ShoppingCartPage" class="mx-auto mt-4 max-w-7xl px-2">
    <div v-if="false" class="items.center h-[500px] flex justify-center">
      <div class="pt-20">
        <img class="mx-auto" width="250" src="/cart-empty.png" alt="empty cart">

        <div class="mt-4 text-center text-xl">
          No items yet?
        </div>
        <div v-if="true" class="flex text-center">
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
            Shopping Cart(0)
          </div>
        </div>

        <div class="mt-4 rounded-lg bg-rose-50 p-4">
          <div class="text-red-500 font-bold">
            Welcome Deal applicable on 1 item only
          </div>
        </div>

        <div id="Items" class="mt-4 rounded-lg bg-white p-4">
          <div v-for="product in products" :key="product.id">
            <CartItem :product="product" :selected-array="selectedArray" @selected-radio="selectedRadioFunc" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
