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
    :delete-disabled="false"
  />
</template>
