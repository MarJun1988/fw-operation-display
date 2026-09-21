<script lang="ts" setup>
import { computed, type ComputedRef, ref, watch } from 'vue'
import { type Router, useRoute, useRouter } from 'vue-router'
import { useGeneralStore } from '@/stores/general.ts'
import type { General } from '@/utils/interfaces.ts'
import { storeToRefs } from 'pinia'
import DialogGroundSetting from '@/components/Dialogs/DialogGroundSetting.vue'
import MessageError from '@/components/MessageError.vue'
import { useCommonStore } from '@/stores/common.ts'

const visible = ref(true)

const router: Router = useRouter()
const route = useRoute()

const store = useGeneralStore()
const { item } = storeToRefs(store)

// watch works directly on a ref
watch(visible, async (newVisible) => {
  if (!newVisible) {
    await router.push({ name: 'ground-setting-overview' })
  }
})

const defaultGeneral: General = {
  id: '',
  name: '',
  value: '',
  sorting: 0,
  comment: '',
  createdAt: undefined,
  updatedAt: undefined,
}

watch(
  () => route.params.id,
  async (id) => {
    if (id) {
      await store.fetchOnlyItem(id)
      Object.assign(formGeneral.value, store.item.value)
    }
  },
  { immediate: true },
)

/**
 *
 */
const formGeneral: ComputedRef<General> = computed({
  get: () => item.value,
  set: (val) => (item.value = val),
})

// Dialog schließen
const hideDialog = () => {
  visible.value = false
  item.value = { ...defaultGeneral } // reset
}
// Löschen des Eintrages
const deleteGeneral = () => {
  if (formGeneral.value?.name?.trim()) {
    if (formGeneral.value.id) {
      store.deleteItem([formGeneral.value.id])
    }
    hideDialog()
  }
}

// allgemeiner Store
const common = useCommonStore()
const { isLoading, error } = storeToRefs(common)

const isReadOnly: ComputedRef<boolean> = computed(() => {
  return !!(isLoading.value || error.value)
})
</script>

<template>
  <Dialog
    v-model:visible="visible"
    :block-scroll="true"
    class="w-4/5 sm:w-3/5"
    header="Grundeinstellung"
    modal
    pt:footer="border-t"
    pt:header="border-b"
  >
    <MessageError v-if="isReadOnly" />

    <!-- Hauptinhalt -->
    <div class="grid grid-cols-4 gap-7 mt-7">
      <!-- Textmeldung -->
      <Message
        class="col-span-4 mb-2"
        icon="pi pi-exclamation-triangle"
        pt:text:class="font-bold !text-2xl w-full text-center"
        severity="error"
        size="large"
      >
        Wollen Sie diesen Eintrag löschen?
      </Message>
      <!-- einzelne Eingabefelder -->
      <DialogGroundSetting />
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

        <!-- Löschen Knopf -->
        <Button
          :disabled="isReadOnly"
          class="md:order-2 lg:order-3"
          icon="pi pi-check"
          label="löschen"
          severity="danger"
          size="small"
          @click="deleteGeneral"
        />
      </div>
    </template>
  </Dialog>
</template>
