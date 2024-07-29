<script setup>
import { defineEmits } from 'vue'

import IButton from '@/components/IButton/IButton.vue'
import IModal from '@/components/IModal/IModal.vue'

defineProps({
  title: {
    type: String,
    default: ''
  },
  isOpen: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  hasError: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['cancel', 'confirm'])
</script>

<template>
  <IModal v-if="isOpen" @close="emit('cancel')">
    <div class="mb-4 text-lg">{{ title }}</div>
    <div class="flex gap-3 justify-center">
      <IButton @click="emit('cancel')">Відхилити</IButton>
      <IButton variant="gradient" :is-loading="isLoading" @click="emit('confirm')">
        Підтвердити
      </IButton>
    </div>
    <div v-if="hasError" class="text-red-500">Щось пішло не так...</div>
  </IModal>
</template>
