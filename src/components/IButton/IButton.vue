<script setup>
import { defineProps, computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  variant: {
    default: 'primary',
    type: String,
    validator: (value) => {
      return ['primary', 'gradient', 'outlined'].includes(value)
    }
  },
  to: String,
  isLoading: {
    default: false,
    type: Boolean
  }
})

const isLink = computed(() => !!props.to)
const componentName = computed(() => (isLink.value ? RouterLink : 'button'))
const path = computed(() => (isLink.value ? props.to : undefined))

const bgStyles = computed(() => {
  return props.variant === 'gradient'
    ? 'bg-gradient-to-r from-[#FFA279] to-[#F3743D]'
    : 'bg-[#FFA279]'
})

// const bgStyles =
//   props.variant === 'gradient' ? 'bg-gradient-to-r from-[#FFA279] to-[#F3743D]' : 'bg-[#FFA279]'
</script>

<template>
  <component
    :is="componentName"
    :to="path"
    class="rounded-xl py-3 px-10 text-white font-bold -tracking-wider"
    :class="bgStyles"
  >
    <template v-if="props.isLoading"> Loading... </template>

    <template v-else>
      <!-- <div v-if="$slots.default">Hello default slot</div> -->
      <slot>Default button</slot>
    </template>
  </component>
</template>

<!-- <style scoped>
.btn {
  color: red;
}
</style> -->
