<script lang="ts" setup>
import {computed, type ComputedRef, ref, watch} from 'vue'
import {type Router, useRoute, useRouter} from 'vue-router'
import type {Version} from '@/utils/interfaces.ts'
import {storeToRefs} from 'pinia'
import MessageError from '@/components/MessageError.vue'
import {useCommonStore} from '@/stores/common.ts'
import {useVersionStore} from "@/stores/version.ts";
import DialogVersion from "@/components/Dialogs/DialogVersion.vue";

const visible = ref(true)

const router: Router = useRouter()
const route = useRoute()

const store = useVersionStore()
const {item} = storeToRefs(store)

// watch works directly on a ref
watch(visible, async (newVisible) => {
  if (!newVisible) {
    await router.push({name: 'version-overview'})
  }
})

const defaultVersion: Version = {
  id: '',
  versionNumber: '',
  description: '',
  comment: '',
  createdAt: undefined,
  updatedAt: undefined,
}

watch(
  () => route.params.id,
  async (id) => {
    if (id) {
      await store.fetchOnlyItem(id)
      Object.assign(formVersion.value, store.item)
    }
  },
  {immediate: true},
)

/**
 *
 */
const formVersion: ComputedRef<Version> = computed({
  get: () => item.value,
  set: (val) => (item.value = val),
})

// Dialog schließen
const hideDialog = () => {
  visible.value = false
  item.value = {...defaultVersion} // reset
}
// Löschen des Eintrages
const deleteVersion = () => {
  if (formVersion.value?.versionNumber?.trim()) {
    if (formVersion.value.id) {
      store.deleteItem([formVersion.value.id])
    }
    hideDialog()
  }
}

// allgemeiner Store
const common = useCommonStore()
const {isLoading, error} = storeToRefs(common)

const isReadOnly: ComputedRef<boolean> = computed(() => {
  return !!(isLoading.value || error.value)
})
</script>

<template>
  <Dialog
    v-model:visible="visible"
    :block-scroll="true"
    class="w-4/5 sm:w-3/5"
    header="Version"
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
      <DialogVersion />
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
          @click="deleteVersion"
        />
      </div>
    </template>
  </Dialog>
</template>
