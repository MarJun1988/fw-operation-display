<script lang="ts" setup>
import {storeToRefs} from 'pinia'
import {computed, type ComputedRef, onMounted, ref, type Ref, watch} from 'vue'
import {useCommonStore} from '@/stores/common.ts'
import type {
  CustomColumnProps,
  General,
  IncomingAlert
} from '@/utils/interfaces.ts'
import type {useIncomingAlertStore} from '@/stores/incomingAlert.ts'
import type {useGeneralStore} from '@/stores/general.ts'
import type {DataTableFilterMeta} from 'primevue/datatable'
import type {DataTableFilterEvent, DataTableFilterMetaData} from 'primevue'
import {type Router, useRouter} from 'vue-router'
import {useMessageStore} from '@/stores/message.ts'
import type {useMessageIconStore} from '@/stores/messageIcon.ts'
import {useSiteStyleStore} from '@/stores/siteStyle.ts'
import type {useVersionStore} from "@/stores/version.ts";

// type GeneralStore = ReturnType<typeof useGeneralStore>
type IncomingAlertStore = ReturnType<typeof useIncomingAlertStore>
type GeneralStore = ReturnType<typeof useGeneralStore>
type MessageStore = ReturnType<typeof useMessageStore>
type MessageIconStore = ReturnType<typeof useMessageIconStore>
type SiteStyleStore = ReturnType<typeof useSiteStyleStore>
type VersionStore = ReturnType<typeof useVersionStore>

const props = defineProps<{
  store: IncomingAlertStore | GeneralStore | MessageStore | MessageIconStore | SiteStyleStore | VersionStore
  deleteDisabled: Boolean,
  stateKey: string
}>()

// Pinia Stores
const storeCommon = useCommonStore()

const {isLoading} = storeToRefs(storeCommon)
const {pagedItems, totalCount, pageSize, columns, multiSortMeta} = storeToRefs(props.store)

// Template Text für die Paginator (unter der Tabelle)
const currentPageReportTemplate = `{first} bis {last} von {totalRecords} Einträgen`
const rowsPerPageOptions: number[] = [1, 5, 10, 20, 25, 50, 75, 100, 500, 1000, 5000]
const selectedItems: Ref<IncomingAlert[] | General[]> = ref([])

/**
 * Ausgewählte Spalten, die angezeigt werden sollen
 */
const selectedColumns: Ref<CustomColumnProps[]> = ref(
  columns.value.filter((column: CustomColumnProps) => column?.defaultShowing === true),
)

/**
 * Umschalten der Anzuzeigende Spalten
 * @param val
 */
const onToggle = (val: CustomColumnProps[]) => {
  selectedColumns.value = columns.value.filter((col: CustomColumnProps) => val.includes(col))
}

// Filter für die Tabelle
const filters: Ref<DataTableFilterMeta> = ref({...props.store.defaultFilters})

// Erst Initialisierung des Filters
const initFilters = () => (filters.value = {...props.store.defaultFilters})

// Löschen der gesamten Werte
const clearFilter = () => {
  initFilters()
  onGlobalSearch()
  globalFilter.value = null
}

// das Search-Event
const onGlobalSearch = async () => {
  await props.store.onLazyLoad({
    first: 0,
    rows: pageSize.value,
    sortField: undefined,
    sortOrder: null,
    multiSortMeta: [],
    filters: filters.value,
  })
}

// const defaultMultiSortMeta: Ref<DataTableSortMeta[]> = ref([...multiSortMeta.value])

// Event beim Filter auswahl
const onFilter = async (event: DataTableFilterEvent) => {
  filters.value = event.filters // aktualisieren (damit matchModes erhalten bleiben)
  await props.store.onLazyLoad({
    first: 0,
    rows: pageSize.value,
    sortField: undefined,
    sortOrder: null,
    multiSortMeta: multiSortMeta.value,
    filters: event.filters,
  })
}

/**
 * Globaler Filter für die Lazy Loading events
 */
const globalFilter = computed({
  get: () => (filters.value['global'] as DataTableFilterMetaData).value,
  set: (val) => ((filters.value['global'] as DataTableFilterMetaData).value = val),
})

const router: Router = useRouter()

// Bestätigungsdialog zum Löschen dem markierten Elemente
const deleteSelectedItemsDialog: Ref<boolean> = ref(false)

const confirmDeleteSelected = () => {
  deleteSelectedItemsDialog.value = true
}

const deleteSelectedItems = async () => {
  const ids = selectedItems.value.map((selectedItem) => selectedItem.id)
  const chunkSize = 500
  for (let i = 0; i < ids.length; i += chunkSize) {
    const slice = ids.slice(i, i + chunkSize)
    await props.store.deleteItem(slice)
  }

  deleteSelectedItemsDialog.value = false
  selectedItems.value = []
}

const tooltipButtonDeleteSelected: ComputedRef<string> = computed(() => {
  const count = selectedItems.value.length

  if (isDisabled.value) {
    return `Funktion deaktiviert durch Entwickler!`
  }

  if (count === 1) {
    return `1 Eintrag löschen`
  } else if (count > 1) {
    return `${count} Einträge löschen`
  } else {
    return 'Keine Einträge ausgewählt'
  }
})

// Registers a callback to be called after the component has been mounted.
onMounted(async () => {
  storeCommon.isLoading = false
  props.store.onLazyLoad({first: 0, rows: pageSize.value, multiSortMeta: multiSortMeta.value})
  restoreSelectedColumns();
})

const isDev: Ref<boolean> = ref(false)
const isDisabled: ComputedRef<boolean> = computed(() => {
  return props.deleteDisabled && !isDev.value
})

if (import.meta.env.DEV) {
  isDev.value = true
}

watch(
  selectedColumns,
  (cols) => {
    localStorage.setItem(
      `${props.stateKey}-selected-columns`,
      JSON.stringify(cols.map((c) => c.columnKey)),
    );
  },
  {deep: true},
);

const restoreSelectedColumns = () => {
  const stored = localStorage.getItem(`${props.stateKey}-selected-columns`,);

  if (!stored) return;

  const ids: string[] = JSON.parse(stored);

  selectedColumns.value = columns.value.filter((col) => col.columnKey &&
    ids.includes(col.columnKey),
  );
};
</script>

<template>
  <!-- Löschen mehrere -->
  <Dialog
    v-model:visible="deleteSelectedItemsDialog"
    :block-scroll="true"
    :modal="true"
    :style="{ width: '450px' }"
    header="Bestätigung: mehrere Einträge löschen"
    pt:footer="border-t"
    pt:header="border-b"
  >
    <div class="flex items-center gap-4 mt-4">
      <i class="pi pi-exclamation-triangle !text-3xl" />
      <span v-if="selectedItems && selectedItems.length > 0">Sind Sie sicher, dass Sie die ausgewählten Einträge
        <b>({{ selectedItems.length }})</b> löschen möchten?</span>
    </div>
    <template #footer>
      <div class="flex flex-wrap gap-4 mt-4">
        <Button
          icon="pi pi-times"
          label="Nein"
          severity="secondary"
          text
          @click="deleteSelectedItemsDialog = false"
        />
        <Button
          icon="pi pi-check"
          label="Ja"
          severity="danger"
          text
          @click="deleteSelectedItems()"
        />
      </div>
    </template>
  </Dialog>

  <DataTable
    ref="dt"
    v-model:filters="filters"
    v-model:rows="pageSize"
    v-model:selection="selectedItems"
    :current-page-report-template="currentPageReportTemplate"
    :global-filter-fields="['name']"
    :loading="isLoading"
    :multi-sort-meta="store.multiSortMeta"
    :rows-per-page-options="rowsPerPageOptions"
    :stateKey="props.stateKey"
    :total-records="totalCount"
    :value="pagedItems"
    data-key="id"
    filter-display="row"
    lazy
    paginator
    paginator-position="both"
    paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  RowsPerPageDropdown"
    size="small"
    sort-mode="multiple"
    stateStorage="local"
    striped-rows
    @filter="onFilter($event)"
    @page="store.onLazyLoad($event)"
    @sort="store.onLazyLoad($event)"
  >
    <!-- Kopfzeile -->
    <template #header>
      <div class="flex flex-wrap gap-2 justify-between">
        <!-- Sichtbare Spalten -->
        <div class="w-full md:w-50">
          <FloatLabel>
            <MultiSelect
              :max-selected-labels="3"
              :model-value="selectedColumns"
              :options="columns"
              :selected-items-label="`{0} Spalten`"
              class="w-full"
              filter
              fluid
              input-id="multi-select-columns"
              option-label="header"
              show-clear
              size="small"
              @update:model-value="onToggle"
            />
            <label for="multi-select-columns">Sichtbare Spalten</label>
          </FloatLabel>
        </div>
        <!-- Knöpfe -->
        <div class="w-full sm:w-auto flex justify-center">
          <Button
            v-tooltip.right="{
              value: 'Neuen Eintrag erstellen',
              pt: {
                text: '!w-55 text-center',
              },
            }"
            class="mr-2"
            icon="pi pi-plus"
            size="small"
            @click="router.push(store.routeToNewItem())"
          />
          <Button
            v-tooltip.right="{
              value: tooltipButtonDeleteSelected,
              pt: {
                text: '!w-55 text-center',
              },
            }"
            :badge="`${selectedItems.length}`"
            :disabled="!selectedItems || !selectedItems.length || isDisabled"
            icon="pi pi-trash"
            severity="danger"
            size="small"
            @click="confirmDeleteSelected"
          />
        </div>
        <!-- Suche -->
        <div class="w-full sm:w-auto justify-items-end flex gap-4 mt-4 md:mt-0">
          <FloatLabel>
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText
                id="input-search"
                v-model="globalFilter"
                clearable
                fluid
                size="small"
                @update:model-value="onGlobalSearch"
              />
            </IconField>
            <label for="input-search">suchen ...</label>
          </FloatLabel>
          <!-- Filter Löschen-->
          <Button
            v-tooltip.left="'Filter löschen...'"
            icon="pi pi-filter-slash"
            size="small"
            type="button"
            variant="outlined"
            @click="clearFilter()"
          />
        </div>
      </div>
    </template>

    <!-- Keine Einträge -->
    <template #empty>
      Keine Einträge gefunden!
    </template>
    <!-- Ladeanzeige -->
    <template #loading>
      Daten werden geladen ...
    </template>
    <!-- Paginator -->
    <template
      #paginatorcontainer="{
        first,
        last,
        page,
        pageCount,
        pageLinks,
        prevPageCallback,
        nextPageCallback,
        firstPageCallback,
        lastPageCallback,
        totalRecords,
        rows,
        rowChangeCallback,
        changePageCallback,
      }"
    >
      <div class="flex flex-wrap w-full gap-4 justify-between items-center">
        <!-- Anzahl pro Seite -->
        <div class="hidden sm:block">
          <Select
            :model-value="rows"
            :options="rowsPerPageOptions"
            size="small"
            @update:model-value="rowChangeCallback"
          />
        </div>
        <!-- zurück und vor -->
        <div class="w-full sm:w-auto flex justify-center">
          <!-- 1te Seite -->
          <Button
            :disabled="page === 0"
            icon="pi pi-angle-double-left"
            size="small"
            text
            @click="firstPageCallback"
          />
          <!-- 1 Seite zurück-->
          <Button
            :disabled="page === 0"
            icon="pi pi-angle-left"
            text
            @click="prevPageCallback"
          />

          <!-- Knöpfe mit Zahlen -->
          <Button
            v-for="(pageL, index) in pageLinks"
            :key="index"
            :disabled="pageL === page + 1"
            :label="`${pageL}`"
            :text="pageL !== page + 1"
            size="small"
            @click="changePageCallback(pageL - 1)"
          />
          <!-- 1 Seite weiter -->
          <Button
            :disabled="page && pageCount ? page === pageCount - 1 : false"
            icon="pi pi-angle-right"
            size="small"
            text
            @click="nextPageCallback"
          />
          <!-- letzte Seite -->
          <Button
            :disabled="page && pageCount ? page === pageCount - 1 : false"
            icon="pi pi-angle-double-right"
            size="small"
            text
            @click="lastPageCallback"
          />
        </div>
        <!-- Anzahl -->
        <div class="w-full sm:w-auto text-center">
          <span> {{ first }} bis {{ last }} von {{ totalRecords }} Einträgen </span>
        </div>
      </div>
    </template>
    <!-- Spalte zum Selektieren -->
    <Column
      :exportable="false"
      exclude-global-filter
      selection-mode="multiple"
      style="width: 3rem"
    />
    <!-- Anzuzeigende Spalten  -->
    <Column
      v-for="(col, index) of selectedColumns"
      :key="col.field + '_' + index"
      :body-class="col.bodyClass"
      :class="col.class"
      :data-type="col.dataType"
      :field="col.field"
      :filter-field="col.field"
      :header="col.header"
      :header-class="col.headerClass"
      :sortable="true"
    >
      <template
        v-if="col.header === 'Vorschau'"
        #body="slotProps"
      >
        <img
          v-if="slotProps?.data?.icon?.path"
          :alt="slotProps?.data?.icon?.path"
          :src="slotProps?.data?.icon?.path"
          class="w-5"
        >
        <img
          v-else
          :alt="slotProps?.data?.path"
          :src="slotProps?.data?.path"
          class="w-5"
        >
      </template>
      <template
        v-else
        #body="slotProps"
      >
        <span v-if="typeof slotProps.field === 'string'">
          {{ slotProps.data[slotProps.field] }}
        </span>
      </template>

      <template
        v-if="!col.filterNotShowing"
        #filter="{ filterModel, filterCallback }"
      >
        <FloatLabel class="mt-4">
          <InputText
            v-if="col.dataType === 'text'"
            :id="`input-search-${col.field}`"
            v-model="filterModel.value"
            fluid
            size="small"
            type="text"
            @input="filterCallback()"
          />
          <!-- Wenn die Ausgabe eine Datum ist -->
          <DatePicker
            v-if="col.dataType === 'date'"
            v-model="filterModel.value"
            date-format="dd/mm/yy"
            fluid
            mask="99/99/9999"
            show-clear
          />
          <InputNumber
            v-if="col.dataType === 'numeric'"
            v-model="filterModel.value"
          />

          <label
            v-if="col.dataType === 'text'"
            :for="`input-search-${col.field}`"
            class="hidden sm:block"
          >suchen ...</label>
          <label
            v-if="col.dataType === 'date'"
            :for="`input-search-${col.field}`"
            class="hidden sm:block"
          >dd/mm/yyyy</label>
        </FloatLabel>
      </template>
    </Column>

    <!-- Aktionsspalte -->
    <Column
      :exportable="false"
      :pt="{
        columnHeaderContent: {
          class: 'justify-center',
        },
      }"
      class="min-w-25 w-25 max-w-25"
      exclude-global-filter
      header="Aktionen"
    >
      <template #body="slotProps">
        <div class="flex flex-wrap justify-between gap-2">
          <Button
            icon="pi pi-pencil"
            rounded
            size="small"
            variant="outlined"
            @click="router.push(store.routeToEditItem(slotProps.data))"
          />
          <Button
            :disabled="isDisabled"
            icon="pi pi-trash"
            rounded
            severity="danger"
            size="small"
            variant="outlined"
            @click="router.push(props.store.routeToDeleteItem(slotProps.data))"
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>
