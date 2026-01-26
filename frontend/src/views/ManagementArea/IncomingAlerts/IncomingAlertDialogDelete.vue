<script lang="ts" setup>
import { computed, type ComputedRef, ref, watch } from 'vue'
import { type Router, useRoute, useRouter } from 'vue-router'
import type { IncomingAlert } from '@/utils/interfaces.ts'
import { storeToRefs } from 'pinia'
import { useIncomingAlertStore } from '@/stores/incomingAlert.ts'
import DialogIncomingAlert from '@/components/Dialogs/DialogIncomingAlert.vue'
import MessageError from '@/components/MessageError.vue'
import { useCommonStore } from '@/stores/common.ts'

const visible = ref(true)

const router: Router = useRouter()
const route = useRoute()

const store = useIncomingAlertStore()
const { item } = storeToRefs(store)

// allgemeiner Store
const common = useCommonStore()
const { isLoading, error } = storeToRefs(common)

const isReadOnly: ComputedRef<boolean> = computed(() => {
  return !!(isLoading.value || error.value)
})

const defaultIncomingAlert: IncomingAlert = {
  id: '',
  text: '',
  address: '',
  comment: '',
  createdAt: undefined,
  updatedAt: undefined,
}

// watch works directly on a ref
watch(visible, async (newVisible) => {
  if (!newVisible) {
    await router.push({ name: 'incoming-alert-overview' })
  }
})

watch(
  () => route.params.id,
  async (id) => {
    if (id) {
      await store.fetchOnlyItem(id)
      Object.assign(formIncomingAlert.value, store.item.text)
    }
  },
  { immediate: true },
)

/**
 *
 */
const formIncomingAlert: ComputedRef<IncomingAlert> = computed({
  get: () => item.value,
  set: (val) => (item.value = val),
})

// Dialog schließen
const hideDialog = () => {
  visible.value = false
  item.value = { ...defaultIncomingAlert } // reset
}
// Löschen des Eintrages
const deleteIncomingAlert = () => {
  if (formIncomingAlert.value?.text?.trim()) {
    if (formIncomingAlert.value.id) {
      store.deleteItem([formIncomingAlert.value.id])
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
    header="Alarmierung"
    modal
    pt:footer="border-t"
    pt:header="border-b"
  >
    <MessageError v-if="isReadOnly" />
    <!-- Hauptinhalt -->
    <div class="grid grid-cols-4 gap-7 mt-7">
      <!-- einzelne Eingabefelder -->
      <DialogIncomingAlert />
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

        <!-- löschen Knopf -->
        <Button
          :disabled="isReadOnly"
          class="md:order-2 lg:order-3"
          icon="pi pi-check"
          label="löschen"
          severity="danger"
          size="small"
          @click="deleteIncomingAlert"
        />
      </div>
    </template>
  </Dialog>
</template>
