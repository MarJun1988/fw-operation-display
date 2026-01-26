<script lang="ts" setup>
import { computed, type ComputedRef, ref, watch } from 'vue'
import { type Router, useRoute, useRouter } from 'vue-router'
import type { SiteStyle } from '@/utils/interfaces.ts'
import { storeToRefs } from 'pinia'
import DialogSiteStyle from '@/components/Dialogs/DialogSiteStyle.vue'
import { useSiteStyleStore } from '@/stores/siteStyle.ts'
import MessageError from '@/components/MessageError.vue'
import { useCommonStore } from '@/stores/common.ts'

const visible = ref(true)

const router: Router = useRouter()
const route = useRoute()

const store = useSiteStyleStore()
const { item } = storeToRefs(store)

// allgemeiner Store
const common = useCommonStore()
const { isLoading, error } = storeToRefs(common)

const isReadOnly: ComputedRef<boolean> = computed(() => {
  return !!(isLoading.value || error.value)
})

// watch works directly on a ref
watch(visible, async (newVisible) => {
  if (!newVisible) {
    await router.push({ name: 'site-style-overview' })
  }
})

const defaultSiteStyle: SiteStyle = {
  id: '',
  name: '',
  description: '',
  htmlStyle: '',
  htmlClass: '',
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
      Object.assign(formSiteStyle.value, store.item.name)
    }
  },
  { immediate: true },
)

/**
 *
 */
const formSiteStyle: ComputedRef<SiteStyle> = computed({
  get: () => item.value,
  set: (val) => (item.value = val),
})

// Dialog schließen
const hideDialog = () => {
  visible.value = false
  item.value = { ...defaultSiteStyle } // reset
}
// Löschen des Eintrages
const deleteSiteStyle = () => {
  if (formSiteStyle.value?.name?.trim()) {
    if (formSiteStyle.value.id) {
      store.deleteItem([formSiteStyle.value.id])
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
    header="Seiten Darstellung"
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
      <DialogSiteStyle />
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
          @click="deleteSiteStyle"
        />
      </div>
    </template>
  </Dialog>
</template>
