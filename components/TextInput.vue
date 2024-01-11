<script setup lang="ts">
import { computed, defineEmits, defineProps, ref, toRefs } from 'vue'

const props = defineProps(['input', 'placeholder', 'max', 'inputType', 'error'])

const emit = defineEmits(['update:input'])

const { input, placeholder, max, inputType, error } = toRefs(props)

const isFocused = ref(false)

const inputComputed = computed({
  get: () => input?.value,
  set: value => emit('update:input', value),
})
</script>

<template>
  <div>
    <client-only>
      <input
        v-model="inputComputed"
        :placeholder="placeholder"
        :max-length="max"
        class="w-full border border-zinc-100 rounded-lg bg-white p-3 text-sm text-gray-800 focus:outline-none placeholder-gray-500"
        :class="{
          'border-red-500': error,
          'border-gray-900': isFocused,
        }"
        :type="inputType"
        autocomplete="off"
        @focus="isFocused = true"
        @blur="isFocused = false"
      >
    </client-only>

    <span v-if="error" class="text-sm text-red-500 font-semibold">
      {{ error }}
    </span>
  </div>
</template>

<style scoped>

</style>
