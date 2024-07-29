<script setup>
import { useRouter } from 'vue-router'

import { authService } from '@/api/auth-service'

import { useMutation } from '@/composables/useMutation'

import LoginForm from '@/components/Auth/LoginForm/LoginForm.vue'

const router = useRouter()
const {
  isLoading,
  error,
  mutation: handleLogin
} = useMutation({
  mutationFn: (data) => authService.login(data),
  onSuccess: () => router.replace('/map')
})
</script>

<template>
  <LoginForm @submit="handleLogin" :is-loading="isLoading" />
  <p v-if="error" class="text-red-500">{{ error.message }}</p>
</template>
