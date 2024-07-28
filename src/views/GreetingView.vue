<script setup>
import BaseLayout from '@/layouts/BaseLayout.vue'
import IButton from '@/components/IButton/IButton.vue'
</script>

<template>
  <BaseLayout>
    <div class="text-center">
      <img class="inline mb-6" src="../assets/images/map-pin.svg" />

      <h1 class="font-bolt text-4xl mb-7">IT Traveler</h1>

      <p class="leading-6 mb-11">
        Простий і зручний веб додаток, який дозволить тобі відмічати твої улюблені місця, а також
        ті, в яких би ти дуже хотів побувати. Тож не зволікай і спробуй сам.
      </p>

      <IButton to="/auth/registration">Почати роботу</IButton>
    </div>
  </BaseLayout>
</template>
