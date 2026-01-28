<script lang="ts" setup>
import { computed, type ComputedRef, onMounted } from 'vue'
import type { Message } from '@/utils/interfaces.ts'
import { storeToRefs } from 'pinia'
import { useMessageStore } from '@/stores/message.ts'
import { useMessageIconStore } from '@/stores/messageIcon.ts'
import type { SelectChangeEvent } from 'primevue/select'
import { useCommonStore } from '@/stores/common.ts'

// allgemeiner Store
const common = useCommonStore()
const { isLoading, error } = storeToRefs(common)

const store = useMessageStore()
const storeMessageIcon = useMessageIconStore()
storeMessageIcon.fetchAllItems()
const { item } = storeToRefs(store)
const { allItems, totalCount } = storeToRefs(storeMessageIcon)

/**
 *
 */
const formMessage: ComputedRef<Message> = computed({
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

const onChange = (value: SelectChangeEvent): void => {
  formMessage.value.iconId = value.value.id
}

const isReadOnly: ComputedRef<boolean> = computed(() => {
  return !!(isLoading.value || error.value)
})

onMounted(() => {
  if (formMessage.value && !formMessage.value.id) {
    formMessage.value.sorting = totalCount.value + 1
  }
})
</script>

<template>
  <!-- ID -->
  <div class="col-span-4 sm:col-span-2 hidden lg:block">
    <FloatLabel>
      <InputText
        id="input-id"
        v-model="formMessage.id"
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
        v-model="formMessage.createdAt"
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
        v-model="formMessage.updatedAt"
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
  <FloatLabel class="col-span-4 sm:col-span-2">
    <InputText
      id="input-headline"
      v-model="formMessage.headline"
      :readonly="isReadOnly"
      :disabled="props.isDisabled"
      fluid
      size="small"
    />
    <label for="input-headline">Überschrift</label>
  </FloatLabel>
  <!-- Icon -->
  <FloatLabel class="col-span-4 sm:col-span-2 lg:col-span-1">
    <Select
      v-model="formMessage.icon"
      :readonly="isReadOnly"
      :default-value="null"
      :disabled="props.isDisabled"
      :options="allItems"
      filter
      fluid
      input-id="select-icon-id"
      option-label="name"
      size="small"
      @change="onChange"
    >
      <template #value="slotProps">
        <div
          v-if="slotProps.value"
          class="flex items-center"
        >
          <img
            :alt="slotProps.value.name"
            :src="slotProps.value.path"
            class="mr-2 w-5"
          >
          <div>{{ slotProps.value.name }}</div>
        </div>
      </template>
      <template #option="slotProps">
        <div class="flex items-center">
          <img
            :alt="slotProps.option.name"
            :src="slotProps.option.path"
            class="mr-2 w-5"
          >
          <div>{{ slotProps.option.name }}</div>
        </div>
      </template>
    </Select>
    <label for="select-icon-id">Icon</label>
  </FloatLabel>
  <!-- Sortierung -->
  <FloatLabel class="col-span-4 sm:col-span-2 lg:col-span-1">
    <InputNumber
      id="input-sorting"
      v-model="formMessage.sorting"
      :readonly="isReadOnly"
      :disabled="props.isDisabled"
      :show-buttons="true"
      fluid
      size="small"
    />
    <label for="input-sorting">Sortierung</label>
  </FloatLabel>
  <!-- Mittelung -->
  <FloatLabel class="col-span-4 sm:col-span-4 lg:col-span-2">
    <InputText
      id="input-message"
      v-model="formMessage.message"
      :readonly="isReadOnly"
      :disabled="props.isDisabled"
      fluid
      size="small"
    />
    <label for="input-message">Mittelung</label>
  </FloatLabel>
  <!-- Kommentar -->
  <FloatLabel class="col-span-4 sm:col-span-4 lg:col-span-2">
    <InputText
      id="input-comment"
      v-model="formMessage.comment"
      :readonly="isReadOnly"
      :disabled="props.isDisabled"
      fluid
      size="small"
    />
    <label for="input-comment">Kommentar</label>
  </FloatLabel>
</template>
