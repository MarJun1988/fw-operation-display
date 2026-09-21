<script lang="ts" setup>
import DefaultTable from '@/components/DefaultTable.vue'
import { useMessageStore } from '@/stores/message.ts'

// Pinia Stores
const store = useMessageStore()
</script>

<template>
  <!--  Tabelle -->
  <DefaultTable
    state-key="dataTable-messages"
    :store="store"
    :delete-disabled="false"
  />
</template>
