<script setup>
import { onMounted, onUnmounted, Teleport } from 'vue'

import CrossIcon from '@/components/icons/CrossIcon.vue'

const emit = defineEmits(['close'])

onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = 'initial'
})
</script>

<template>
  <component :is="Teleport" to="body">
    <div
      class="flex w-full h-full fixed top-0 left-0 overflow-auto bg-[rgba(0,0,0,0.3)]"
      @click.self="emit('close')"
    >
      <div class="relative bg-white min-w-[350px] m-auto text-black rounded-2xl p-10">
        <button
          class="absolute right-3 top-3 w-6 h-6 flex items-center justify-center"
          @click="emit('close')"
        >
          <CrossIcon />
        </button>

        <slot></slot>
      </div>
    </div>
  </component>
</template>
