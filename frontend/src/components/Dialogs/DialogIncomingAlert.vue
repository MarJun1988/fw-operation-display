<script lang="ts" setup>
import { computed, type ComputedRef } from 'vue'
import type { IncomingAlert } from '@/utils/interfaces.ts'
import { storeToRefs } from 'pinia'
import { useIncomingAlertStore } from '@/stores/incomingAlert.ts'
import { useCommonStore } from '@/stores/common.ts'

const store = useIncomingAlertStore()
const { item } = storeToRefs(store)

/**
 *
 */
const formIncomingAlert: ComputedRef<IncomingAlert> = computed({
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

// allgemeiner Store
const common = useCommonStore()
const { isLoading, error } = storeToRefs(common)

const isReadOnly: ComputedRef<boolean> = computed(() => {
  return !!(isLoading.value || error.value)
})
</script>

<template>
  <!-- ID -->
  <div class="col-span-4 sm:col-span-2 hidden lg:block">
    <FloatLabel>
      <InputText
        id="input-id"
        v-model="formIncomingAlert.id"
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
        v-model="formIncomingAlert.createdAt"
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
        v-model="formIncomingAlert.updatedAt"
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
  <!-- Adresse -->
  <FloatLabel class="col-span-4 sm:col-span-2 lg:col-span-1">
    <InputText
      id="input-address"
      v-model="formIncomingAlert.address"
      :readonly="isReadOnly"
      :disabled="props.isDisabled"
      :maxlength="10"
      fluid
      max="10"
      size="small"
    />
    <label for="input-address">Address (maximal 10 Zeichen)</label>
  </FloatLabel>
  <!-- Text -->
  <FloatLabel class="col-span-4 sm:col-span-4 lg:col-span-2">
    <InputText
      id="input-text"
      v-model="formIncomingAlert.text"
      :readonly="isReadOnly"
      :disabled="props.isDisabled"
      fluid
      size="small"
    />
    <label for="input-text">Text</label>
  </FloatLabel>
  <!-- Kommentar -->
  <FloatLabel class="col-span-4 sm:col-span-4 lg:col-span-1">
    <InputText
      id="input-comment"
      v-model="formIncomingAlert.comment"
      :readonly="isReadOnly"
      :disabled="props.isDisabled"
      fluid
      size="small"
    />
    <label for="input-comment">Kommentar</label>
  </FloatLabel>
</template>
