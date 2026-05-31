<script lang="ts" setup>
import { useIncomingAlertStore } from '@/stores/incomingAlert.ts'
import DefaultTable from '@/components/DefaultTable.vue'

// Pinia Stores
const store = useIncomingAlertStore()
</script>

<template>
  <!--  Tabelle -->
  <DefaultTable
    :store="store"
    state-key="dataTable-incoming-alerts"
    :delete-disabled="false"
  />
</template>
