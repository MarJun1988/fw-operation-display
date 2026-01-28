<script lang="ts" setup>
import {RouterView} from 'vue-router'
import {useCommonStore} from '@/stores/common.ts'
import {storeToRefs} from 'pinia'
import {type Ref, ref, watch} from 'vue'
import DevBar from '@/components/DevBar.vue'
import {useToast} from 'primevue/usetoast'
// allgemeiner Store
const common = useCommonStore()

const {isLoading, error} = storeToRefs(common)
const isDev: Ref<boolean> = ref(false)

if (import.meta.env.DEV) {
  isDev.value = true
}

const toast = useToast()

watch(
  () => error.value,
  (list) => {
    if (list) {
      toast.add({severity: 'error', summary: 'Es wurde ein Problem festgestellt!', detail: list})
    }
  },
  {deep: true},
)
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
