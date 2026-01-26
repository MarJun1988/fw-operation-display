<template>
  <Dialog v-model:visible="visible" :breakpoints="{ '960px': '75vw', '641px': '100vw' }" :draggable="true"
          :header="headerTitle" :style="{ width: '50vw' }"
          class="default-modal"
          maximizable modal @hide="emit('closeDialog')">

    <!-- Laden Balken -->
    <div v-if="itemIsLoading" class="col-12">
      <ProgressBar mode="indeterminate" style="height: 6px" class="bg-red-900"></ProgressBar>
    </div>

    <!-- Inhalt -->
    <generate-formular :disabled-all-fields="itemIsLoading" :fields="fields" :item="item"
                       :read-only-all-fields="itemIsLoading" @enabled-action-button="actionButtonDisabled = $event"/>
    <dialog-message/>

    <!-- Fußzeile -->
    <template #footer>
      <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
        <!-- Schließen -->
        <Button :label="components.dialog.buttonClose" icon="pi pi-times"
                text @click="emit('closeDialog')"/>

        <!-- Dialog, Automatisch schließen -->
        <ToggleButton v-model="autoClose" :offLabel="components.dialog.buttonAutoCloseOff"
                      :onLabel="components.dialog.buttonAutoCloseOn" offIcon="pi pi-check"
                      onIcon="pi pi-times" severity="success"
                      @update:modelValue="emit('changeDialogAutoClose', $event)"/>

        <!-- Erstellen -->
        <Button v-if="showedActionButton.create" :disabled="actionButtonDisabled"
                :label="components.dialog.buttonCreate"
                icon="pi pi-save" severity="success" @click="emit('itemAdd')"/>
        <!-- Speichern -->
        <Button v-if="showedActionButton.save" :disabled="actionButtonDisabled" :label="components.dialog.buttonSave"
                icon="pi pi-save" severity="success" @click="emit('itemEdit')"/>
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import {useTranslationStore} from "@/stores/translate";
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue";
import DialogMessage from "@/components/DialogMessage.vue";
import GenerateFormular from "@/components/GenerateFormular.vue"; // Variable die auf mit von der Component erwartet werden

// Variable die auf mit von der Component erwartet werden
const props = defineProps({
  // Überschrift
  headerTitle: {
    type: String,
    required: true,
  },
  // Felder
  fields: {
    type: Object,
    required: true
  },
  // Eintrag
  item: {
    type: Object,
    required: true
  },
  // Anzeige - erforderliche Felder
  showRequiredText: {
    type: Boolean,
    required: false,
    default: true
  },
  // Anzeige welcher Button benötigt wird
  showedActionButton: {
    type: Object,
    required: false,
    default: {
      create: true,
      save: false,
    }
  },
  // Dialog automatisch Schließen
  dialogAutoClose: {
    type: Boolean,
    required: false,
    default: true
  },
  // Laden Status vom Item
  itemIsLoading: {
    type: Boolean,
    required: false,
    default: false
  },
});

// Events die abgefeuert werden
const emit = defineEmits(['closeDialog', 'itemAdd', 'itemEdit', 'changeDialogAutoClose']);

// Store - Übersetzungen
const storeTranslation = useTranslationStore();
const {components} = storeToRefs(storeTranslation);

// Aktions Knopf - Aktivieren / Deaktivieren
const actionButtonDisabled = ref(true);

// Anzeige des Dialoges
const visible = ref(true);

// Dialog automatisch Schließen
const autoClose = ref(true);

// Wird beim ausgeführt beim Laden der Komponente
onMounted(async () => {
  autoClose.value = props.dialogAutoClose;
});
</script>

<style>
/* Bei dem Modal Header, den Mauszeiger ändern */
.default-modal > .p-dialog-header {
  cursor: move;
}
</style>