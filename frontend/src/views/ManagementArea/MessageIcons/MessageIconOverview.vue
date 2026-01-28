<script lang="ts" setup>
import DefaultTable from '@/components/DefaultTable.vue'
import { useMessageIconStore } from '@/stores/messageIcon.ts'

// Pinia Stores
const store = useMessageIconStore()
</script>

<template>
  <!--  Tabelle -->
  <DefaultTable
    :store="store"
    state-key="dataTable-message-icons"
    :delete-disabled="false"
  />
</template>
