<script lang="ts" setup>
import { useGeneralStore } from '@/stores/general.ts'
import DefaultTable from '@/components/DefaultTable.vue'

// Pinia Stores
const store = useGeneralStore()
</script>

<template>
  <!--  Tabelle -->
  <DefaultTable
    state-key="dataTable-ground-settings"
    :store="store"
    :delete-disabled="true"
  />
</template>
