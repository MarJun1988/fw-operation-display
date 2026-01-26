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
import {useMessageStore} from "@/stores/ManagementArea/message";

// Vue Router
const router = useRouter();
const route = useRoute();

// Events die abgefeuert werden
const emit = defineEmits(['addToast'])

// Aktion beim Schließen des Dialoges
const closeDialog = () => {
  router.push({name: `${managementAreaNames.messages}`})
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

// Store - Meldungen
const store = useMessageStore();
const {dataById,isLoading} = storeToRefs(store);

// Welcher Knopf soll im Dialog angezeigt werden
const showedActionButton = ref({
  create: false,
  save: false
});

// Element
const item = ref(dataById);

// Überschrift
const headerTitle = ref(dialogs.value.message.headerTitle);

// Eigenschaften der Felder für die Entity
const fields = ref({
  // Überschrift
  headline: {
    fieldType: 'inputText',
    cssClass: 'col-12',
    autofocus: true,
    label: dialogs.value.message.fields.headline.label,
    help: dialogs.value.message.fields.headline.help,
    maxlength: dialogs.value.message.fields.headline.maxlength,
    minlength: dialogs.value.message.fields.headline.minlength,
    required: dialogs.value.message.fields.headline.required
  },
  // Nachricht
  message: {
    fieldType: 'textarea',
    cssClass: 'col-12',
    autofocus: false,
    label: dialogs.value.message.fields.message.label,
    help: dialogs.value.message.fields.message.help,
    maxlength: dialogs.value.message.fields.message.maxlength,
    minlength: dialogs.value.message.fields.message.minlength,
    required: dialogs.value.message.fields.message.required
  },
  // Kommentar
  comment: {
    fieldType: 'inputText',
    cssClass: 'col-12',
    autofocus: false,
    label: dialogs.value.message.fields.comment.label,
    help: dialogs.value.message.fields.comment.help,
    maxlength: dialogs.value.message.fields.comment.maxlength,
    minlength: dialogs.value.message.fields.comment.minlength,
    required: dialogs.value.message.fields.comment.required
  }
});

// Eigenschaften der Felder für das Löschen
const viewDeleteFields = ref({
  // Überschrift
  headline: {
    fieldType: 'inputText',
    cssClass: 'col-6',
    autofocus: true,
    label: dialogs.value.message.fields.headline.label,
    help: dialogs.value.message.fields.headline.help,
    maxlength: dialogs.value.message.fields.headline.maxlength,
    minlength: dialogs.value.message.fields.headline.minlength,
    required: dialogs.value.message.fields.headline.required
  },
  // Nachricht
  message: {
    fieldType: 'inputText',
    cssClass: 'col-6',
    autofocus: false,
    label: dialogs.value.message.fields.message.label,
    help: dialogs.value.message.fields.message.help,
    maxlength: dialogs.value.message.fields.message.maxlength,
    minlength: dialogs.value.message.fields.message.minlength,
    required: dialogs.value.message.fields.message.required
  },
  // Kommentar
  comment: {
    fieldType: 'inputText',
    cssClass: 'col-12',
    autofocus: false,
    label: dialogs.value.message.fields.comment.label,
    help: dialogs.value.message.fields.comment.help,
    maxlength: dialogs.value.message.fields.comment.maxlength,
    minlength: dialogs.value.message.fields.comment.minlength,
    required: dialogs.value.message.fields.comment.required
  }
});

// Name des Entity
const nameOfEntity = 'Message';

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
      await router.push({name: `${managementAreaNames.messages}`});
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