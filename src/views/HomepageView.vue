<script setup>
import IButton from '../components/IButton/IButton.vue'
</script>

<template>
  <main class="flex h-screen outline-dashed">
    <section class="flex-1 flex justify-center items-center px-5 bg-primary">
      <div class="text-white text-center">
        <img class="inline mb-6" src="../assets/images/map-pin.svg" />

        <h1 class="font-bolt text-4xl mb-7">IT Traveler</h1>

        <p class="leading-6 mb-11">
          Простий і зручний веб додаток, який дозволить тобі відмічати твої улюблені місця, а також
          ті, в яких би ти дуже хотів побувати. Тож не зволікай і спробуй сам.
        </p>

        <IButton>Почати роботу</IButton>
      </div>
    </section>

    <section class="flex-1">
      <img class="h-full w-full object-cover" src="../assets/images/static-map.png" alt="" />
    </section>
  </main>
</template>
