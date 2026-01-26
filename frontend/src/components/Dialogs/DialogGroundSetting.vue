<script lang="ts" setup>
import type { General } from '@/utils/interfaces.ts'
import { useGeneralStore } from '@/stores/general.ts'
import { storeToRefs } from 'pinia'
import { computed, type ComputedRef, onMounted, ref, type Ref } from 'vue'
import { useCommonStore } from '@/stores/common.ts'

// allgemeiner Store
const common = useCommonStore()
const { isLoading, error } = storeToRefs(common)

const store = useGeneralStore()
const { item, totalCount } = storeToRefs(store)

/**
 *
 */
const formGeneral: ComputedRef<General> = computed({
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
  return !!(formGeneral.value && formGeneral.value && formGeneral.value.id && !isDev.value)
})

const isReadOnly: ComputedRef<boolean> = computed(() => {
  return !!(isLoading.value || error.value)
})

if (import.meta.env.DEV) {
  isDev.value = true
}

onMounted(() => {
  if (formGeneral.value && !formGeneral.value.id) {
    formGeneral.value.sorting = totalCount.value + 1
  }
})
</script>

<template>
  <!-- ID -->
  <div class="col-span-4 sm:col-span-2 hidden lg:block">
    <FloatLabel>
      <InputText
        id="input-id"
        v-model="formGeneral.id"
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
        v-model="formGeneral.createdAt"
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
        v-model="formGeneral.updatedAt"
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
  <FloatLabel class="col-span-4 sm:col-span-4 lg:col-span-2">
    <InputText
      id="input-name"
      v-model="formGeneral.name"
      :disabled="props.isDisabled || isEditableDisabled"
      :readonly="isReadOnly"
      fluid
      size="small"
    />
    <label for="input-name">Name</label>
  </FloatLabel>
  <!-- Text -->
  <FloatLabel class="col-span-4 sm:col-span-4 lg:col-span-2">
    <InputText
      id="input-wert"
      v-model="formGeneral.value"
      :disabled="props.isDisabled"
      :readonly="isReadOnly"
      fluid
      size="small"
    />
    <label for="input-wert">Wert</label>
  </FloatLabel>
  <!-- Sortierung -->
  <FloatLabel class="col-span-4 sm:col-span-2 lg:col-span-1">
    <InputNumber
      id="input-sorting"
      v-model="formGeneral.sorting"
      :disabled="props.isDisabled"
      :readonly="isReadOnly"
      :show-buttons="true"
      fluid
      size="small"
    />
    <label for="input-sorting">Sortierung</label>
  </FloatLabel>
  <!-- Kommentar -->
  <FloatLabel class="col-span-4 sm:col-span-4 lg:col-span-3">
    <InputText
      id="input-comment"
      v-model="formGeneral.comment"
      :disabled="props.isDisabled"
      :readonly="isReadOnly"
      fluid
      size="small"
    />
    <label for="input-comment">Kommentar</label>
  </FloatLabel>
</template>
