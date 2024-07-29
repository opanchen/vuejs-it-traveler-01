<script setup>
import { computed, reactive } from 'vue'

import IModal from '@/components/IModal/IModal.vue'
import IInput from '@/components/IInput/IInput.vue'
import InputImage from '@/components/InputImage/InputImage.vue'
import IButton from '@/components/IButton/IButton.vue'
import MarkerIcon from '@/components/icons/MarkerIcon.vue'

const props = defineProps({
  isOpen: {
    default: false,
    type: Boolean
  },
  isLoading: {
    default: false,
    type: Boolean
  },
  hasError: {
    default: false,
    type: Boolean
  }
})

const emit = defineEmits(['close', 'submit'])

const formData = reactive({
  title: '',
  description: '',
  img: ''
})

const handleUpload = (url) => {
  formData.img = url
}

const uploadText = computed(() =>
  formData.img ? 'Натисніть тут, щоб змінити фото' : 'Натисніть тут, щоб додати фото'
)

const resetForm = () => {
  formData.title = ''
  formData.description = ''
  formData.img = ''
}
</script>

<template>
  <IModal v-if="props.isOpen" @close="emit('close')">
    <form @submit.prevent="emit('submit', formData, resetForm)" class="min-w-[420px]">
      <p class="flex gap-1 items-center justify-center mb-10 font-bold text-center">
        <MarkerIcon /> Додати маркери
      </p>

      <IInput label="Локація" class="mb-4" v-model="formData.title" />
      <IInput label="Опис" type="textarea" class="mb-2" v-model="formData.description" />
      <div class="flex gap-2 items-center mb-10">
        <img v-if="formData.img" :src="formData.img" alt="Avatar" class="w-8 h-8 object-cover" />
        <InputImage @uploaded="handleUpload">{{ uploadText }}</InputImage>
      </div>

      <IButton variant="gradient" class="w-full" :is-loading="props.isLoading">Додати</IButton>

      <p v-if="props.hasError" class="text-red-500">Щось пішло не так...</p>
    </form>
  </IModal>
</template>
