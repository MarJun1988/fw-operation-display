<template>
  <div class="grid m-0 p-0 min-w-screen 1-min-h-screen">
    <divera-monitor @add-toast="emit('addToast', $event)"/>
  </div>
</template>

<script setup>
import DiveraMonitor from "@/components/DiveraMonitor.vue";
// Events die abgefeuert werden
const emit = defineEmits(['addToast'])
</script>