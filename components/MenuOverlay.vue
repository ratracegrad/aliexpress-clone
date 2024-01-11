<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const client = useSupabaseClient()
// const user = userSupabaseUser()

function goTo (url: string) {
	userStore.isMenuOverlay = false
	return navigateTo(`/${url}`)
}

function signOut() {
	client.auth.signOut()
	userStore.isMenuOverlay = false
	return navigateTo('/')
}

function signIn() {
	userStore.isMenuOverlay = false
	return navigateTo('/auth')
}
</script>

<template>
  <div id="MenuOverlay" class="fixed bottom-0 z-50 h-full w-full bg-white px-3">
    <div class="flex items-center justify-between py-5">
      <NuxtLink to="/" @click="userStore.isMenuOverlay = false">
        <img width="170" src="/AliExpress-logo.png" alt="AliExpress Logo">
      </NuxtLink>

      <button class="rounded-full p-1 hover:bg-gray-200" @click="userStore.isMenuOverlay = false">
        <div class="i-material-symbols-close-rounded" />
      </button>
    </div>

    <div class="flex items-center justify-between pt-5">
      <ul class="w-full">
        <li class="relative flex cursor-pointer items-center justify-between border-b px-3 py-2.5 hover:bg-gray-100" @click="goTo('orders')">
          <div class="flex items-center text-xl font-semibold">
            <div class="i-material-symbols-edit-outline" />
            <span class="pl-4">My Orders</span>
          </div>
        </li>
        <li class="relative flex cursor-pointer items-center justify-between border-b px-3 py-2.5 hover:bg-gray-100" @click="goTo('shoppingcart')">
          <div class="flex items-center text-xl font-semibold">
            <div class="i-material-symbols-shopping-cart-outline" />
            <span class="pl-4">Cart</span>
          </div>
          <div class="rounde-full h-9 min-w-9 flex items-center justify-center bg-rose-500 text-lg text-white">
            {{ userStore.cart.length }}
          </div>
        </li>
        <li v-if="false" class="relative flex cursor-pointer items-center justify-between border-b px-3 py-2.5 hover:bg-gray-100" @click="signOut()">
          <div class="flex items-center text-xl font-semibold">
            <div class="i-ph-sign-out" />
            <span class="pl-4">Sign out</span>
          </div>
        </li>
				<li v-else class="relative flex cursor-pointer items-center justify-between border-b px-3 py-2.5 hover:bg-gray-100" @click="signIn()">
          <div class="flex items-center text-xl font-semibold">
            <div class="i-teenyicons-signin-outline" />
            <span class="pl-4">Sign in / Register</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>
