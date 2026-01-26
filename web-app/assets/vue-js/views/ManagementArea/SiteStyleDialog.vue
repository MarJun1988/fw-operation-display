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
import {useSiteStyleStore} from "@/stores/ManagementArea/siteStyle";

// Vue Router
const router = useRouter();
const route = useRoute();

// Events die abgefeuert werden
const emit = defineEmits(['addToast'])

// Aktion beim Schließen des Dialoges
const closeDialog = () => {
  router.push({name: `${managementAreaNames.siteStyles}`})
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

// Store - Darstellungen
const store = useSiteStyleStore();
const {dataById, isLoading} = storeToRefs(store);

// Welcher Knopf soll im Dialog angezeigt werden
const showedActionButton = ref({
  create: false,
  save: false
});

// Element
const item = ref(dataById);

// Überschrift
const headerTitle = ref(dialogs.value.siteStyle.headerTitle);

// Eigenschaften der Felder für die Entity
const fields = ref({
  // Sortierung
  sorting: {
    fieldType: 'inputText',
    cssClass: 'col-6',
    autofocus: true,
    label: dialogs.value.siteStyle.fields.sorting.label,
    help: dialogs.value.siteStyle.fields.sorting.help,
    maxlength: dialogs.value.siteStyle.fields.sorting.maxlength,
    minlength: dialogs.value.siteStyle.fields.sorting.minlength,
    required: dialogs.value.siteStyle.fields.sorting.required
  },
  // Name
  name: {
    fieldType: 'inputText',
    cssClass: 'col-6',
    autofocus: false,
    label: dialogs.value.siteStyle.fields.name.label,
    help: dialogs.value.siteStyle.fields.name.help,
    maxlength: dialogs.value.siteStyle.fields.name.maxlength,
    minlength: dialogs.value.siteStyle.fields.name.minlength,
    required: dialogs.value.siteStyle.fields.name.required
  },
  // Beschreibung
  description: {
    fieldType: 'inputText',
    cssClass: 'col-12',
    autofocus: false,
    label: dialogs.value.siteStyle.fields.description.label,
    help: dialogs.value.siteStyle.fields.description.help,
    maxlength: dialogs.value.siteStyle.fields.description.maxlength,
    minlength: dialogs.value.siteStyle.fields.description.minlength,
    required: dialogs.value.siteStyle.fields.description.required
  },
  // CSS Style
  style: {
    fieldType: 'inputText',
    cssClass: 'col-12',
    autofocus: false,
    label: dialogs.value.siteStyle.fields.style.label,
    help: dialogs.value.siteStyle.fields.style.help,
    maxlength: dialogs.value.siteStyle.fields.style.maxlength,
    minlength: dialogs.value.siteStyle.fields.style.minlength,
    required: dialogs.value.siteStyle.fields.style.required
  },
  // Kommentar
  comment: {
    fieldType: 'inputText',
    cssClass: 'col-12',
    autofocus: false,
    label: dialogs.value.siteStyle.fields.comment.label,
    help: dialogs.value.siteStyle.fields.comment.help,
    maxlength: dialogs.value.siteStyle.fields.comment.maxlength,
    minlength: dialogs.value.siteStyle.fields.comment.minlength,
    required: dialogs.value.siteStyle.fields.comment.required
  }
});

// Eigenschaften der Felder für das Löschen
const viewDeleteFields = ref({
  // Name
  name: {
    fieldType: 'inputText',
    cssClass: 'col-6',
    autofocus: false,
    label: dialogs.value.siteStyle.fields.name.label,
    help: dialogs.value.siteStyle.fields.name.help,
    maxlength: dialogs.value.siteStyle.fields.name.maxlength,
    minlength: dialogs.value.siteStyle.fields.name.minlength,
    required: dialogs.value.siteStyle.fields.name.required
  },
  // Beschreibung
  description: {
    fieldType: 'inputText',
    cssClass: 'col-6',
    autofocus: false,
    label: dialogs.value.siteStyle.fields.description.label,
    help: dialogs.value.siteStyle.fields.description.help,
    maxlength: dialogs.value.siteStyle.fields.description.maxlength,
    minlength: dialogs.value.siteStyle.fields.description.minlength,
    required: dialogs.value.siteStyle.fields.description.required
  },
  // Kommentar
  comment: {
    fieldType: 'inputText',
    cssClass: 'col-12',
    autofocus: false,
    label: dialogs.value.siteStyle.fields.comment.label,
    help: dialogs.value.siteStyle.fields.comment.help,
    maxlength: dialogs.value.siteStyle.fields.comment.maxlength,
    minlength: dialogs.value.siteStyle.fields.comment.minlength,
    required: dialogs.value.siteStyle.fields.comment.required
  }
});

// Name des Entity
const nameOfEntity = 'SiteStyle';

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
      await router.push({name: `${managementAreaNames.siteStyles}`});
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