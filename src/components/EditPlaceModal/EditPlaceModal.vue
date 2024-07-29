<script setup>
import { ref, watch } from 'vue'

import IModal from '@/components/IModal/IModal.vue'
import IInput from '@/components/IInput/IInput.vue'
import IButton from '@/components/IButton/IButton.vue'
import MarkerIcon from '@/components/icons/MarkerIcon.vue'
import InputImage from '@/components/InputImage/InputImage.vue'

import fallbackImage from '../../assets/images/ukraine.png'

const props = defineProps({
  isOpen: {
    default: false,
    type: Boolean
  },
  isLoading: {
    default: false,
    type: Boolean
  },
  place: Object
})

const emit = defineEmits(['close', 'submit'])

const formData = ref({
  id: '',
  title: '',
  description: '',
  img: '',
  coordinates: null
})

watch(
  () => props.place,
  () => {
    formData.value = {
      ...props.place
    }
  }
)

const handleChangeImg = (url) => {
  formData.value.img = url
}
</script>

<template>
  <IModal v-if="props.isOpen" @close="emit('close')">
    <div class="w-[750px]">
      <div class="flex gap-2 items-center mb-10">
        <MarkerIcon height="18" width="18" />
        <span class="font-bold text-base">Редагувати маркер</span>
      </div>

      <form @submit.prevent="emit('submit', formData)">
        <div class="flex gap-5">
          <div class="w-5/12">
            <img
              class="w-full h-[276px] object-cover rounded-md"
              :src="formData.img || fallbackImage"
              alt="place img"
            />
          </div>

          <div class="w-7/12">
            <IInput label="Локація" v-model="formData.title" />
            <div class="mt-4">
              <IInput label="Опис" type="textarea" v-model="formData.description" />
            </div>
            <IButton class="mt-10 w-full" variant="gradient" :is-loading="props.isLoading">
              Зберегти
            </IButton>
          </div>
        </div>

        <InputImage class="mt-3" @uploaded="handleChangeImg">
          <span class="text-xs">Натисніть тут, щоб додати інше фото</span>
        </InputImage>
      </form>
    </div>
  </IModal>
</template>
