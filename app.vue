<script setup lang="ts">
import { appName } from '~/constants'
import { useUserStore } from '@/stores/user'

useHead({
  title: appName,
})

const userStore = useUserStore()
const route = useRoute()
const windowWidth = ref(process.client ? window.innerWidth : 0)

onMounted(() => {
  userStore.isLoading = false
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
  })
})

watch(() => windowWidth.value, () => {
  if (windowWidth.value >= 767)
    userStore.isMenuOverlay = false
})

watch(() => route.fullPath, () => {
  userStore.isLoading = false
})
</script>

<template>
  <div class="h-full w-full bg-[#FAFAFA]">
    <NuxtLayout>
      <NuxtPage />
      <MenuOverlay
        :class="[
          { 'max-h-full transition-all duration-200 ease-in-visible': userStore.isMenuOverlay },
          { 'max-h-0 transition-all duration-200 ease-out-invisible': !userStore.isMenuOverlay },
        ]"
      />
    </NuxtLayout>
  </div>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
