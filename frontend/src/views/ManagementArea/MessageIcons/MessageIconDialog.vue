<script lang="ts" setup>
import { computed, type ComputedRef, ref, watch } from 'vue'
import { type Router, useRoute, useRouter } from 'vue-router'
import type { MessageIcon } from '@/utils/interfaces.ts'
import { storeToRefs } from 'pinia'
import DialogMessageIcon from '@/components/Dialogs/DialogMessageIcon.vue'
import { useMessageIconStore } from '@/stores/messageIcon.ts'
import MessageError from '@/components/MessageError.vue'
import { useCommonStore } from '@/stores/common.ts'

const visible = ref(true)

const router: Router = useRouter()
const route = useRoute()

const store = useMessageIconStore()
const { item } = storeToRefs(store)

// allgemeiner Store
const common = useCommonStore()
const { isLoading, error } = storeToRefs(common)

const isReadOnly: ComputedRef<boolean> = computed(() => {
  return !!(isLoading.value || error.value)
})

const defaultMessageIcon: MessageIcon = {
  id: '',
  name: '',
  path: '',
  comment: '',
  createdAt: undefined,
  updatedAt: undefined,
}

// watch works directly on a ref
watch(visible, async (newVisible) => {
  if (!newVisible) {
    await router.push({ name: 'message-icon-overview' })
  }
})

watch(
  () => route.params.id,
  async (id) => {
    if (id) {
      await store.fetchOnlyItem(id)
      Object.assign(formMessageIcon.value, store.item.name)
    } else {
      item.value = { ...defaultMessageIcon } // reset
    }
  },
  { immediate: true },
)

/**
 *
 */
const formMessageIcon: ComputedRef<MessageIcon> = computed({
  get: () => item.value,
  set: (val) => (item.value = val),
})

// Dialog schließen
const hideDialog = () => {
  visible.value = false
  item.value = { ...defaultMessageIcon } // reset
}
// Speichern des Eintrages
const saveMessageIcon = () => {
  if (formMessageIcon.value?.name?.trim()) {
    if (formMessageIcon.value.id) {
      store.updateItem(formMessageIcon.value)
    } else {
      store.createItem(formMessageIcon.value)
    }

    if (autoClose.value) {
      hideDialog()
    }
  }
}

// Dialog automatisch Schließen
const autoClose = ref(true)
</script>

<template>
  <Dialog
    v-model:visible="visible"
    :block-scroll="true"
    class="w-4/5 sm:w-3/5"
    header="Icon für Mitteilung"
    modal
    pt:footer="border-t"
    pt:header="border-b"
  >
    <MessageError v-if="isReadOnly" />
    <!-- Hauptinhalt -->
    <div class="grid grid-cols-4 gap-7 mt-7">
      <!-- einzelne Eingabefelder -->
      <DialogMessageIcon :is-disabled="false" />
    </div>

    <!-- Fußzeile -->
    <template #footer>
      <div class="flex flex-wrap gap-4 mt-4 w-full justify-between">
        <!-- Schließen Knopf -->
        <Button
          class="order-1"
          icon="pi pi-times"
          label="schließen"
          size="small"
          text
          @click="hideDialog"
        />

        <!-- Dialog, Automatisch schließen -->
        <div class="hidden lg:block w-100 order-2 md:order-3">
          <ToggleButton
            v-model="autoClose"
            class="min-w-100"
            off-icon="pi pi-check"
            off-label="Dialog bleibt offen nach aktion."
            on-icon="pi pi-times"
            on-label="Dialog, wird automatisch geschlossen."
            severity="success"
            size="small"
          />
        </div>

        <!-- Erstellen / Speichern Knopf -->
        <Button
          :disabled="isReadOnly"
          class="md:order-2 lg:order-3"
          icon="pi pi-check"
          label="speichern"
          size="small"
          @click="saveMessageIcon"
        />
      </div>
    </template>
  </Dialog>
</template>
