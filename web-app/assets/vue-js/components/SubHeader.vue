<template>
  <ui-tab-bar v-model="active" type="textWithIcon">
    <ui-tab
        v-for="(tab, index) in props.children"
        :key="index"
        :icon="tab.meta.icon"
        stacked
        type="textWithIcon"
        @click="setRoute(tab)"
    >
      {{ tab.meta.label }}
    </ui-tab>
  </ui-tab-bar>
</template>
<script setup>
import {onBeforeMount, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

// Variable die auf mit von der Component erwartet werden
const props = defineProps({
  children: {
    type: Array,
    required: true
  }
});

const active = ref(0);
const route = useRoute();
const router = useRouter();

const setRoute = (route) => {
  router.push({name: `${route.name}`})
}

onBeforeMount(() => {
  active.value = route.meta.tabNumber;
})
</script>

<style lang="scss">
// Anpassung der Schriftfarbe
.mdc-tab .mdc-tab__icon, .mdc-tab .mdc-tab__text-label {
  color: rgba(255, 255, 255, 0.2) !important;
}

// Anpassung der Schriftfarbe bie Hover
.mdc-tab:hover .mdc-tab__icon, .mdc-tab:hover .mdc-tab__text-label {
  color: rgba(255, 255, 255, 0.8) !important;
}

// Anpassung der Schriftfarbe, wenn der Tab aktiv ist
.mdc-tab--active .mdc-tab__icon, .mdc-tab--active .mdc-tab__text-label {
  color: rgba(255, 255, 255, 1) !important;
}
</style>