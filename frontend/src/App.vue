<script lang="ts" setup>
import { RouterView } from 'vue-router'
import { useCommonStore } from '@/stores/common.ts'
import { storeToRefs } from 'pinia'
import { type Ref, ref, watch } from 'vue'
import DevBar from '@/components/DevBar.vue'
import { useGenerals } from '@/composables/useGenerals.ts'
import { useToast } from 'primevue/usetoast'
// allgemeiner Store
const common = useCommonStore()
const { isLoading, error } = storeToRefs(common)
const isDev: Ref<boolean> = ref(false)

if (import.meta.env.DEV) {
  isDev.value = true
}

// Generals
const { getValue } = useGenerals()

const siteTitle = getValue('site_title')
// Festlegung des Seitentitels im Browser
document.title = siteTitle.value

const toast = useToast()

watch(
  () => error.value,
  (list) => {
    if (list) {
      toast.add({ severity: 'error', summary: 'Es wurde ein Problem festgestellt!', detail: list })
    }
  },
  { deep: true },
)

//
// const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
//
// systemTheme.addEventListener('change', (e) => {
//   if (e.matches) {
//     console.log(`add dark`)
//     document.documentElement.classList.add('dark')
//   } else {
//     console.log(`remkove dark`)
//     document.documentElement.classList.remove('dark')
//   }
// })

// onBeforeMount(() => {
//   // Beim ersten Laden System-Theme übernehmen
//   if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
//     document.documentElement.classList.add('dark')
//   }
// })
</script>

<template>
  <Toast />
  <DevBar v-if="isDev && false" />
  <!-- Loading Spinner -->
  <ProgressBar
    :mode="isLoading ? 'indeterminate' : 'determinate'"
    class="max-h-1 !rounded-none w-full !fixed !bg-transparent"
    pt:root:class="!bg-black"
    pt:value:class="!bg-red-900"
  />
  <!-- Hauptanzeige Bereich -->
  <RouterView />
</template>
