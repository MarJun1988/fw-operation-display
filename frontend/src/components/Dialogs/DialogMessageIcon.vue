<script lang="ts" setup>
import { computed, type ComputedRef } from 'vue'
import type { MessageIcon } from '@/utils/interfaces.ts'
import { storeToRefs } from 'pinia'
import { useMessageIconStore } from '@/stores/messageIcon.ts'
import { useCommonStore } from '@/stores/common.ts'

// allgemeiner Store
const common = useCommonStore()
const { isLoading, error } = storeToRefs(common)

const store = useMessageIconStore()
const { item } = storeToRefs(store)

/**
 *
 */
const formMessageIcon: ComputedRef<MessageIcon> = computed({
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
        v-model="formMessageIcon.id"
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
        v-model="formMessageIcon.createdAt"
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
        v-model="formMessageIcon.updatedAt"
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
  <!-- Überschrift -->
  <FloatLabel class="col-span-4 sm:col-span-2 lg:col-span-1">
    <InputText
      id="input-name"
      v-model="formMessageIcon.name"
      :disabled="props.isDisabled"
      :readonly="isReadOnly"
      fluid
      size="small"
    />
    <label for="input-name">Bezeichnung</label>
  </FloatLabel>
  <!-- Pfad -->
  <FloatLabel class="col-span-4 sm:col-span-2">
    <div class="flex items-center">
      <img
        v-if="formMessageIcon.path"
        :alt="formMessageIcon.name ?? ''"
        :src="formMessageIcon.path ?? ''"
        class="mr-2 w-5"
      >
      <InputText
        id="input-path"
        v-model="formMessageIcon.path"
        :disabled="props.isDisabled"
        :readonly="isReadOnly"
        fluid
        size="small"
      />
    </div>
    <label for="input-path">Pfad</label>
  </FloatLabel>
  <!-- Kommentar -->
  <FloatLabel class="col-span-4 sm:col-span-4 lg:col-span-1">
    <InputText
      id="input-comment"
      v-model="formMessageIcon.comment"
      :disabled="props.isDisabled"
      :readonly="isReadOnly"
      fluid
      size="small"
    />
    <label for="input-comment">Kommentar</label>
  </FloatLabel>
</template>
