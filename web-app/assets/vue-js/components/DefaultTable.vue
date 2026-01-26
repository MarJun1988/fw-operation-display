<template>
  <DataTable ref="dt" v-model:filters="filters" v-model:selection="selectedItem"
             :currentPageReportTemplate="currentPageReportTemplate"
             :globalFilterFields="globalFilterFields"
             :loading="loading" :multi-sort-meta="multiSort" :rowHover="true"
             :rows="defaultRows" :rowsPerPageOptions="rowsPerPage" :selectAll="selectAll" :stateKey="stateKey"
             :totalRecords="dataTotalCount"
             :value="dataForTable" class="p-datatable-sm" columnResizeMode="fit" dataKey="id"
             filterDisplay="row"
             lazy paginator
             paginator-position="both"
             paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
             sortMode="multiple"
             stateStorage="local" stripedRows
             @filter="loadLazyData($event)"
             @page="loadLazyData($event)" @sort="loadLazyData($event)">

    <!-- Kopf über der Tabelle -->
    <template #header>
      <div class="grid ">
        <!-- Text ganz links -->
        <div class="col-4 m-auto">
          <h2 class="ml-2">{{ headerText }}</h2>
        </div>
        <!-- Knopf in der Mitte, um einen neuen Eintrag zu erstellen -->
        <div class="col-4 text-center m-auto">
          <Button v-tooltip="components.dataTable.buttons.addItem.tooltip" :disabled="!enabledButtons.add"
                  :label="components.dataTable.buttons.addItem.label"
                  aria-describedby="Add Item" raised severity="warning" @click="emit('itemAdd')"/>
        </div>
        <!-- Suchfeld ganz rechts (Globale Suche für alle Spalten) -->
        <div class="col-4 text-right m-auto">
          <!-- Auswahl der Spalten die Sichtbar sind -->
          <MultiSelect v-if="viewSelectedColumns" :maxSelectedLabels="3"
                       :modelValue="tableSelectedColumns"
                       :options="columns" :placeholder="components.dataTable.selectColumnsPlaceholder"
                       :selectedItemsLabel="selectedItemsLabel" class="mr-4 max-wid" optionLabel="header"
                       style="max-width: 300px" @update:modelValue="onToggle($event)"/>
          <span class="p-input-icon-left">
                    <i class="pi pi-search"/>
                    <InputText v-model="filters['global'].value" :placeholder="components.dataTable.searchPlaceholder"
                               @keyup="loadLazyData"/>
            </span>
        </div>
      </div>
    </template>

    <!-- Standard Meldungen -->
    <template #empty class="flex">
      <div class="flex-none flex align-items-center justify-content-center font-bold">{{
          components.dataTable.emptyItems
        }}
      </div>
    </template>
    <!-- Daten werden geladen -->
    <template #loading>
      <ProgressSpinner/>
    </template>
    <!--    <template #loading>{{ components.dataTable.loadingItems }} </template>-->

    <!-- Erstellen der Einzelnen Spalten -->
    <template v-for="col of tableSelectedColumns">
      <Column v-if="col.showing" :key="col.field" :data-type="col.dataType"
              :field="col.field" :filter-field="col.filterField" :header="col.header" :sort-field="col.sortField"
              :sortable="col.sortable" class="text-center">

        <!-- Ist es ein Objekt {id: ..., abbreviation: ...} -->
        <template v-if="col && col.hasSubfield" #body="slotProps">
          {{ subField(col.field, slotProps.data[col.mainField]) }}
        </template>

        <!-- Datum -->
        <template v-else-if="col && col.filterTyp && col.filterTyp === 'date'" #body="slotProps">
          {{ formatDate(slotProps.data[slotProps.field]) }}
        </template>

        <!-- Datum und Uhrzeit -->
        <template v-else-if="col && col.filterTyp && col.filterTyp === 'dateTime'" #body="slotProps">
          {{ formatDatetime(slotProps.data[slotProps.field]) }}
        </template>

        <!-- Text alleine -->
        <template v-else #body="slotProps">
          {{ slotProps.data[slotProps.field] }}
        </template>

        <!-- Filter -->
        <template v-if="col.filter && col.showing" #filter="{ filterModel, filterCallback }" class="text-center">
          <!-- Wenn die Ausgabe eine Datum ist -->
          <Calendar v-if="col && col.filterTyp && (col.filterTyp === 'date' || col.filterTyp === 'dateTime')"
                    v-model="filterModel.value"
                    dateFormat="dd.mm.yy" hourFormat="24"
                    mask="99.99.9999"
                    placeholder="dd.mm.yyyy" showTime
          />

          <!-- Wenn die Ausgabe eine Text (String) ist -->
          <InputText
              v-else-if="col && col.filterTyp && col.filterTyp === 'string'"
              v-model="filterModel.value"
              :placeholder="components.dataTable.searchPlaceholder"
              class="p-column-filter" @input="filterCallback()"/>

          <!-- Wenn die Ausgabe eine Text (String) ist -->
          <InputNumber
              v-else-if="col && col.filterTyp && col.filterTyp === 'numeric'"
              v-model="filterModel.value"
              :placeholder="components.dataTable.searchPlaceholder"
              class="p-column-filter" @input="filterCallback()"/>
          <!-- Checkbox - -->
          <TriStateCheckbox v-else-if="col && col.filterTyp && col.filterTyp === 'boolean'" v-model="filterModel.value"
                            @change="filterCallback()"/>
        </template>
      </Column>
    </template>

    <!-- Aktions Spalte -->
    <column v-if="columnAction" :header="components.dataTable.columnActionsHeadline" style="width: 10rem">
      <template #body="slotProps">
        <!-- bearbeiten -->
        <Button v-tooltip="components.dataTable.buttons.editItem.tooltip"
                :aria-describedby="`Edit-${slotProps.data.id}`"
                :disabled="!enabledButtons.edit" :icon="components.dataTable.buttons.editItem.icon"
                aria-label="Edit Item"
                class="m-1" rounded
                severity="secondary" text @click="emit('itemEdit', slotProps.data)"/>
        <!-- löschen -->
        <Button v-tooltip="components.dataTable.buttons.deleteItem.tooltip"
                :aria-describedby="`Delete-${slotProps.data.id}`"
                :disabled="!enabledButtons.delete" :icon="components.dataTable.buttons.deleteItem.icon"
                aria-label="Delete Item"
                class="m-1"
                rounded
                severity="danger" text @click="emit('itemDelete', slotProps.data)"/>
      </template>
    </column>
  </DataTable>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {onMounted, ref, watch} from "vue";
import {useTranslationStore} from "@/stores/translate";
import {useDataTableStore} from "@/stores/dataTable"; // Variable die auf mit von der Component erwartet werden

// Variable die auf mit von der Component erwartet werden
const props = defineProps({
  dataForTable: {
    type: Array,
    required: true,
  },
  dataTotalCount: {
    type: Number,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  headerText: {
    type: String,
    required: true,
  },
  filters: {
    type: Object,
    required: true,
  },
  globalFilterFields: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  viewSelectedColumns: {
    type: Boolean,
    required: false,
    default: false,
  },
  columnAction: {
    type: Boolean,
    required: false,
    default: true,
  },
  multiSortMeta: {
    type: Array,
    required: true,
  },
  enabledButtons: {
    type: Object,
    required: true,
    default: {
      add: false,
      edit: false,
      delete: false,
    }
  },
  stateKey: {
    type: String,
    required: false,
  }
});

// Events die abgefeuert werden
const emit = defineEmits(['fetchData', 'itemAdd', 'itemEdit', 'itemDelete']);

// Store - Übersetzungen
const storeTranslation = useTranslationStore();
const {components} = storeToRefs(storeTranslation);

// Template Text für die Paginator (unter der Tabelle)
const currentPageReportTemplate = `{first} ${components.value.dataTable.pageReportTemplateOne} {last} ${components.value.dataTable.pageReportTemplateTwo} {totalRecords} ${components.value.dataTable.pageReportTemplateThree})`;

// Standard Einstellungen
// Einträge pro Seite
const rowsPerPage = ref([5, 10, 25, 50, 100]);
const defaultRows = ref(25);
const selectedItemsLabel = `{0} ${components.value.dataTable.selectColumnsItems}`;

// Referenzen zur Tabelle
const dt = ref();
const selectedItem = ref();
const selectAll = ref(false);
const filters = ref({...props.filters});
const multiSort = ref([...props.multiSortMeta]);

// Store - Einstellungen des Data Tables
const storeDataTable = useDataTableStore();
const {lastLazyParams} = storeToRefs(storeDataTable);

const lazyParams = ref({
  first: 0,
  rows: dt.d_rows,
  sortField: null,
  sortOrder: null,
  filters: filters.value,
  multiSortMeta: []
});

// Ausgewählte Spalten
const tableSelectedColumns = ref(props.columns.filter(cal => cal.defaultView));

// Sichtbarkeit der Spalten
const onToggle = async (val) => {
  tableSelectedColumns.value = props.columns.filter(col => val.includes(col));
};

// Daten Laden bei Änderungen in der Tabelle
const loadLazyData = (event) => {

  lazyParams.value = {
    first: 0,
    rows: dt.value.d_rows,
    sortField: null,
    sortOrder: null,
    filters: filters.value,
    multiSortMeta: props.multiSortMeta,
  };

  if (event) {
    if (event.first) {
      lazyParams.value.first = event.first;
    }

    if (event.multiSortMeta) {
      lazyParams.value.multiSortMeta = event.multiSortMeta;
    }
  }

  emit('fetchData', lazyParams.value);
};

// Formatierung Datum
const formatDate = (value) => {
  if (value) {
    let date = new Date(value);

    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
  return '';
};

// Formatierung Datum Zeit
const formatDatetime = (value) => {
  if (value) {
    let date = new Date(value);

    return date.toLocaleTimeString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hours: '2-digit',
      minutes: '2-digit'
    });
  }
  return '';
};

// Ausgabe für in Objekt
const subField = (field, element) => {
  let str = field.split('.');
  if (str.length > 0) {
    return element[str[1]];
  }
}

// Beim Einbinden der Component ausführen
onMounted(() => {
  loadLazyData(lazyParams);
});

// Einstellungen Store Abspeichern
watch(lazyParams, async (newValue) => {
  lastLazyParams.value = await newValue;
});
</script>

<style lang="scss">
.p-column-title {
  width: 100%;
}
</style>