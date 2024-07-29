<script setup>
import { reactive, toRaw } from 'vue'

import IInput from '@/components/IInput/IInput.vue'
import IButton from '@/components/IButton/IButton.vue'

const props = defineProps({
  isLoading: {
    default: false,
    type: Boolean
  }
})

const emit = defineEmits(['submit'])

const userData = reactive({
  name: '',
  email: '',
  password: ''
})
</script>

<template>
  <form @submit.prevent="emit('submit', toRaw(userData))">
    <IInput class="mb-4" label="Повне імʼя" v-model="userData.name" />
    <IInput
      class="mb-4"
      label="Електронна пошта"
      placeholder="john.doe@mail.com"
      v-model="userData.email"
    />
    <IInput label="Пароль" type="password" placeholder="******" v-model="userData.password" />

    <IButton class="mt-10 w-full" variant="gradient" type="submit" :is-loading="props.isLoading"
      >Створити акаунт</IButton
    >
  </form>
</template>
