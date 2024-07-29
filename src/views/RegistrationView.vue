<script setup>
import { useRouter } from 'vue-router'

import { authService } from '@/api/auth-service'

import { useMutation } from '@/composables/useMutation'

import RegistrationForm from '@/components/Auth/RegistrationForm/RegistrationForm.vue'

const router = useRouter()

const {
  isLoading,
  error,
  mutation: handleRegisterUser
} = useMutation({
  mutationFn: (data) => authService.registerUser(data),
  onSuccess: () => router.replace('/map')
})
</script>

<template>
  <RegistrationForm @submit="handleRegisterUser" :is-loading="isLoading" />
  <p v-if="error" class="text-red-500">{{ error.message }}</p>
</template>
