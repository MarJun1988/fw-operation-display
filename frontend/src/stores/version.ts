import {defineStore} from 'pinia'
import {computed, type ComputedRef, nextTick, type Ref, ref, watch} from 'vue'
import type {
  AnySubscriptionVersion,
  CustomColumnProps,
  SubscriptionDeleteVersion,
  Version,
} from '@/utils/interfaces.ts'
import gql from 'graphql-tag'
import {useMutation, useSubscription} from '@vue/apollo-composable'
import {useCommonStore} from '@/stores/common.ts'
import {
  MUTATIONEN_CREATE_VERSION,
  MUTATIONEN_DELETE_VERSION,
  MUTATIONEN_UPDATE_VERSION,
  QUERY_VERSION,
  QUERY_VERSIONS,
  QUERY_VERSIONS_PAGED,
  SUBSCRIPTION_VERSION_CREATED,
  SUBSCRIPTION_VERSION_DELETED,
  SUBSCRIPTION_VERSION_UPDATED,
} from '@/utils/graphql.ts'
import {apolloClient} from '@/apollo.ts'
import type {DataTableFilterEvent, DataTablePageEvent, DataTableSortEvent} from 'primevue'
import type {RouteParamValue} from 'vue-router'
import type {DataTableFilterMeta, DataTableSortMeta} from 'primevue/datatable'
import {FilterMatchMode} from '@primevue/core/api'
import {devLog} from '@/utils/utils.ts'

export const useVersionStore = defineStore('versionStore', () => {
  const item: Ref<Version> = ref<Version>({
    id: '',
    versionNumber: '',
    description: '',
    createdAt: new Date(),
    updatedAt: null,
    comment: null,
  })
  const pagedItems: Ref<Version[]> = ref<Version[]>([])
  const allItems: Ref<Version[]> = ref<Version[]>([])
  const totalCount: Ref<number> = ref(0)

  const lastVersion: ComputedRef<Version | null | undefined> = computed(() => {
    if (allItems.value && allItems.value.length > 0) {
      devLog('lastVersion', allItems.value[0])
      return allItems.value[0]
    }
    return {
      id: '',
      versionNumber: 'v.2.0.2',
      description: '',
      createdAt: new Date(),
      updatedAt: null,
      comment: null,
    }
  })
  // Spalten für die Sortierung
  const multiSortMeta: DataTableSortMeta[] = [{field: 'createdAt', order: 1}]

  const filters: Ref<DataTableFilterMeta> = ref({
    global: {value: null, matchMode: FilterMatchMode.CONTAINS},
    id: {value: null, matchMode: FilterMatchMode.CONTAINS},
    versionNumber: {value: null, matchMode: FilterMatchMode.CONTAINS},
    description: {value: null, matchMode: FilterMatchMode.CONTAINS},
    comment: {value: null, matchMode: FilterMatchMode.CONTAINS},
    createdAt: {value: null, matchMode: FilterMatchMode.DATE_IS},
    updatedAt: {value: null, matchMode: FilterMatchMode.DATE_IS},
  })

  /**
   * Spalten für die Tabelle
   */
  const columns: Ref<CustomColumnProps[]> = ref([
    {field: 'id', header: '#', defaultShowing: false, dataType: 'text'},
    {field: 'versionNumber', header: 'Versionsnummer', defaultShowing: true, dataType: 'text'},
    {field: 'description', header: 'Beschreibung', defaultShowing: true, dataType: 'text'},
    {field: 'comment', header: 'Kommentar', defaultShowing: false, dataType: 'text'},
    {
      field: 'createdAt',
      header: 'erstellt am',
      dataType: 'date',
      defaultShowing: false,
    },
    {
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
    versionNumber: {value: null, matchMode: FilterMatchMode.CONTAINS},
    description: {value: null, matchMode: FilterMatchMode.CONTAINS},
    comment: {value: null, matchMode: FilterMatchMode.CONTAINS},
    createdAt: {value: null, matchMode: FilterMatchMode.DATE_IS},
    updatedAt: {value: null, matchMode: FilterMatchMode.DATE_IS},
  }

  // Pagination-Zustand
  const page: Ref<number> = ref(0)
  const pageSize: Ref<number> = ref(10)

  // ✅ Lokaler Common-Store nur einmal referenzieren
  const common = useCommonStore()

  const mapVersionDates = (item: Version) => {
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
      | { first: number; rows: number },
  ): Promise<void> => {
    common.isLoading = true
    // 🔄 Vue ein Repaint geben, bevor die Query startet
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve)) // micro delay (1 frame)

    try {
      const {data} = await apolloClient.query({
        query: QUERY_VERSIONS_PAGED,
        variables: {page: event},
        fetchPolicy: 'no-cache',
      })

      pagedItems.value = data.versionsPaged.items.map(mapVersionDates)
      totalCount.value = data.versionsPaged.totalRecords
    } catch (err) {
      devLog('onLazyLoad versionStore: ', err)
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
          query: QUERY_VERSION,
          variables: {versionId: id},
        })
        .finally(() => (common.isLoading = false))
      item.value.id = data.version.id
      item.value.versionNumber = data.version.versionNumber
      item.value.description = data.version.description
      item.value.comment = data.version.comment
      item.value.createdAt = data.version.createdAt ? new Date(data.version.createdAt) : undefined
      item.value.updatedAt = data.version.updatedAt ? new Date(data.version.updatedAt) : undefined
      common.error = null
    } catch (err) {
      devLog('fetchOnlyItem versionStore: ', err)
      common.error = err
    } finally {
      common.isLoading = false
    }
  }

  const fetchAllItems = async () => {
    try {
      common.isLoading = true
      const {data} = await apolloClient.query({
        query: QUERY_VERSIONS,
      })
      allItems.value = data.versions.map(mapVersionDates)
      common.error = null
    } catch (err) {
      devLog('fetchAllItems versionStore: ', err)
      common.error = err
    } finally {
      common.isLoading = false
    }
  }

  // 2️⃣ Subscriptions für Live-Updates
  // : SubscriptionHandler<Version>[]
  const subscriptions: AnySubscriptionVersion[] = [
    {
      query: SUBSCRIPTION_VERSION_CREATED,
      handler: (msg: Version) => {
        devLog('SUBSCRIPTION_VERSION_CREATED', msg)
        if (!pagedItems.value.find((a) => a.id === msg.id)) {
          pagedItems.value = [msg, ...pagedItems.value] // <-- erzeugt neues Array
          allItems.value = [msg, ...allItems.value] // <-- erzeugt neues Array
          totalCount.value++
        }
      },
    },
    {
      query: SUBSCRIPTION_VERSION_UPDATED,
      handler: (msg: Version) => {
        devLog('SUBSCRIPTION_VERSION_UPDATED', msg)
        pagedItems.value = pagedItems.value.map((a) => (a.id === msg.id ? msg : a))
        allItems.value = allItems.value.map((a) => (a.id === msg.id ? msg : a))
      },
    },
    {
      query: SUBSCRIPTION_VERSION_DELETED,
      handler: async (msg: SubscriptionDeleteVersion) => {
        devLog('SUBSCRIPTION_VERSION_DELETED', msg)
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
  const {mutate: createMutateVersion, loading: creatingLoading} = useMutation(
    MUTATIONEN_CREATE_VERSION,
    {
      update(cache, {data}) {
        if (!data?.createVersion) return
        cache.modify({
          fields: {
            versions(existing = []) {
              const newRef = cache.writeFragment({
                data: data.createVersion,
                fragment: gql`
                  fragment NewVersion on Version {
                    id
                    versionNumber
                    description
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

  const createItem = async (input?: Partial<Version>) => {
    const vars: Version = {
      versionNumber: input?.versionNumber ?? item.value.versionNumber,
      description: input?.description ?? item.value.description,
      comment: input?.comment ?? item.value.comment,
    }

    await createMutateVersion(vars)
  }

  // ✅ UPDATE
  const {mutate: updateMutateVersion, loading: updatingLoading} =
    useMutation(MUTATIONEN_UPDATE_VERSION)

  const updateItem = async (input?: Partial<Version>) => {
    const vars: Version = {
      id: input?.id ?? item.value.id,
      versionNumber: input?.versionNumber ?? item.value.versionNumber,
      description: input?.description ?? item.value.description,
      comment: input?.comment ?? item.value.comment,
    }

    const result = await updateMutateVersion(vars)
    if (result?.data?.updateVersion) {
      pagedItems.value = pagedItems.value.map((g) =>
        g.id === result?.data.updateVersion.id ? result?.data.updateVersion : g,
      )
    }
  }

  // ✅ DELETE
  const {mutate: deleteMutateVersion, loading: deletingLoading} =
    useMutation(MUTATIONEN_DELETE_VERSION)

  const deleteItem = async (ids: (string | undefined)[]) => {
    const result = await deleteMutateVersion({ids})

    if (result?.data?.deleteVersion?.deleted) {
      const resultItems: Version[] = result?.data?.deleteVersion.deleted

      for (let i = 0; i < resultItems.length; i++) {
        pagedItems.value = pagedItems.value.filter(
          (a) => a.id !== result?.data?.deleteVersion.deleted[i].id,
        )

        pagedItems.value = [...pagedItems.value] // neue Referenz, um Reaktivität zu erzwingen
      }

      totalCount.value = result?.data.deleteVersion?.totalCount // ✅ direkt aus Mutation
    }
  }

  // 📡 Bindung: loading/error direkt verknüpfen (reaktiv!)
  const isBusy = computed(
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
    return {name: 'version-new'}
  }

  /**
   * Route zum Bearbeiten
   * @param item
   */
  const routeToEditItem = (item: Version) => {
    return {name: 'version-edit', params: {id: item.id}}
  }

  /**
   * Route zum Löschen
   * @param item
   */
  const routeToDeleteItem = (item: Version) => {
    return {name: 'version-delete', params: {id: item.id}}
  }

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
    lastVersion,
    createItem,
    updateItem,
    deleteItem,
    onLazyLoad,
    fetchAllItems,
    fetchOnlyItem,
    routeToNewItem,
    routeToEditItem,
    routeToDeleteItem
  }
})
