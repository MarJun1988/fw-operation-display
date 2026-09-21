import {defineStore} from 'pinia'
import {computed, type ComputedRef, nextTick, type Ref, ref, watch} from 'vue'
import type {
  AnySubscriptionGeneral,
  CustomColumnProps,
  General,
  SubscriptionDeleteGeneral,
} from '@/utils/interfaces.ts'
import gql from 'graphql-tag'
import {useMutation, useSubscription} from '@vue/apollo-composable'
import {useCommonStore} from '@/stores/common.ts'
import {
  MUTATIONEN_CREATE_GENERAL,
  MUTATIONEN_DELETE_GENERAL,
  MUTATIONEN_UPDATE_GENERAL,
  QUERY_GENERAL,
  QUERY_GENERALS,
  QUERY_GENERALS_PAGED,
  SUBSCRIPTION_GENERAL_CREATED,
  SUBSCRIPTION_GENERAL_DELETED,
  SUBSCRIPTION_GENERAL_UPDATED,
} from '@/utils/graphql.ts'
import {apolloClient} from '@/apollo.ts'
import type {DataTableFilterEvent, DataTablePageEvent, DataTableSortEvent} from 'primevue'
import type {RouteParamValue} from 'vue-router'
import type {DataTableFilterMeta, DataTableSortMeta} from 'primevue/datatable'
import {FilterMatchMode} from '@primevue/core/api'
import {devLog} from '@/utils/utils.ts'

export const useGeneralStore = defineStore('generalStore', () => {
  const item: Ref<General> = ref<General>({
    id: '',
    name: '',
    value: '',
    sorting: 0,
    createdAt: new Date(),
    updatedAt: null,
    comment: null,
  })
  const pagedItems: Ref<General[]> = ref<General[]>([])
  const allItems: Ref<General[]> = ref<General[]>([])
  const totalCount: Ref<number> = ref(0)
  // Spalten für die Sortierung
  const multiSortMeta: Ref<DataTableSortMeta[]> = ref([{field: 'sorting', order: 1}])

  const filters: Ref<DataTableFilterMeta> = ref({
    global: {value: null, matchMode: FilterMatchMode.CONTAINS},
    id: {value: null, matchMode: FilterMatchMode.CONTAINS},
    name: {value: null, matchMode: FilterMatchMode.CONTAINS},
    value: {value: null, matchMode: FilterMatchMode.CONTAINS},
    sorting: {value: null, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO},
    comment: {value: null, matchMode: FilterMatchMode.CONTAINS},
    createdAt: {value: null, matchMode: FilterMatchMode.DATE_IS},
    updatedAt: {value: null, matchMode: FilterMatchMode.DATE_IS},
  })

  /**
   * Spalten für die Tabelle
   */
  const columns: Ref<CustomColumnProps[]> = ref([
    {columnKey: 'general-id', field: 'id', header: '#', defaultShowing: false, dataType: 'text'},
    {
      columnKey: 'general-name',
      field: 'name',
      header: 'Name',
      defaultShowing: true,
      dataType: 'text'
    },
    {
      columnKey: 'general-value',
      field: 'value',
      header: 'Wert',
      defaultShowing: true,
      dataType: 'text'
    },
    {
      columnKey: 'general-comment',
      field: 'comment',
      header: 'Kommentar',
      defaultShowing: false,
      dataType: 'text'
    },
    {
      columnKey: 'general-sorting',
      field: 'sorting',
      header: 'Sortierung',
      defaultShowing: false,
      dataType: 'numeric'
    },
    {
      columnKey: 'general-createdAt',
      field: 'createdAt',
      header: 'erstellt am',
      dataType: 'date',
      defaultShowing: false,
    },
    {
      columnKey: 'general-updatedAt',
      field: 'updatedAt',
      header: 'letzte bearbeitung',
      dataType: 'date',
      defaultShowing: false,
    },
  ])

  // Definierung der Filter
  const defaultFilters = {
    global: {value: null, matchMode: FilterMatchMode.CONTAINS},
    id: {value: null, matchMode: FilterMatchMode.CONTAINS},
    name: {value: null, matchMode: FilterMatchMode.CONTAINS},
    value: {value: null, matchMode: FilterMatchMode.CONTAINS},
    sorting: {value: null, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO},
    comment: {value: null, matchMode: FilterMatchMode.CONTAINS},
    createdAt: {value: null, matchMode: FilterMatchMode.DATE_IS},
    updatedAt: {value: null, matchMode: FilterMatchMode.DATE_IS},
  }

  // Pagination-Zustand
  const page: Ref<number> = ref(0)
  const pageSize: Ref<number> = ref(10)

  // ✅ Lokaler Common-Store nur einmal referenzieren
  const common = useCommonStore()

  const mapGeneralDates = (item: General) => {
    return {
      ...item,
      createdAt: item.createdAt
        ? new Date(item.createdAt).toLocaleTimeString('de-DE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
        : null,
      updatedAt: item.updatedAt
        ? new Date(item.updatedAt).toLocaleTimeString('de-DE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
        : null,
    }
  }

  const onLazyLoad = async (
    event:
      | DataTablePageEvent
      | DataTableSortEvent
      | DataTableFilterEvent
      | { first: number; rows: number }
      | { first: number; rows: number, multiSortMeta: DataTableSortMeta }
  ): Promise<void> => {
    common.isLoading = true
    // 🔄 Vue ein Repaint geben, bevor die Query startet
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve)) // micro delay (1 frame)

    try {
      const {data} = await apolloClient.query({
        query: QUERY_GENERALS_PAGED,
        variables: {page: event},
        fetchPolicy: 'no-cache',
      })

      pagedItems.value = data.generalsPaged.items.map(mapGeneralDates)
      totalCount.value = data.generalsPaged.totalRecords
    } catch (err) {
      devLog('onLazyLoad generalStore: ', err)
      common.error = err
    } finally {
      common.isLoading = false
    }
  }

  const fetchOnlyItem = async (id: string | RouteParamValue[]) => {
    try {
      common.isLoading = true
      const {data} = await apolloClient
        .query({
          query: QUERY_GENERAL,
          variables: {generalId: id},
        })
        .finally(() => (common.isLoading = false))
      item.value.id = data.general.id
      item.value.name = data.general.name
      item.value.value = data.general.value
      item.value.sorting = data.general.sorting
      item.value.comment = data.general.comment
      item.value.createdAt = data.general.createdAt ? new Date(data.general.createdAt) : undefined
      item.value.updatedAt = data.general.updatedAt ? new Date(data.general.updatedAt) : undefined
      common.error = null
    } catch (err) {
      devLog('fetchOnlyItem generalStore: ', err)
      common.error = err
    } finally {
      common.isLoading = false
    }
  }

  const fetchAllItems = async () => {
    try {
      common.isLoading = true
      const {data} = await apolloClient.query({
        query: QUERY_GENERALS,
      })
      allItems.value = data.generals.map(mapGeneralDates)
      common.error = null
    } catch (err) {
      devLog('fetchAllItems generalStore: ', err)
      common.error = err
    } finally {
      common.isLoading = false
    }
  }

  // 2️⃣ Subscriptions für Live-Updates
  // : SubscriptionHandler<General>[]
  const subscriptions: AnySubscriptionGeneral[] = [
    {
      query: SUBSCRIPTION_GENERAL_CREATED,
      handler: (msg: General) => {
        devLog('SUBSCRIPTION_GENERAL_CREATED', msg)
        if (!pagedItems.value.find((a) => a.id === msg.id)) {
          pagedItems.value = [msg, ...pagedItems.value] // <-- erzeugt neues Array
          totalCount.value++
        }
      },
    },
    {
      query: SUBSCRIPTION_GENERAL_UPDATED,
      handler: (msg: General) => {
        devLog('SUBSCRIPTION_GENERAL_UPDATED', msg)
        pagedItems.value = pagedItems.value.map((a) => (a.id === msg.id ? msg : a))
        allItems.value = allItems.value.map((a) => (a.id === msg.id ? msg : a))
      },
    },
    {
      query: SUBSCRIPTION_GENERAL_DELETED,
      handler: async (msg: SubscriptionDeleteGeneral) => {
        devLog('SUBSCRIPTION_GENERAL_DELETED', msg)
        if (!msg?.deleted?.length) return

        const deletedIds = msg.deleted.map((d) => d.id)
        pagedItems.value = pagedItems.value.filter((a) => !deletedIds.includes(a.id))

        totalCount.value = msg.totalCount ?? pagedItems.value.length

        if (pagedItems.value.length !== totalCount.value) {
          await onLazyLoad({first: pageSize.value * page.value, rows: pageSize.value})
        }
      },
    },
  ]

  subscriptions.forEach(({query, handler}) => {
    const {onResult} = useSubscription(query)

    onResult(({data}) => {
      if (!data) return

      // Name des Subscription-Felds herausfinden
      const key = Object.keys(data)[0] as keyof typeof data

      // Exakter Typ wird automatisch zugewiesen
      const msg = data[key]

      handler(msg)
    })
  })

  // ✅ CREATE
  const {mutate: createMutateGeneral, loading: creatingLoading} = useMutation(
    MUTATIONEN_CREATE_GENERAL,
    {
      update(cache, {data}) {
        if (!data?.createGeneral) return
        cache.modify({
          fields: {
            generals(existing = []) {
              const newRef = cache.writeFragment({
                data: data.createGeneral,
                fragment: gql`
                  fragment NewGeneral on General {
                    id
                    name
                    value
                    createdAt
                    updatedAt
                    comment
                  }
                `,
              })
              return [newRef, ...existing]
            },
          },
        })
      },
    },
  )

  const createItem = async (input?: Partial<General>) => {
    const vars: General = {
      name: input?.name ?? item.value.name,
      value: input?.value ?? item.value.value,
      sorting: input?.sorting ?? item.value.sorting,
      comment: input?.comment ?? item.value.comment,
    }

    await createMutateGeneral(vars)
  }

  // ✅ UPDATE
  const {mutate: updateMutateGeneral, loading: updatingLoading} =
    useMutation(MUTATIONEN_UPDATE_GENERAL)

  const updateItem = async (input?: Partial<General>) => {
    const vars: General = {
      id: input?.id ?? item.value.id,
      name: input?.name ?? item.value.name,
      value: input?.value ?? item.value.value,
      sorting: input?.sorting ?? item.value.sorting,
      comment: input?.comment ?? item.value.comment,
    }

    const result = await updateMutateGeneral(vars)
    if (result?.data?.updateGeneral) {
      pagedItems.value = pagedItems.value.map((g) =>
        g.id === result?.data.updateGeneral.id ? result?.data.updateGeneral : g,
      )
    }
  }

  // ✅ DELETE
  const {mutate: deleteMutateGeneral, loading: deletingLoading} =
    useMutation(MUTATIONEN_DELETE_GENERAL)

  const deleteItem = async (ids: (string | undefined)[]) => {
    const result = await deleteMutateGeneral({ids})

    if (result?.data?.deleteGeneral?.deleted) {
      const resultItems: General[] = result?.data?.deleteGeneral.deleted

      for (let i = 0; i < resultItems.length; i++) {
        pagedItems.value = pagedItems.value.filter(
          (a) => a.id !== result?.data?.deleteGeneral.deleted[i].id,
        )

        pagedItems.value = [...pagedItems.value] // neue Referenz, um Reaktivität zu erzwingen
      }

      totalCount.value = result?.data.deleteGeneral?.totalCount // ✅ direkt aus Mutation
    }
  }

  // 📡 Bindung: loading/error direkt verknüpfen (reaktiv!)
  const isBusy: ComputedRef<boolean> = computed(
    () => creatingLoading.value || updatingLoading.value || deletingLoading.value,
  )

  // // 📡 Bindung: loading/error direkt verknüpfen (reaktiv!)
  // const hasError = computed(
  //   () => errorA
  // )

  watch([isBusy], () => {
    common.isLoading = isBusy.value
    // common.error = hasError
  })

  /**
   * Route zum neuen Eintrag
   */
  const routeToNewItem = () => {
    return {name: 'ground-setting-new'}
  }

  /**
   * Route zum Bearbeiten
   * @param item
   */
  const routeToEditItem = (item: General) => {
    return {name: 'ground-setting-edit', params: {id: item.id}}
  }

  /**
   * Route zum Löschen
   * @param item
   */
  const routeToDeleteItem = (item: General) => {
    return {name: 'ground-setting-delete', params: {id: item.id}}
  }

  // ------------------------------------------------------
  // MAP für schnellen Zugriff + GETTER
  // ------------------------------------------------------
  const generalsMap = computed(() => {
    const map: Record<string, General> = {}

    for (const s of allItems.value) {
      map[s.name] = s
    }
    return map
  })

  const get = (name: string) => {
    // devLog('get Generals: ', name)
    return generalsMap.value[name] || null
  }

  const getSiteTitle: ComputedRef<string> = computed(() => {
    if (allItems.value && allItems.value.length > 0) {
      const res = allItems.value.filter(item => item.name === 'site_title')
      if (res && res.length > 0 && res[0]) {
        return res[0].value
      }
    }
    return ''
  })

  return {
    filters,
    page,
    pageSize,
    multiSortMeta,
    item,
    allItems,
    pagedItems,
    totalCount,
    creatingLoading,
    updatingLoading,
    deletingLoading,
    columns,
    defaultFilters,
    createItem,
    updateItem,
    deleteItem,
    onLazyLoad,
    fetchAllItems,
    fetchOnlyItem,
    routeToNewItem,
    routeToEditItem,
    routeToDeleteItem,
    generalsMap,
    get,
    getSiteTitle,
    isBusy
  }
})
