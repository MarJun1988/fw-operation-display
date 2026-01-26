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
import {useSiteStyleStore} from "@/stores/ManagementArea/siteStyle";

// Store - Übersetzungen
const storeTranslation = useTranslationStore();
const {dataTables} = storeToRefs(storeTranslation);

// Store - Darstellungen
const store = useSiteStyleStore();
const {dataForTable, dataTotalCount, isLoading} = storeToRefs(store);

// Filter für die Tabelle
const globalFilterFields = ['name', 'description', 'style'];
const tableFilters = {
  global: {value: null, matchMode: FilterMatchMode.CONTAINS},
  sorting: {value: null, matchMode: FilterMatchMode.CONTAINS},
  name: {value: null, matchMode: FilterMatchMode.CONTAINS},
  description: {value: null, matchMode: FilterMatchMode.CONTAINS},
  style: {value: null, matchMode: FilterMatchMode.CONTAINS},
  comment: {value: null, matchMode: FilterMatchMode.CONTAINS},
  createdAt: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
  updatedAt: {value: null, matchMode: FilterMatchMode.CONTAINS}
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
    header: dataTables.value.siteStyles.columns.id,
    showing: true,
    filter: false,
    sortable: false,
    defaultView: false,
    filterTyp: 'string',
    dataType: 'string'
  },
  {
    field: 'sorting',
    header: dataTables.value.siteStyles.columns.sorting,
    showing: true,
    filter: true,
    sortable: true,
    defaultView: true,
    filterTyp: 'numeric',
    dataType: 'numeric'
  },
  {
    field: 'name',
    header: dataTables.value.siteStyles.columns.name,
    showing: true,
    filter: true,
    sortable: true,
    defaultView: false,
    filterTyp: 'string',
    dataType: 'text'
  },
  {
    field: 'description',
    header: dataTables.value.siteStyles.columns.description,
    showing: true,
    filter: true,
    sortable: true,
    defaultView: true,
    filterTyp: 'string',
    dataType: 'text'
  },
  {
    field: 'style',
    header: dataTables.value.siteStyles.columns.style,
    showing: true,
    filter: true,
    sortable: true,
    defaultView: true,
    filterTyp: 'string',
    dataType: 'text'
  },
  {
    field: 'comment',
    header: dataTables.value.siteStyles.columns.comment,
    showing: true,
    filter: true,
    sortable: true,
    defaultView: false,
    filterTyp: 'string',
    dataType: 'text'
  },
  {
    field: 'createdAt',
    header: dataTables.value.siteStyles.columns.createdAt,
    showing: true,
    filter: true,
    sortable: true,
    defaultView: false,
    filterTyp: 'dateTime',
    dataType: 'date'
  },
  {
    field: 'updatedAt',
    header: dataTables.value.siteStyles.columns.updatedAt,
    showing: true,
    filter: true,
    sortable: true,
    defaultView: false,
    filterTyp: 'date',
    dataType: 'date'
  },
]);

// Tabellen Überschrift
const headerText = ref(dataTables.value.siteStyles.headline);

// Spalten für die Sortierung
const multiSortMeta = ref([{field: 'sorting', order: 1}]);

// Abrufen der Daten
const fetch = async (param) => {
  await store.loadDataForTable(param);
}

// Aktionen beim Klick auf Add, Edit und Delete
const actionOnButton = (type, id = null) => {
  if (type && type === 'new') {
    router.push({name: `${managementAreaNames.siteStyleNew}`})
  } else if (type && id && type === 'edit') {
    router.push({name: `${managementAreaNames.siteStyleEdit}`, params: {'id': id}})
  } else if (type && id && type === 'delete') {
    router.push({name: `${managementAreaNames.siteStyleDelete}`, params: {'id': id}})
  }
};
</script>