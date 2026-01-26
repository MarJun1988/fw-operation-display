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
    :delete-disabled="false"
  />
</template>
