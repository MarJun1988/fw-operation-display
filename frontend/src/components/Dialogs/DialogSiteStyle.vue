<script lang="ts" setup>
import type { SiteStyle } from '@/utils/interfaces.ts'
import { storeToRefs } from 'pinia'
import { computed, type ComputedRef, onMounted, ref, type Ref } from 'vue'
import { useSiteStyleStore } from '@/stores/siteStyle.ts'
import { useCommonStore } from '@/stores/common.ts'

// allgemeiner Store
const common = useCommonStore()
const { isLoading, error } = storeToRefs(common)

const store = useSiteStyleStore()
const { item, totalCount } = storeToRefs(store)

/**
 *
 */
const formSiteStyle: ComputedRef<SiteStyle> = computed({
  get: () => item.value,
  set: (val) => (item.value = val),
})
const props = withDefaults(
  defineProps<{
    isDisabled?: boolean
  }>(),
  {
    isDisabled: true,
  },
)

const isDev: Ref<boolean> = ref(false)
const isEditableDisabled: ComputedRef<boolean> = computed(() => {
  return !!(formSiteStyle.value && formSiteStyle.value && formSiteStyle.value.id && !isDev.value)
})

if (import.meta.env.DEV) {
  isDev.value = true
}

const isReadOnly: ComputedRef<boolean> = computed(() => {
  return !!(isLoading.value || error.value)
})

onMounted(() => {
  if (formSiteStyle.value && !formSiteStyle.value.id) {
    formSiteStyle.value.sorting = totalCount.value + 1
  }
})
</script>

<template>
  <!-- ID -->
  <div class="col-span-4 sm:col-span-2 hidden lg:block">
    <FloatLabel>
      <InputText
        id="input-id"
        v-model="formSiteStyle.id"
        :readonly="isReadOnly"
        disabled
        fluid
        size="small"
      />
      <label for="input-id">ID</label>
    </FloatLabel>
  </div>
  <!-- erstellt am -->
  <div class="col-span-4 sm:col-span-2 lg:col-span-1 hidden lg:block">
    <FloatLabel>
      <DatePicker
        v-model="formSiteStyle.createdAt"
        :readonly="isReadOnly"
        disabled
        fluid
        icon-display="input"
        input-id="input-created-at"
        show-icon
        show-time
        size="small"
      />
      <label for="input-created-at">erstellt um</label>
    </FloatLabel>
  </div>
  <!-- letzte bearbeitung -->
  <div class="col-span-4 sm:col-span-2 lg:col-span-1 hidden lg:block">
    <FloatLabel>
      <DatePicker
        v-model="formSiteStyle.updatedAt"
        :readonly="isReadOnly"
        disabled
        fluid
        icon-display="input"
        input-id="input-updated-at"
        show-icon
        show-time
        size="small"
      />
      <label for="input-updated-at">letzte bearbeitung</label>
    </FloatLabel>
  </div>
  <!-- Name -->
  <FloatLabel class="col-span-4 sm:col-span-2 lg:col-span-1">
    <InputText
      id="input-name"
      v-model="formSiteStyle.name"
      :disabled="props.isDisabled || isEditableDisabled"
      :readonly="isReadOnly"
      fluid
      size="small"
    />
    <label for="input-name">Name</label>
  </FloatLabel>
  <!-- Beschreibung -->
  <FloatLabel class="col-span-4 sm:col-span-4 lg:col-span-2">
    <InputText
      id="input-description"
      v-model="formSiteStyle.description"
      :disabled="props.isDisabled"
      :readonly="isReadOnly"
      fluid
      size="small"
    />
    <label for="input-description">Beschreibung</label>
  </FloatLabel>
  <!-- Sortierung -->
  <FloatLabel class="col-span-4 sm:col-span-2 lg:col-span-1">
    <InputNumber
      id="input-sorting"
      v-model="formSiteStyle.sorting"
      :disabled="props.isDisabled"
      :readonly="isReadOnly"
      :show-buttons="true"
      fluid
      size="small"
    />
    <label for="input-sorting">Sortierung</label>
  </FloatLabel>
  <!-- Style (CSS) -->
  <FloatLabel class="col-span-4 sm:col-span-4 lg:col-span-4">
    <Textarea
      id="input-html-style"
      v-model="formSiteStyle.htmlStyle"
      :disabled="props.isDisabled"
      :readonly="isReadOnly"
      fluid
      rows="3"
      size="small"
    />
    <label for="input-html-style">Style (CSS)</label>
  </FloatLabel>
  <!-- Class (CSS) -->
  <FloatLabel class="col-span-4 sm:col-span-4 lg:col-span-4">
    <Textarea
      id="input-html-class"
      v-model="formSiteStyle.htmlClass"
      :disabled="props.isDisabled"
      :readonly="isReadOnly"
      fluid
      rows="3"
      size="small"
    />
    <label for="input-html-class">Class (CSS)</label>
  </FloatLabel>
  <!-- Kommentar -->
  <FloatLabel class="col-span-4 sm:col-span-4 lg:col-span-4">
    <InputText
      id="input-comment"
      v-model="formSiteStyle.comment"
      :disabled="props.isDisabled"
      :readonly="isReadOnly"
      fluid
      size="small"
    />
    <label for="input-comment">Kommentar</label>
  </FloatLabel>
</template>
