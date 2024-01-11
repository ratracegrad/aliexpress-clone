<script setup lang="ts">
import { useUserStore } from '@/stores/user'

interface Error  {
	type: string
	message: string
}

const userStore = useUserStore()
const contactName = ref(null)
const address = ref(null)
const zipCode = ref(null)
const city = ref(null)
const country = ref(null)
const error = ref(null) as Ref<Error | null>
const isWorking = ref(false)
const isUpdate = ref(false)
const currentAddress = ref(null)

watchEffect(() => {
	userStore.isLoading = false
})

async function submit() {
	isWorking.value = true
	error.value = null

	if (!contactName.value) {
		error.value = {
			type: 'contactName',
			message: 'Contact name is required',
		}
	} else if (!address.value) {
		error.value = {
			type: 'address',
			message: 'Address is required',
		}
	} else if (!zipCode.value) {
		error.value = {
			type: 'zipCode',
			message: 'Zip code is required',
		}
	} else if (!city.value) {
		error.value = {
			type: 'city',
			message: 'City is required',
		}
	} else if (!country.value) {
		error.value = {
			type: 'country',
			message: 'Country is required',
		}
	} 

	if (error.value) {
		isWorking.value = false
		return
	}

}
</script>

<template>
  <div id="countryPage" class="mx-auto mt-4 max-w-lg px-2">
    <div class="mx-auto rounded-lg bg-white p-3">
      <div class="text-bold mb-2 text-xl">
        Address Details
      </div>

      <form @submit.prevent="submit()">
        <TextInput v-model:input="contactName" class="w-full" placeholder="Contact Name" input-type="text" :error="error && error.type === 'contactName' ? error.message : ''" />
        <TextInput v-model:input="address" class="w-full" placeholder="Address" input-type="text" :error="error && error.type === 'address' ? error.message : ''" />
        <TextInput v-model:input="zipCode" class="w-full" placeholder="Zip Code" input-type="text" :error="error && error.type === 'zipCode' ? error.message : ''" />
        <TextInput v-model:input="city" class="w-full" placeholder="City" input-type="text" :error="error && error.type === 'city' ? error.message : ''" />
        <TextInput v-model:input="country" class="w-full" placeholder="Country" input-type="text" :error="error && error.type === 'country' ? error.message : ''" />

        <button
          :disabled="isWorking"
          type="submit"
          class="mt-6 w-full rounded-full from-orange-500 to-red-500 bg-gradient-to-r p-1.5 text-xl text-white font-semibold"
        >
        <div v-if="!isWorking">
          Update Address
        </div>
        <div v-else class="i-line-md-loading-loop mr-2 text-xl" />
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>
