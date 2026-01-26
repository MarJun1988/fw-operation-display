<script lang="ts" setup>
import NavigationTabs from '@/components/NavigationTabs.vue'
import {useVersionStore} from "@/stores/version.ts";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";

const store = useVersionStore()
const {lastVersion} = storeToRefs(store)

onMounted(async () => {
  await store.fetchAllItems()
})

</script>

<template>
  <router-link
    class="fixed z-10 top-0 w-full flex justify-center m-1"
    to="/dashboard"
  >
    <Button
      icon="pi pi-reply"
      label="zum Alarmierungsbildschirm"
      severity="danger"
      size="small"
    />
  </router-link>
  <!-- Navigationsleiste -->
  <NavigationTabs
    class="sticky top-0 mt-10 z-5"
    parent-name="management-area"
  />

  <Card class="w-10/12 m-auto mt-4">
    <template #content>
      <router-view />
    </template>
  </Card>

  <div
    class="w-10/12 m-auto my-4 pr-5 grid grid-cols-1 md:grid-cols-2 items-center justify-between pl-5"
  >
    <!-- Zur Hilfe -->
    <div class="text-sm gap-2 flex items-center justify-center w-full md:justify-start">
      <i class="pi pi-question-circle" />
      <a
        href="/help"
        target="_blank"
      >Zur Hilfe</a>
    </div>
    <!-- Git Repository -->
    <div class="flex items-center justify-center gap-2 text-sm w-full md:justify-end">
      <svg
        class="h-5"
        viewBox="0 0 128 128"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m124.755 51.382-.177-.452L107.47 6.282a4.459 4.459 0 0 0-1.761-2.121 4.581 4.581 0 0
          0-5.236.281 4.578 4.578 0 0 0-1.518 2.304L87.404 42.088H40.629L29.077 6.746a4.492 4.492 0
          0 0-1.518-2.31 4.581 4.581 0 0 0-5.236-.281 4.502 4.502 0 0 0-1.761 2.121L3.422
          50.904l-.17.452c-5.059 13.219-.763 28.192 10.537 36.716l.059.046.157.111 26.061 19.516
          12.893 9.758 7.854 5.93a5.283 5.283 0 0 0 6.388 0l7.854-5.93 12.893-9.758
          26.218-19.634.065-.052c11.273-8.526 15.562-23.472 10.524-36.677z"
          fill="#E24329"
        />
        <path
          d="m124.755 51.382-.177-.452a57.79 57.79 0 0 0-23.005 10.341L64 89.682c12.795 9.68 23.934 18.09 23.934 18.09l26.218-19.634.065-.052c11.291-8.527 15.586-23.488 10.538-36.704z"
          fill="#FC6D26"
        />
        <path
          d="m40.066 107.771 12.893 9.758 7.854 5.93a5.283 5.283 0 0 0 6.388 0l7.854-5.93 12.893-9.758s-11.152-8.436-23.947-18.09a18379.202 18379.202 0 0 0-23.935 18.09z"
          fill="#FCA326"
        />
        <path
          d="M26.42 61.271A57.73 57.73 0 0 0 3.422 50.904l-.17.452c-5.059 13.219-.763 28.192 10.537 36.716l.059.046.157.111 26.061 19.516L64 89.655 26.42 61.271z"
          fill="#FC6D26"
        />
      </svg>

      <a
        href="https://gitlab.com/MarJun1988/fw-operation-display"
        target="_blank"
      >
        GitLab
      </a>

      <span>|</span>

      <a
        href="https://gitlab.com/MarJun1988/fw-operation-display/-/releases"
        target="_blank"
      >
        Fw-Display {{ lastVersion?.versionNumber }}
      </a>
    </div>
  </div>

  <!--  Dialogfelder -->
  <router-view name="dialog" />
</template>

<style scoped></style>
