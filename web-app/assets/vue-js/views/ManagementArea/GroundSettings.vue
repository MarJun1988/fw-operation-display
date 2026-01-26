<template>
  <div class="grid m-2">
    <div class="col-12">
      <default-table :columns="tableColumns" :data-for-table="dataForTable" :data-total-count="dataTotalCount"
                     :enabled-buttons="enabledButtons" :filters="tableFilters"
                     :global-filter-fields="globalFilterFields" :header-text="headerText"
                     :loading="isLoading"
                     :multi-sort-meta="multiSortMeta"
                     :view-selected-columns="true"
                     @item-add="actionOnButton('new')"
                     @item-edit="actionOnButton('edit', $event.id)"
                     @item-delete="actionOnButton('delete', $event.id)"
                     @fetch-data="fetch($event)"
      />
    </div>
  </div>
</template>
<script setup>
import {storeToRefs} from "pinia";
import DefaultTable from "@/components/DefaultTable.vue";
import {FilterMatchMode} from "primevue/api";
import {ref} from "vue";
import {managementAreaNames} from "@/router/default";
import router from "@/router";
import {useTranslationStore} from "@/stores/translate";
import {useGroundSettingStore} from "@/stores/ManagementArea/groundSetting";

// Store - Übersetzungen
const storeTranslation = useTranslationStore();
const {dataTables} = storeToRefs(storeTranslation);

// Store - Grundeinstellung
const store = useGroundSettingStore();
const {dataForTable, dataTotalCount, isLoading} = storeToRefs(store);

// Filter für die Tabelle
const globalFilterFields = [];
const tableFilters = {
  global: {value: null, matchMode: FilterMatchMode.CONTAINS}
};

// Abschalten der Knöpfe Aktionen, je nach Berechtigung
const enabledButtons = ref({
  add: false,
  edit: true,
  delete: false
});

// Spalten für die Tabelle
const tableColumns = ref([
  {
    field: 'id',
    header: dataTables.value.groundSettings.columns.id,
    showing: true,
    filter: false,
    sortable: false,
    defaultView: false,
    filterTyp: 'string',
    dataType: 'string'
  },
  {
    field: 'diveraUrl',
    header: dataTables.value.groundSettings.columns.diveraUrl,
    showing: true,
    filter: false,
    sortable: false,
    defaultView: true,
    filterTyp: 'string',
    dataType: 'text'
  },
  {
    field: 'reloadTimeGeneral',
    header: dataTables.value.groundSettings.columns.reloadTimeGeneral,
    showing: true,
    filter: false,
    sortable: false,
    defaultView: false,
    filterTyp: 'numeric',
    dataType: 'numeric'
  },
  {
    field: 'reloadTimeAlert',
    header: dataTables.value.groundSettings.columns.reloadTimeAlert,
    showing: true,
    filter: false,
    sortable: false,
    defaultView: true,
    filterTyp: 'numeric',
    dataType: 'numeric'
  },
  {
    field: 'reloadTimeStyle',
    header: dataTables.value.groundSettings.columns.reloadTimeStyle,
    showing: true,
    filter: false,
    sortable: false,
    defaultView: false,
    filterTyp: 'numeric',
    dataType: 'numeric'
  },
  {
    field: 'reloadTimeMessage',
    header: dataTables.value.groundSettings.columns.reloadTimeMessage,
    showing: true,
    filter: false,
    sortable: false,
    defaultView: true,
    filterTyp: 'numeric',
    dataType: 'numeric'
  },
  {
    field: 'showReloadToast',
    header: dataTables.value.groundSettings.columns.showReloadToast,
    showing: true,
    filter: false,
    sortable: false,
    defaultView: false,
    filterTyp: 'boolean',
    dataType: 'boolean'
  },
  {
    field: 'comment',
    header: dataTables.value.groundSettings.columns.comment,
    showing: true,
    filter: false,
    sortable: false,
    defaultView: false,
    filterTyp: 'string',
    dataType: 'text'
  },
  {
    field: 'createdAt',
    header: dataTables.value.groundSettings.columns.createdAt,
    showing: true,
    filter: false,
    sortable: false,
    defaultView: false,
    filterTyp: 'dateTime',
    dataType: 'date'
  },
  {
    field: 'updatedAt',
    header: dataTables.value.groundSettings.columns.updatedAt,
    showing: true,
    filter: false,
    sortable: false,
    defaultView: false,
    filterTyp: 'date',
    dataType: 'date'
  }
]);

// Spalten für die Sortierung
const multiSortMeta = ref([{field: 'createdAt', order: -1}]);

// Überschrift
const headerText = ref(dataTables.value.groundSettings.headline)

// Abrufen der Daten
const fetch = async (param) => {
  await store.loadDataForTable(param);
}

// Aktionen beim Klick auf Add, Edit und Delete
const actionOnButton = (type, id = null) => {
  if (type && type === 'new') {
    router.push({name: `${managementAreaNames.groundSettingNew}`})
  } else if (type && id && type === 'edit') {
    router.push({name: `${managementAreaNames.groundSettingEdit}`, params: {'id': id}})
  } else if (type && id && type === 'delete') {
    router.push({name: `${managementAreaNames.groundSettingDelete}`, params: {'id': id}})
  }
};
</script>