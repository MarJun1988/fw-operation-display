<script lang="ts" setup>
import {computed, type ComputedRef, ref, watch} from 'vue'
import {type Router, useRoute, useRouter} from 'vue-router'
import type {Version} from '@/utils/interfaces.ts'
import {storeToRefs} from 'pinia'
import {useCommonStore} from '@/stores/common.ts'
import MessageError from '@/components/MessageError.vue'
import {useVersionStore} from "@/stores/version.ts";
import DialogVersion from "@/components/Dialogs/DialogVersion.vue";

const visible = ref(true)

const router: Router = useRouter()
const route = useRoute()

const store = useVersionStore()
const {item} = storeToRefs(store)

// allgemeiner Store
const common = useCommonStore()
const {isLoading, error} = storeToRefs(common)

const isReadOnly: ComputedRef<boolean> = computed(() => {
  return !!(isLoading.value || error.value)
})

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
    } else {
      item.value = {...defaultVersion} // reset
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
// Speichern des Eintrages
const saveVersion = () => {
  if (formVersion.value?.versionNumber?.trim()) {
    if (formVersion.value.id) {
      store.updateItem(formVersion.value)
    } else {
      store.createItem(formVersion.value)
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
    class="w-4/5 sm:w-3/5"
    header="Version"
    modal
    pt:footer="border-t"
    pt:header="border-b"
  >
    <MessageError v-if="isReadOnly" />
    <!-- Hauptinhalt -->
    <div class="grid grid-cols-4 gap-7 mt-7">
      <!-- einzelne Eingabefelder -->
      <DialogVersion :is-disabled="false" />
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
        <div class="hidden lg:block min-w-100 order-2 md:order-3">
          <ToggleButton
            v-model="autoClose"
            class="min-w-100"
            off-icon="pi pi-check"
            off-label="Dialog bleibt nach der Aktion offen"
            on-icon="pi pi-times"
            on-label="Dialog wird nach der Aktion automatisch geschlossen"
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
          @click="saveVersion"
        />
      </div>
    </template>
  </Dialog>
</template>
