<script setup lang="ts">
const products = [
  {
    id: 1,
    name: 'Product 1',
    price: 100,
    url: 'https://picsum.photos/id/7/800/800',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel urna eget massa mollis aliquam. Donec euismod, nisl eget aliquet ultricies, nunc nisl aliquet nunc, quis ali',
  },
  {
    id: 2,
    name: 'Product 2',
    price: 200,
    url: 'https://picsum.photos/id/8/800/800',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel urna eget massa mollis aliquam. Donec euismod, nisl eget aliquet ultricies, nunc nisl aliquet nunc, quis ali',
  },
  {
    id: 3,
    name: 'Product 3',
    price: 300,
    url: 'https://picsum.photos/id/10/800/800',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel urna eget massa mollis aliquam. Donec euismod, nisl eget aliquet ultricies, nunc nisl aliquet nunc, quis ali',
  },
  {
    id: 4,
    name: 'Product 4',
    price: 400,
    url: 'https://picsum.photos/id/11/800/800',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel urna eget massa mollis aliquam. Donec euismod, nisl eget aliquet ultricies, nunc nisl aliquet nunc, quis ali',
  },
  {
    id: 5,
    name: 'Product 5',
    price: 500,
    url: 'https://picsum.photos/id/12/800/800',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel urna eget massa mollis aliquam. Donec euismod, nisl eget aliquet ultricies, nunc nisl aliquet nunc, quis ali',
  },
  {
    id: 6,
    name: 'Product 6',
    price: 600,
    url: 'https://picsum.photos/id/7/800/800',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel urna eget massa mollis aliquam. Donec euismod, nisl eget aliquet ultricies, nunc nisl aliquet nunc, quis ali',
  },
  {
    id: 7,
    name: 'Product 7',
    price: 700,
    url: 'https://picsum.photos/id/6/800/800',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel urna eget massa mollis aliquam. Donec euismod, nisl eget aliquet ultricies, nunc nisl aliquet nunc, quis ali',
  },
  {
    id: 8,
    name: 'Product 8',
    price: 800,
    url: 'https://picsum.photos/id/3/800/800',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel urna eget massa mollis',
  },
]
</script>

<template>
  <div id="IndexPage" class="mx-auto mt-4 max-w-7xl px-2">
    <div v-if="products" class="grid grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-5">
      <div v-for="product in products" :key="product.id">
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>
