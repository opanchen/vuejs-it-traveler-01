<script setup>
import { computed, onMounted, ref } from 'vue'
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { mapSettings } from '@/map/settings'

import { addFavoritePlace, getFavoritePlaces } from '@/api/favorite-places'

import { useModal } from '@/composables/useModal'
import { useMutation } from '@/composables/useMutation'

import FavoritePlaces from '@/components/FavoritePlaces/FavoritePlaces.vue'
import MarkerIcon from '@/components/icons/MarkerIcon.vue'
import CreateNewPlaceModal from '@/components/CreateNewPlaceModal/CreateNewPlaceModal.vue'

// const favoritePlaces = ref([])
const activeId = ref(null)
const map = ref(null)
const mapMarkerLngLat = ref(null)

const { isOpen, openModal, closeModal } = useModal()

const {
  data,
  mutation: getPlaces,
  isLoading: isGettingPlaces,
  error: getPlacesError
} = useMutation({
  mutationFn: () => getFavoritePlaces()
})

const favoritePlaces = computed(() => data.value ?? [])

const {
  mutation: addPlace,
  isLoading: isAddingPlace,
  error: addPlaceError
} = useMutation({
  mutationFn: (newPlaceData) => addFavoritePlace(newPlaceData),
  onSuccess: () => {
    closeModal()
    mapMarkerLngLat.value = null // remove used marker
    getPlaces() // revalidate
  }
})

const changeActiveId = (id) => {
  activeId.value = id
}

const changePlace = (id) => {
  const { coordinates } = favoritePlaces.value.find((place) => place.id === id)
  changeActiveId(id)
  map.value.flyTo({ center: coordinates })
}

const handleMapClick = ({ lngLat }) => {
  mapMarkerLngLat.value = [lngLat.lng, lngLat.lat]
}

const handleAddPlace = async (formData, resetForm) => {
  const body = {
    ...formData,
    coordinates: mapMarkerLngLat.value
  }

  await addPlace(body)

  resetForm()
}

onMounted(() => {
  getPlaces()
})
</script>

<template>
  <main class="flex h-screen">
    <div class="bg-white h-full w-[400px] shrink-0 overflow-auto pb-10">
      <FavoritePlaces
        :items="favoritePlaces"
        :active-id="activeId"
        :is-loading="isGettingPlaces"
        :has-error="getPlacesError"
        @place-clicked="changePlace"
        @create="openModal"
        @updated="getPlaces"
      />

      <CreateNewPlaceModal
        :is-open="isOpen"
        :is-loading="isAddingPlace"
        :has-error="addPlaceError"
        @close="closeModal"
        @submit="handleAddPlace"
      />
    </div>

    <div class="w-full h-full flex items-center justify-center text-6xl">
      <MapboxMap
        :center="[30.523333, 50.450001]"
        :zoom="10"
        :access-token="mapSettings.apiToken"
        :map-style="mapSettings.style"
        @mb-created="(mapInstance) => (map = mapInstance)"
        @mb-click="handleMapClick"
        class="w-full h-full"
      >
        <MapboxMarker v-if="mapMarkerLngLat" :lngLat="mapMarkerLngLat" anchor="bottom">
          <MarkerIcon class="h-8 w-8" is-active />
        </MapboxMarker>

        <MapboxMarker
          v-for="place in favoritePlaces"
          :key="place.id"
          :lngLat="place.coordinates"
          anchor="bottom"
        >
          <button @click.stop="changeActiveId(place.id)">
            <MarkerIcon class="h-8 w-8" />
          </button>
        </MapboxMarker>
      </MapboxMap>
    </div>
  </main>
</template>
