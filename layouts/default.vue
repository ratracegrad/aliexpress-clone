<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
</script>

<template>
  <main class="">
    <Header />

    <Loading v-if="userStore.isLoading" />
    <div class="pt-[80px] lg:pt-[150px] md:pt-[130px]" />
    <slot />
    <Footer v-if="!userStore.isLoading" />
  </main>
</template>
