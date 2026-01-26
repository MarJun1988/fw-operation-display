<template>
    <required-star/>
    <span>{{ generals.requiredFieldText }}</span>
</template>
<script setup>
import {useTranslationStore} from "@/stores/translate";
import RequiredStar from "@/components/RequiredStar.vue";
import {storeToRefs} from "pinia";

// Store - Übersetzungen
const storeTranslation = useTranslationStore();
const {generals} = storeToRefs(storeTranslation);
</script>

<style scoped>

</style>