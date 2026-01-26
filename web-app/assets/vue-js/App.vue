<template>
  <!-- Anzeige der Seiten -->
  <router-view @add-toast="addToast"></router-view>

  <!-- Meldungen (Toast) -->
  <Toast position="bottom-right"/>
</template>

<script setup>
import {RouterView} from 'vue-router'
import {useToast} from 'primevue/usetoast';

// Toast Element
const toast = useToast();

/**
 * Add a Toast Element
 * @param param
 * @returns {Promise<void>}
 */
const addToast = async (param) => {
  const {severity, summary, detail, life = 2000} = param
  await toast.add({severity: severity, summary: summary, detail: detail, life: life});
}
</script>

<style>
.p-sidebar-header-content {
  min-width: 100vw;
}
</style>