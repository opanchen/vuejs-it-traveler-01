<script setup>
import { reactive, toRaw } from 'vue'

import IInput from '@/components/IInput/IInput.vue'
import IButton from '@/components/IButton/IButton.vue'

const emit = defineEmits(['submit'])

const userData = reactive({
  email: '',
  password: ''
})
</script>

<template>
  <form @submit.prevent="emit('submit', toRaw(userData))">
    <IInput
      v-model="userData.email"
      class="mb-4"
      label="Електронна пошта"
      placeholder="john.doe@mail.com"
    />
    <IInput v-model="userData.password" label="Пароль" type="password" placeholder="******" />

    <IButton class="mt-10 w-full" variant="gradient" type="submit">Увійти</IButton>
  </form>
</template>
