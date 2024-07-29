<script setup>
import { computed, ref } from 'vue'

import { useModal } from '@/composables/useModal'
import { useMutation } from '@/composables/useMutation'

import { deleteFavoritePlace, updateFavoritePlace } from '@/api/favorite-places'

import FavoritePlace from '@/components/FavoritePlace/FavoritePlace.vue'
import IButton from '@/components/IButton/IButton.vue'
import EditPlaceModal from '@/components/EditPlaceModal/EditPlaceModal.vue'
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal.vue'

const props = defineProps({
  items: {
    required: true,
    type: Array
  },
  activeId: {
    required: true,
    type: [String, null]
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

const emit = defineEmits(['place-clicked', 'create', 'updated'])

const selectedId = ref(null)
const selectedItem = computed(() => props.items.find((place) => place.id === selectedId.value))
const idOfDeletedItem = ref(null)

const { isOpen: isEditOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal()
const {
  isOpen: isConfirmationModalOpen,
  openModal: openConfirmationModal,
  closeModal: closeConfirmationModal
} = useModal()

const { mutation: updatePlace, isLoading: isUpdatingPlace } = useMutation({
  mutationFn: (formData) => updateFavoritePlace(formData),
  onSuccess: () => {
    closeEditModal()
    emit('updated')
  }
})

const {
  mutation: deletePlace,
  isLoading: isDeletingPlace,
  error: deletePlaceError
} = useMutation({
  mutationFn: (id) => deleteFavoritePlace(id),
  onSuccess: () => {
    closeConfirmationModal()
    idOfDeletedItem.value = null
    emit('updated')
  }
})

const handleEditPlace = (id) => {
  selectedId.value = id
  openEditModal()
}

const handleSubmit = (formData) => {
  updatePlace(formData)
}

const handleOpenConfirmationModal = (id) => {
  idOfDeletedItem.value = id
  openConfirmationModal()
}

const handleDeletePlace = () => {
  deletePlace(idOfDeletedItem.value)
}
</script>

<template>
  <div class="px-6 text-black">
    <div class="text-gray mb-4">Додані маркери</div>

    <slot name="label"></slot>

    <slot name="list">
      <template v-if="props.isLoading">
        <p>Loading...</p>
      </template>

      <template v-else-if="props.hasError">
        <p class="text-red-500">Щось пішло не так...</p>
      </template>

      <template v-else>
        <p v-if="items.length === 0">Список порожній</p>

        <FavoritePlace
          v-for="place in props.items"
          :key="place.id"
          :title="place.title"
          :description="place.description"
          :img="place.img"
          :is-active="place.id === props.activeId"
          @click="emit('place-clicked', place.id)"
          @edit="handleEditPlace(place.id)"
          @delete="handleOpenConfirmationModal(place.id)"
        />
      </template>

      <EditPlaceModal
        :is-open="isEditOpen"
        :place="selectedItem"
        :is-loading="isUpdatingPlace"
        @submit="handleSubmit"
        @close="closeEditModal"
      />

      <ConfirmationModal
        title="Ви дійсно хочете видалити улюблене місце?"
        :is-open="isConfirmationModalOpen"
        :is-loading="isDeletingPlace"
        :has-error="deletePlaceError"
        @cancel="closeConfirmationModal"
        @confirm="handleDeletePlace"
      />
    </slot>

    <IButton class="w-full mt-10" variant="gradient" @click="emit('create')">Додати маркер</IButton>
  </div>
</template>
