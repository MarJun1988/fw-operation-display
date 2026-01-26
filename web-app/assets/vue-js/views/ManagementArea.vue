<template>
  <div class="grid">
    <div class="col-12 text-center mt-4">
      <!-- Knopf, um zurück zur Anzeige zukommen -->
      <router-link  to="/display-raspberry-pi">
        <Button :label="menus.mainMenu.displayRaspberryPi.label" class="shadow-4 bg-red-900 text-white-alpha-90 opacity-50" icon="pi pi-reply" size="large"/>
      </router-link>
    </div>

    <div class="col-12">
      <!-- Leiste mit den Untermenü -->
      <sub-header :children="tabs.children"/>
    </div>
    <div class="col-12">
      <ui-panels>
        <ui-panel>
          <router-view name="view"/>
          <router-view v-if="route.path.includes('new') || route.path.includes('edit') || route.path.includes('delete')" name="dialog"/>
        </ui-panel>
      </ui-panels>
    </div>
  </div>

</template>

<script setup>
import {RouterView, useRoute, useRouter} from "vue-router";
import {mainMenuRoutes} from "@/router/default";
import SubHeader from "@/components/SubHeader.vue";
import {storeToRefs} from "pinia";
import {useTranslationStore} from "@/stores/translate";

// Events die abgefeuert werden
const emit = defineEmits(['addToast'])

const router = useRouter();
const route = useRoute();

const tabs = router.getRoutes().find(item => item.path === `${mainMenuRoutes.managementArea}`);

// Store - Übersetzungen
const storeTranslation = useTranslationStore();
const {menus} = storeToRefs(storeTranslation)
</script>
<style>
.p-button:hover {
  opacity: 1 !important;
}
</style>