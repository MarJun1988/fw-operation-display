<template>
  <default-dialog v-if="route.path.includes('new') || route.path.includes('edit')" :fields="fields"
                  :header-title="headerTitle"
                  :item="item" :showed-action-button="showedActionButton" @close-dialog="closeDialog"
                  @item-add="itemAction('new')" @item-edit="itemAction('edit')"
                  @change-dialog-auto-close="dialogAutoClose = $event" :item-is-loading="isLoading"/>

  <default-dialog-delete v-else :header-title="headerTitle" :item="item"
                         :view-delete-fields="viewDeleteFields" @close-dialog="closeDialog"
                         @item-delete="itemAction('delete')"/>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {onBeforeMount, ref} from "vue";
import {storeToRefs} from "pinia";
import DefaultDialog from "@/components/DefaultDialog.vue";
import {managementAreaNames} from "@/router/default";
import {useTranslationStore} from "@/stores/translate";
import DefaultDialogDelete from "@/components/DefaultDialogDelete.vue";
import {useEntityStore} from "@/stores/entity";
import {useGroundSettingStore} from "@/stores/ManagementArea/groundSetting";

// Vue Router
const router = useRouter();
const route = useRoute();

// Events die abgefeuert werden
const emit = defineEmits(['addToast'])

// Aktion beim Schließen des Dialoges
const closeDialog = () => {
  router.push({name: `${managementAreaNames.groundSettings}`})
};

// Dialog - Einblenden bzw. Ausblenden
// Wichtig sonst reagiert er nicht beim klick auf das "x"
const show = ref(true);

// Store - Übersetzungen
const storeTranslation = useTranslationStore();
const {components, dialogs} = storeToRefs(storeTranslation);

// Store - Entity
const storeEntity = useEntityStore();
const {result} = storeToRefs(storeEntity)

// Store - Grundeinstellung
const store = useGroundSettingStore();
const {dataById, isLoading} = storeToRefs(store);

// Welcher Knopf soll im Dialog angezeigt werden
const showedActionButton = ref({
  create: false,
  save: false
});

// Element
const item = ref(dataById);

// Überschrift
const headerTitle = ref(dialogs.value.groundSetting.headerTitle);

// Eigenschaften der Felder für die Entity
const fields = ref({
  // URL Divera Monitor
  diveraUrl: {
    fieldType: 'inputText',
    cssClass: 'col-12',
    autofocus: true,
    label: dialogs.value.groundSetting.fields.diveraUrl.label,
    help: dialogs.value.groundSetting.fields.diveraUrl.help,
    maxlength: dialogs.value.groundSetting.fields.diveraUrl.maxlength,
    minlength: dialogs.value.groundSetting.fields.diveraUrl.minlength,
    required: dialogs.value.groundSetting.fields.diveraUrl.required
  },
  // Grundeinstellung - Autoneuladen in ms
  reloadTimeGeneral: {
    fieldType: 'inputNumber',
    cssClass: 'col-6',
    step: 1000,
    autofocus: false,
    label: dialogs.value.groundSetting.fields.reloadTimeGeneral.label,
    help: dialogs.value.groundSetting.fields.reloadTimeGeneral.help,
    maxlength: dialogs.value.groundSetting.fields.reloadTimeGeneral.maxlength,
    minlength: dialogs.value.groundSetting.fields.reloadTimeGeneral.minlength,
    required: dialogs.value.groundSetting.fields.reloadTimeGeneral.required
  },
  // Alarmierungen - Autoneuladen in ms
  reloadTimeAlert: {
    fieldType: 'inputNumber',
    cssClass: 'col-6',
    step: 1000,
    autofocus: false,
    label: dialogs.value.groundSetting.fields.reloadTimeAlert.label,
    help: dialogs.value.groundSetting.fields.reloadTimeAlert.help,
    maxlength: dialogs.value.groundSetting.fields.reloadTimeAlert.maxlength,
    minlength: dialogs.value.groundSetting.fields.reloadTimeAlert.minlength,
    required: dialogs.value.groundSetting.fields.reloadTimeAlert.required
  },
  // Darstellung (Style) - Autoneuladen in ms
  reloadTimeStyle: {
    fieldType: 'inputNumber',
    cssClass: 'col-6',
    step: 1000,
    autofocus: false,
    label: dialogs.value.groundSetting.fields.reloadTimeStyle.label,
    help: dialogs.value.groundSetting.fields.reloadTimeStyle.help,
    maxlength: dialogs.value.groundSetting.fields.reloadTimeStyle.maxlength,
    minlength: dialogs.value.groundSetting.fields.reloadTimeStyle.minlength,
    required: dialogs.value.groundSetting.fields.reloadTimeStyle.required
  },
  // Mitteilungen - Autoneuladen in ms
  reloadTimeMessage: {
    fieldType: 'inputNumber',
    cssClass: 'col-6',
    step: 1000,
    autofocus: false,
    label: dialogs.value.groundSetting.fields.reloadTimeMessage.label,
    help: dialogs.value.groundSetting.fields.reloadTimeMessage.help,
    maxlength: dialogs.value.groundSetting.fields.reloadTimeMessage.maxlength,
    minlength: dialogs.value.groundSetting.fields.reloadTimeMessage.minlength,
    required: dialogs.value.groundSetting.fields.reloadTimeMessage.required
  },
  // Anzeigen der Reload Nachricht
  showReloadToast: {
    fieldType: 'inputSwitch',
    cssClass: 'col-12',
    autofocus: false,
    label: dialogs.value.groundSetting.fields.showReloadToast.label,
    help: dialogs.value.groundSetting.fields.showReloadToast.help,
    required: dialogs.value.groundSetting.fields.showReloadToast.required
  },
  // Kommentar
  comment: {
    fieldType: 'inputText',
    cssClass: 'col-12',
    autofocus: false,
    label: dialogs.value.groundSetting.fields.comment.label,
    help: dialogs.value.groundSetting.fields.comment.help,
    maxlength: dialogs.value.groundSetting.fields.comment.maxlength,
    minlength: dialogs.value.groundSetting.fields.comment.minlength,
    required: dialogs.value.groundSetting.fields.comment.required
  }
});

// Eigenschaften der Felder für das Löschen
const viewDeleteFields = ref({
  // URL Divera Monitor
  diveraUrl: {
    fieldType: 'inputText',
    cssClass: 'col-12',
    autofocus: true,
    label: dialogs.value.groundSetting.fields.diveraUrl.label,
    help: dialogs.value.groundSetting.fields.diveraUrl.help,
    maxlength: dialogs.value.groundSetting.fields.diveraUrl.maxlength,
    minlength: dialogs.value.groundSetting.fields.diveraUrl.minlength,
    required: dialogs.value.groundSetting.fields.diveraUrl.required
  },
  // Kommentar
  comment: {
    fieldType: 'inputText',
    cssClass: 'col-12',
    autofocus: false,
    label: dialogs.value.groundSetting.fields.comment.label,
    help: dialogs.value.groundSetting.fields.comment.help,
    maxlength: dialogs.value.groundSetting.fields.comment.maxlength,
    minlength: dialogs.value.groundSetting.fields.comment.minlength,
    required: dialogs.value.groundSetting.fields.comment.required
  }
});

// Name des Entity
const nameOfEntity = 'GroundSetting';

// Aktionen beim Drücken des jeweiligen Knopfes
const itemAction = async (type) => {
  // await removeErrors();
  let toastType = "";

  if (type && type === 'new') {
    toastType = "created";
    await storeEntity.itemAction(nameOfEntity, item.value, type);

  } else if (type && type === 'edit') {
    toastType = "updated";
    await storeEntity.itemAction(nameOfEntity, item.value, type);
  } else if (type && type === 'delete') {
    toastType = "deleted";
    await storeEntity.itemAction(nameOfEntity, item.value, type);
  }

  // Prüfen, ob der Vorgang erfolgreich war
  if (await result.value.status === "success") {
    await emit('addToast', {
      severity: 'success',
      summary: `${components.value.toastMessage[toastType].title}`,
      detail: `${components.value.toastMessage[toastType].message}`
    })
    // Dialog, automatisch schließen?
    if (dialogAutoClose.value) {
      await router.push({name: `${managementAreaNames.groundSettings}`});
    }
    // await resetItem();
  } else {
    // Keine Rechte Vorhanden
    if (result.value.status === 403) {
      await emit('addToast', {
        severity: 'error',
        summary: `${components.value.toastMessage['noRight'].title}`,
        detail: `${components.value.toastMessage['noRight'].message}`
      })
    } else {
      await emit('addToast', {
        severity: 'warn',
        summary: `${components.value.toastMessage['failed'].title}`,
        detail: `${components.value.toastMessage['failed'].message}`
      })
      // Fehler Felder einfärben
      if (result.value.errors) {
        await result.value.errors.forEach(error => {
          let element = document.getElementById(error.field);
          element.classList.add('p-invalid')
        });
      }
    }
  }
};

// Entfernen der 'Fehler' classes bei Fehler
const removeErrors = async () => {
  await document.querySelectorAll(".p-invalid").forEach(el => el.classList.remove('p-invalid'));
};

// Dialog automatisch Schließen, nach erfolgreicher Aktion?
const dialogAutoClose = ref(true);

// Bevor der Dialog angezeigt wird, prüfen, ob eine ID mitgegeben würde.
onBeforeMount(async () => {
  if (route && route.params && route.params.id) {
    await store.loadDataById(route.params.id);
    if (await dataById.value) {
      item.value = await dataById.value;
      showedActionButton.value.save = true;
      showedActionButton.value.create = false;
    }
  } else {
    showedActionButton.value.save = false;
    showedActionButton.value.create = true;
    await store.resetDefaultDataById();
  }
});
</script>