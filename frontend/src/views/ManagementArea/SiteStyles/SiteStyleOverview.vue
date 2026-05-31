<script lang="ts" setup>
import DefaultTable from '@/components/DefaultTable.vue'
import { useSiteStyleStore } from '@/stores/siteStyle.ts'

// Pinia Stores
const store = useSiteStyleStore()
</script>

<template>
  <!--  Tabelle -->
  <DefaultTable
    state-key="dataTable-site-styles"
    :store="store"
    :delete-disabled="true"
  />
</template>
