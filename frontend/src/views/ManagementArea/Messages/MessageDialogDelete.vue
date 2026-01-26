<script lang="ts" setup>
import { computed, type ComputedRef, ref, watch } from 'vue'
import { type Router, useRoute, useRouter } from 'vue-router'
import type { Message } from '@/utils/interfaces.ts'
import { storeToRefs } from 'pinia'
import { useMessageStore } from '@/stores/message.ts'
import DialogMessage from '@/components/Dialogs/DialogMessage.vue'
import MessageError from '@/components/MessageError.vue'
import { useCommonStore } from '@/stores/common.ts'

const visible = ref(true)

const router: Router = useRouter()
const route = useRoute()

const store = useMessageStore()
const { item } = storeToRefs(store)

// allgemeiner Store
const common = useCommonStore()
const { isLoading, error } = storeToRefs(common)

const isReadOnly: ComputedRef<boolean> = computed(() => {
  return !!(isLoading.value || error.value)
})

const defaultMessage: Message = {
  id: '',
  headline: '',
  message: '',
  iconId: '',
  icon: {
    id: '',
    name: '',
    path: '',
    comment: '',
  },
  sorting: 0,
  comment: '',
  createdAt: undefined,
  updatedAt: undefined,
}

// watch works directly on a ref
watch(visible, async (newVisible) => {
  if (!newVisible) {
    await router.push({ name: 'message-overview' })
  }
})

watch(
  () => route.params.id,
  async (id) => {
    if (id) {
      await store.fetchOnlyItem(id)
      Object.assign(formMessage.value, store.item.headline)
    } else {
      item.value = { ...defaultMessage } // reset
    }
  },
  { immediate: true },
)

/**
 *
 */
const formMessage: ComputedRef<Message> = computed({
  get: () => item.value,
  set: (val) => (item.value = val),
})

// Dialog schließen
const hideDialog = () => {
  visible.value = false
  item.value = { ...defaultMessage } // reset
}
// Löschen des Eintrages
const deleteMessage = () => {
  if (formMessage.value?.headline?.trim()) {
    if (formMessage.value.id) {
      store.deleteItem([formMessage.value.id])
    }
    hideDialog()
  }
}
</script>

<template>
  <Dialog
    v-model:visible="visible"
    :block-scroll="true"
    class="w-4/5 sm:w-3/5"
    header="Mitteilung"
    modal
    pt:footer="border-t"
    pt:header="border-b"
  >
    <MessageError v-if="isReadOnly" />
    <!-- Hauptinhalt -->
    <div class="grid grid-cols-4 gap-7 mt-7">
      <!-- einzelne Eingabefelder -->
      <DialogMessage />
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

        <!-- Erstellen / Speichern Knopf -->
        <Button
          :disabled="isReadOnly"
          class="md:order-2 lg:order-3"
          icon="pi pi-check"
          label="löschen"
          severity="error"
          size="small"
          @click="deleteMessage"
        />
      </div>
    </template>
  </Dialog>
</template>
