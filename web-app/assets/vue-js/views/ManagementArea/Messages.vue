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
import {useMessageStore} from "@/stores/ManagementArea/message";

// Store - Übersetzungen
const storeTranslation = useTranslationStore();
const {dataTables} = storeToRefs(storeTranslation);

// Store - Meldungen
const store = useMessageStore();
const {dataForTable, dataTotalCount, isLoading} = storeToRefs(store);

// Filter für die Tabelle
const globalFilterFields = ['headline', 'message', 'comment'];
const tableFilters = {
  global: {value: null, matchMode: FilterMatchMode.CONTAINS},
  headline: {value: null, matchMode: FilterMatchMode.CONTAINS},
  message: {value: null, matchMode: FilterMatchMode.CONTAINS},
  comment: {value: null, matchMode: FilterMatchMode.CONTAINS},
  createdAt: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
  updatedAt: {value: null, matchMode: FilterMatchMode.CONTAINS}
};

// Abschalten der Knöpfe Aktionen, je nach Berechtigung
const enabledButtons = ref({
  add: true,
  edit: true,
  delete: true
});

// Spalten für die Tabelle
const tableColumns = ref([
  {
    field: 'id',
    header: dataTables.value.messages.columns.id,
    showing: true,
    filter: false,
    sortable: false,
    defaultView: false,
    filterTyp: 'string',
    dataType: 'text'
  },
  {
    field: 'headline',
    header: dataTables.value.messages.columns.headline,
    showing: true,
    filter: true,
    sortable: true,
    defaultView: true,
    filterTyp: 'string',
    dataType: 'text'
  },
  {
    field: 'message',
    header: dataTables.value.messages.columns.message,
    showing: true,
    filter: true,
    sortable: true,
    defaultView: true,
    filterTyp: 'string',
    dataType: 'text'
  },
  {
    field: 'comment',
    header: dataTables.value.messages.columns.comment,
    showing: true,
    filter: true,
    sortable: true,
    defaultView: false,
    filterTyp: 'string',
    dataType: 'text'
  },
  {
    field: 'createdAt',
    header: dataTables.value.messages.columns.createdAt,
    showing: true,
    filter: true,
    sortable: true,
    defaultView: false,
    filterTyp: 'dateTime',
    dataType: 'date'
  },
  {
    field: 'updatedAt',
    header: dataTables.value.messages.columns.updatedAt,
    showing: true,
    filter: true,
    sortable: true,
    defaultView: false,
    filterTyp: 'date',
    dataType: 'date'
  },
]);

// Tabellen Überschrift
const headerText = ref(dataTables.value.messages.headline);

// Spalten für die Sortierung
const multiSortMeta = ref([{field: 'createdAt', order: -1}]);

// Abrufen der Daten
const fetch = async (param) => {
  await store.loadDataForTable(param);
}

// Aktionen beim Klick auf Add, Edit und Delete
const actionOnButton = (type, id = null) => {
  if (type && type === 'new') {
    router.push({name: `${managementAreaNames.messageNew}`})
  } else if (type && id && type === 'edit') {
    router.push({name: `${managementAreaNames.messageEdit}`, params: {'id': id}})
  } else if (type && id && type === 'delete') {
    router.push({name: `${managementAreaNames.messageDelete}`, params: {'id': id}})
  }
};
</script>