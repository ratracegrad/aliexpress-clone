<script setup lang="ts">
import { useUserStore } from '~/stores/user'

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
  selectedArray: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['selectedRadio'])

const isHover = ref(false)
const isSelected = ref(false)
const userStore = useUserStore()
const { product, selectedArray } = toRefs(props)

function removeFromCart() {
  userStore.cart.forEach((prod, index) => {
    if (prod.id === product.value.id)
      userStore.cart.splice(index, 1)
  })
}

watch(() => isSelected.value, (val) => {
  emit('selectedRadio', { id: product.value.id, val })
})
</script>

<template>
  <div class="my-2 flex justify-start">
    <div class="my-auto">
      <div
        class="flex cursor-pointer items-center justify-start p-0.5"
        @mouseenter="isHover = true"
        @mouseleave="isHover = false"
      >
        <div
          class="ml-2 mr-5 h-5 w-5 flex items-center justify-center border rounded-full"
          :class="[isHover ? 'border-rose-500' : 'border-gray-300', isSelected ? 'bg-rose-500' : '']"
          @click="isSelected = !isSelected"
        >
          <div class="h-2 w-2 rounded-full bg-white" />
        </div>
      </div>
    </div>

    <img class="w-24 rounded-md md:w-40" :src="product.url" :alt="product.name">

    <div class="w-full overflow-hidden pl-2">
      <div class="w-full flex items-center justify-between">
        <div class="flex items-center justify-between truncate">
          <span class="5 hidden min-w-20 rounded-sm bg-rose-500 px-1 text-sm text-white font-semibold sm:block">Welcome Deal</span>
          <div class="truncate sm:pl-2">
            {{ product.name }}
          </div>
        </div>

        <button class="mx-3 hidden text-xl -mt-0.5 sm:block hover:text-red-500" @click="removeFromCart">
          <div class="i-material-symbols-delete-outline" />
        </button>
      </div>

      <div class="text-xl font-semibold">
        $ <span class="font-bold">{{ product.price / 100 }}</span>
      </div>

      <p class="pt-1 text-xs text-emerald-600 font-semibold">
        Free 11-day delivery over 8.28
      </p>
      <p class="pt-1 text-xs text-emerald-600 font-semibold">
        Free shipping
      </p>

      <div class="flex items-center justify-end">
        <button class="text-xl -mt-0.5 sm:hidden hover:text-red-500" @click="removeFromCart">
          <div class="i-material-symbols-delete-outline" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
