<script lang="ts" setup>
import type {Version} from '@/utils/interfaces.ts'
import {useVersionStore} from '@/stores/version.ts'
import {storeToRefs} from 'pinia'
import {computed, type ComputedRef, ref, type Ref} from 'vue'
import {useCommonStore} from '@/stores/common.ts'

// allgemeiner Store
const common = useCommonStore()
const {isLoading, error} = storeToRefs(common)

const store = useVersionStore()
const {item} = storeToRefs(store)

/**
 *
 */
const formVersion: ComputedRef<Version> = computed({
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
  return !!(formVersion.value && formVersion.value && formVersion.value.id && !isDev.value)
})

const isReadOnly: ComputedRef<boolean> = computed(() => {
  return !!(isLoading.value || error.value)
})

if (import.meta.env.DEV) {
  isDev.value = true

}

</script>

<template>
  <!-- ID -->
  <div class="col-span-4 sm:col-span-2 hidden lg:block">
    <FloatLabel>
      <InputText
        id="input-id"
        v-model="formVersion.id"
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
        v-model="formVersion.createdAt"
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
        v-model="formVersion.updatedAt"
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
  <!-- Versionsnummer -->
  <FloatLabel class="col-span-4 sm:col-span-4 lg:col-span-2">
    <InputText
      id="input-versions-nummer"
      v-model="formVersion.versionNumber"
      :disabled="props.isDisabled || isEditableDisabled"
      :readonly="isReadOnly"
      fluid
      size="small"
    />
    <label for="input-versions-nummer">Versionsnummer</label>
  </FloatLabel>
  <!-- Beschreibung -->
  <FloatLabel class="col-span-4 sm:col-span-4 lg:col-span-2">
    <InputText
      id="input-description"
      v-model="formVersion.description"
      :disabled="props.isDisabled"
      :readonly="isReadOnly"
      fluid
      size="small"
    />
    <label for="input-description">Beschreibung</label>
  </FloatLabel>
  <!-- Kommentar -->
  <FloatLabel class="col-span-4 sm:col-span-4 lg:col-span-3">
    <InputText
      id="input-comment"
      v-model="formVersion.comment"
      :disabled="props.isDisabled"
      :readonly="isReadOnly"
      fluid
      size="small"
    />
    <label for="input-comment">Kommentar</label>
  </FloatLabel>
</template>
