<script setup lang="ts">
import { useUserStore } from '~/stores/user';

const userStore = useUserStore()
const isAccountMenu = ref(false)
const isCartHover = ref(false)
const isSearching = ref(false)
const searchItem = ref('')
// let items = ref(null)
</script>

<template>
  <nav id="MainLayout" class="z-50 w-full">
    <div id="TopMenu" class="hidden w-full border-b bg-[#FAFAFA] md:block">
      <ul class="bg=[#FAFAFA] h-10 w-full flex items-center justify-end px-2 text-xs text-[#333333] font-light">
        <li class="cursor-pointer border-r border-r-gray-400 px-3 hover:text-[#FF4646]">
          Sell on AliExpress
        </li>
        <li class="cursor-pointer border-r border-r-gray-400 px-3 hover:text-[#FF4646]">
          Cookie Preferences
        </li>
        <li class="cursor-pointer border-r border-r-gray-400 px-3 hover:text-[#FF4646]">
          Help
        </li>
        <li class="cursor-pointer border-r border-r-gray-400 px-3 hover:text-[#FF4646]">
          Buyer Protection
        </li>
        <li class="block cursor-pointer justify-center border-r border-r-gray-400 px-3">
          <div class="text-[#333333] hover:text-[#FF4646]">
            <div class="i-material-symbols-install-mobile" />
            <span class="ml-2 inline-block">Install App</span>
          </div>
        </li>
        <li
          class="relative h-full flex cursor-pointer items-center px-2.5"
          :class="isAccountMenu ? 'bg-white-border z-40 shadow=[0_15px_100px_40px_rgba(0,0,0,0.3)]' : 'border border-[#FAFAFA]'"
          @mouseenter="isAccountMenu = true"
          @mouseleave="isAccountMenu = false"
        >
          <div class="text-[#333333] hover:text-[#FF4646]">
            <div class="i-material-symbols-person" />
            <span class="mx-2 inline-block">Account</span>
            <div class="i-ion-chevron-down" />
          </div>
          <div
            v-if="isAccountMenu"
            id="AccountMenu"
            class="absolute top-[38px] z-40 w-[220px] border-x border-b bg-white text-[#333333] -left-[100px]"
          >
            <div>
              <div class="text-semibold my-4 px-3 text-[15px]">
                Welcome to AliExpress!
              </div>
              <div class="mb-3 flex items-center gap-1 px-3">
                <NuxtLink
                  to="/auth"
                  class="w-full rounded-sm bg-[#FF4646] p-2 text-center text-[16px] text-white font-semibold"
                >
                  Login / Register
                </NuxtLink>
              </div>
            </div>
            <div class="border-b" />
            <ul class="bg-white">
              <li
                class="w-full px-4 py-2 text-[13px] hover:bg-gray-200"
              >
                My Orders
              </li>
              <li
                class="w-full px-4 py-2 text-[13px] hover:bg-gray-200"
              >
                Sign out
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>

    <div id="MainHeader" class="w-full flex items-center bg-white">
      <div class="mx-auto max-w-[1150px] w-full flex justify-between gap-10 px-3 py-5 lg:justify-start">
        <NuxtLink to="/" class="min-w-[172px]">
          <img
            width="170"
            src="/AliExpress-logo.png"
          >
        </NuxtLink>
        <div class="hidden max-w-[700px] w-full md:block">
          <div class="relative">
            <div class="w-full flex items-center border-2 border-[#FF4646] rounded-md">
              <input
                v-model="searchItem"
                class="w-full pl-3 text-sm focus:outline-none placeholder-gray-400"
                placeholder="kitchen accessories"
                type="text"
              >
              <div
                v-if="isSearching"
                class="i-line-md-loading-loop mr-2 text-3xl text-blue-500"
              />
              <button class="h-[100%] flex items-center bg-[#FF4646] p-1.5 px-2">
                <div
                  class="i-mdi-magnify text-2xl"
                />
              </button>
            </div>

            <div class="absolute h-auto max-w-[700px] w-full bg-white">
              <div
                v-if="false"
                class="p-1"
              >
                <NuxtLink
                  to="`/item/1`"
                  class="w-full flex cursor-pointer items-center justify-between hover:bg-gray-100"
                >
                  <div class="flex items-center">
                    <img class="rounded-md" width="40" src="https://picsum.photos/id/82/300/300">
                    <div class="ml-2 truncate">
                      Testing
                    </div>
                  </div>
                  <div class="truncate">
                    $17.99
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <NuxtLink
          to="/shoppingcart"
          class="flex items-center"
        >
          <button
            class="relative hidden md:block"
            @mouseenter="isCartHover = true"
            @mouseleave="isCartHover = false"
          >
            <span
              class="absolute top-0 h-[17px] min-w-[17px] flex items-center justify-center rounded-full bg-[#FF4646] px-0.5 text-xs text-white -right-[3px]"
            >
              2
            </span>
            <div class="min-w-[40px]">
              <div
                class="i-material-symbols-shopping-cart-outline text-3xl font-light hover:text-[#FF4646]"
              />
            </div>
          </button>
        </NuxtLink>

        <button
          class="block rounded-full p-1.5 -mt-[4px] md:hidden hover:bg-gray-200"
          @click="userStore.isMenuOverlay = true"
        >
          <div
            class="i-ci-hamburger text-[#3333333]h-8"
          />
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>
