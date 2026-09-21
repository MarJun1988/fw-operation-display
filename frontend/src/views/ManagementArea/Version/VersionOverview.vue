<script lang="ts" setup>
import DefaultTable from '@/components/DefaultTable.vue'
import {useVersionStore} from "@/stores/version.ts";

// Pinia Stores
const store = useVersionStore()
</script>

<template>
  <!--  Tabelle -->
  <DefaultTable
    state-key="dataTable-versions"
    :delete-disabled="true"
    :store="store"
  />
</template>
