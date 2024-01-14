<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})

const client = useSupabaseClient()
const user = useSupabaseUser()

watchEffect(() => {
  if (user.value)
    return navigateTo('/')
})

async function login(prov: string) {
	const { error } = await client.auth.signInWithOAuth({ 
		provider: prov as string,
	})
	if (error) console.error(error)
}
</script>

<template>
  <div id="AuthPage" class="h-[100vh] w-full bg-white">
    <div class="w-full flex items-center justify-center border-b border-b-gray-300 p-5">
      <NuxtLink to="/" class="min-w-44">
        <img width="170" src="/AliExpress-logo.png" alt="AliExpress">
      </NuxtLink>
    </div>

    <div class="mx-auto max-w-md px-2">
      <div class="my-6 text-center">
        Login / Register
      </div>
      <button
        class="w-full flex items-center justify-center gap-3 border rounded-full p-1.5 text-lg font-semibold hover:bg-gray-100"
        @click="login('google')"
      >
        <img class="max-w-8 w-full" src="/google-logo.png" alt="Google">
        <div>Google</div>
      </button>

      <button
        class="mt-4 w-full flex items-center justify-center gap-3 border rounded-full p-1.5 text-lg font-semibold hover:bg-gray-100"
        @click="login('github')"
      >
        <img class="max-w-8 w-full" src="/github-logo.png" alt="GitHub">
        <div>GitHub</div>
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
