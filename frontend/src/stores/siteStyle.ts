import {defineStore} from 'pinia'
import {computed, nextTick, type Ref, ref, watch} from 'vue'
import {provideApolloClient, useMutation, useSubscription} from '@vue/apollo-composable'

import {apolloClient} from '../apollo'
import type {
  AnySubscriptionSiteStyle,
  CustomColumnProps,
  SiteStyle,
  SubscriptionDeleteSiteStyle,
} from '@/utils/interfaces.ts'
import gql from 'graphql-tag'
import {useCommonStore} from '@/stores/common.ts'
import {
  MUTATIONEN_CREATE_SITE_STYLE,
  MUTATIONEN_DELETE_SITE_STYLE,
  MUTATIONEN_UPDATE_SITE_STYLE,
  QUERY_SITE_STYLE,
  QUERY_SITE_STYLE_PAGED,
  QUERY_SITE_STYLES,
  SUBSCRIPTION_SITE_STYLE_CREATED,
  SUBSCRIPTION_SITE_STYLE_DELETED,
  SUBSCRIPTION_SITE_STYLE_UPDATED,
} from '@/utils/graphql.ts'
import type {DataTableFilterMeta, DataTableSortMeta} from 'primevue/datatable'
import {FilterMatchMode} from '@primevue/core/api'
import type {DataTableFilterEvent, DataTablePageEvent, DataTableSortEvent} from 'primevue'
import type {RouteParamValue} from 'vue-router'
import {devLog} from '@/utils/utils.ts' // 🧠 Apollo-Kontext manuell bereitstellen

// 🧠 Apollo-Kontext manuell bereitstellen
provideApolloClient(apolloClient)

export const useSiteStyleStore = defineStore('siteStyleStore', () => {
  const item = ref<SiteStyle>({
    id: '',
    name: '',
    description: '',
    htmlStyle: '',
    htmlClass: '',
    sorting: 0,
    createdAt: new Date(),
    updatedAt: null,
    comment: null,
  })
  const pagedItems: Ref<SiteStyle[]> = ref<SiteStyle[]>([])
  const allItems: Ref<SiteStyle[]> = ref<SiteStyle[]>([])
  const totalCount: Ref<number> = ref(0)
  // Spalten für die Sortierung
  const multiSortMeta: Ref<DataTableSortMeta[]> = ref([{field: 'sorting', order: 1}])

  const filters: Ref<DataTableFilterMeta> = ref({
    global: {value: null, matchMode: FilterMatchMode.CONTAINS},
    id: {value: null, matchMode: FilterMatchMode.CONTAINS},
    name: {value: null, matchMode: FilterMatchMode.CONTAINS},
    description: {value: null, matchMode: FilterMatchMode.CONTAINS},
    htmlStyle: {value: null, matchMode: FilterMatchMode.CONTAINS},
    htmlClass: {value: null, matchMode: FilterMatchMode.CONTAINS},
    sorting: {value: null, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO},
    comment: {value: null, matchMode: FilterMatchMode.CONTAINS},
    createdAt: {value: null, matchMode: FilterMatchMode.DATE_IS},
    updatedAt: {value: null, matchMode: FilterMatchMode.DATE_IS},
  })

  /**
   * Spalten für die Tabelle
   */
  const columns: Ref<CustomColumnProps[]> = ref([
    {columnKey: 'site-style-id', field: 'id', header: '#', defaultShowing: false, dataType: 'text'},
    {
      columnKey: 'site-style-name',
      field: 'name',
      header: 'Name',
      defaultShowing: true,
      dataType: 'text'
    },
    {
      columnKey: 'site-style-description',
      field: 'description',
      header: 'Beschreibung',
      defaultShowing: true,
      dataType: 'text'
    },
    {
      columnKey: 'site-style-htmlStyle',
      field: 'htmlStyle',
      header: 'Style (CSS)',
      defaultShowing: false,
      dataType: 'text'
    },
    {
      columnKey: 'site-style-htmlClass',
      field: 'htmlClass',
      header: 'Class (CSS)',
      defaultShowing: false,
      dataType: 'text'
    },
    {
      columnKey: 'site-style-sorting',
      field: 'sorting',
      header: 'Sortierung',
      defaultShowing: false,
      dataType: 'numeric'
    },
    {
      columnKey: 'site-style-comment',
      field: 'comment',
      header: 'Kommentar',
      defaultShowing: false,
      dataType: 'text'
    },
    {
      columnKey: 'site-style-createdAt',
      field: 'createdAt',
      header: 'erstellt am',
      dataType: 'date',
      defaultShowing: false,
    },
    {
      columnKey: 'site-style-updatedAt',
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
    description: {value: null, matchMode: FilterMatchMode.CONTAINS},
    htmlStyle: {value: null, matchMode: FilterMatchMode.CONTAINS},
    htmlClass: {value: null, matchMode: FilterMatchMode.CONTAINS},
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

  const mapSiteStyleDates = (item: SiteStyle) => {
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
        query: QUERY_SITE_STYLE_PAGED,
        variables: {page: event},
        fetchPolicy: 'no-cache',
      })

      pagedItems.value = data.siteStylesPaged.items.map(mapSiteStyleDates)
      totalCount.value = data.siteStylesPaged.totalRecords
    } catch (err) {
      devLog('onLazyLoad siteStyleStore: ', err)
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
          query: QUERY_SITE_STYLE,
          variables: {siteStyleId: id},
        })
        .finally(() => (common.isLoading = false))
      item.value.id = data.siteStyle.id
      item.value.name = data.siteStyle.name
      item.value.description = data.siteStyle.description
      item.value.htmlStyle = data.siteStyle.htmlStyle
      item.value.htmlClass = data.siteStyle.htmlClass
      item.value.sorting = data.siteStyle.sorting
      item.value.comment = data.siteStyle.comment
      item.value.createdAt = data.siteStyle.createdAt
        ? new Date(data.siteStyle.createdAt)
        : undefined
      item.value.updatedAt = data.siteStyle.updatedAt
        ? new Date(data.siteStyle.updatedAt)
        : undefined
    } catch (err) {
      devLog('fetchOnlyItem siteStyleStore: ', err)
      common.error = err
    } finally {
      common.isLoading = false
    }
  }

  const fetchAllItems = async () => {
    common.isLoading = true
    try {
      const {data} = await apolloClient.query({
        query: QUERY_SITE_STYLES,
      })
      allItems.value = data.siteStyles.map(mapSiteStyleDates)
    } catch (err) {
      devLog('fetchAllItems siteStyleStore: ', err)
      common.error = err
    } finally {
      common.isLoading = false
    }
  }

  // 2️⃣ Subscriptions für Live-Updates
  // : SubscriptionHandler<SiteStyle>[]
  const subscriptions: AnySubscriptionSiteStyle[] = [
    {
      query: SUBSCRIPTION_SITE_STYLE_CREATED,
      handler: (msg: SiteStyle) => {
        devLog('SUBSCRIPTION_SITE_STYLE_CREATED', msg)
        if (!pagedItems.value.find((a) => a.id === msg.id)) {
          pagedItems.value = [msg, ...pagedItems.value] // <-- erzeugt neues Array
          totalCount.value++
        }
      },
    },
    {
      query: SUBSCRIPTION_SITE_STYLE_UPDATED,
      handler: (msg: SiteStyle) => {
        devLog('SUBSCRIPTION_SITE_STYLE_UPDATED', msg)
        pagedItems.value = pagedItems.value.map((a) => (a.id === msg.id ? msg : a))
        allItems.value = allItems.value.map((a) => (a.id === msg.id ? msg : a))
      },
    },
    {
      query: SUBSCRIPTION_SITE_STYLE_DELETED,
      handler: async (msg: SubscriptionDeleteSiteStyle) => {
        devLog('SUBSCRIPTION_SITE_STYLE_DELETED', msg)

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
  const {mutate: createMutateSiteStyle, loading: creatingLoading} = useMutation(
    MUTATIONEN_CREATE_SITE_STYLE,
    {
      update(cache, {data}) {
        if (!data?.createSiteStyle) return
        cache.modify({
          fields: {
            generals(existing = []) {
              const newRef = cache.writeFragment({
                data: data.createSiteStyle,
                fragment: gql`
                  fragment NewSiteStyle on SiteStyle {
                    id
                    name
                    description
                    htmlStyle
                    htmlClass
                    sorting
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

  const createItem = async (input?: Partial<SiteStyle>) => {
    const vars: SiteStyle = {
      name: input?.name ?? item.value.name,
      description: input?.description ?? item.value.description,
      htmlStyle: input?.htmlStyle ?? item.value.htmlStyle,
      htmlClass: input?.htmlClass ?? item.value.htmlClass,
      sorting: input?.sorting ?? item.value.sorting,
      comment: input?.comment ?? item.value.comment,
    }

    await createMutateSiteStyle(vars)
  }

  // ✅ UPDATE
  const {mutate: updateMutateSiteStyle, loading: updatingLoading} = useMutation(
    MUTATIONEN_UPDATE_SITE_STYLE,
  )

  const updateItem = async (input?: Partial<SiteStyle>) => {
    const vars: SiteStyle = {
      id: input?.id ?? item.value.id,
      name: input?.name ?? item.value.name,
      description: input?.description ?? item.value.description,
      htmlStyle: input?.htmlStyle ?? item.value.htmlStyle,
      htmlClass: input?.htmlClass ?? item.value.htmlClass,
      sorting: input?.sorting ?? item.value.sorting,
      comment: input?.comment ?? item.value.comment,
    }

    const result = await updateMutateSiteStyle(vars)
    if (result?.data?.updateSiteStyle) {
      pagedItems.value = pagedItems.value.map((g) =>
        g.id === result?.data.updateSiteStyle.id ? result?.data.updateSiteStyle : g,
      )
    }
  }

  // ✅ DELETE
  const {mutate: deleteMutateSiteStyle, loading: deletingLoading} = useMutation(
    MUTATIONEN_DELETE_SITE_STYLE,
  )

  const deleteItem = async (ids: (string | undefined)[]) => {
    const result = await deleteMutateSiteStyle({ids})

    if (result?.data?.deleteSiteStyle?.deleted) {
      const resultItems: SiteStyle[] = result?.data?.deleteSiteStyle.deleted

      for (let i = 0; i < resultItems.length; i++) {
        pagedItems.value = pagedItems.value.filter(
          (a) => a.id !== result?.data?.deleteSiteStyle.deleted[i].id,
        )

        pagedItems.value = [...pagedItems.value] // neue Referenz, um Reaktivität zu erzwingen
      }

      totalCount.value = result?.data.deleteSiteStyle?.totalCount // ✅ direkt aus Mutation
    }
  }

  // 📡 Bindung: loading/error direkt verknüpfen (reaktiv!)
  const isBusy = computed(
    () => creatingLoading.value || updatingLoading.value || deletingLoading.value,
  )

  watch([isBusy], () => {
    common.isLoading = isBusy.value
    // common.error = qError.value ?? null
  })

  /**
   * Route zum neuen Eintrag
   */
  const routeToNewItem = () => {
    return {name: 'site-style-new'}
  }

  /**
   * Route zum Bearbeiten
   * @param item
   */
  const routeToEditItem = (item: SiteStyle) => {
    return {name: 'site-style-edit', params: {id: item.id}}
  }

  /**
   * Route zum Löschen
   * @param item
   */
  const routeToDeleteItem = (item: SiteStyle) => {
    return {name: 'site-style-delete', params: {id: item.id}}
  }

  // ------------------------------------------------------
  // 🔥 MAP für schnellen Zugriff + GETTER
  // ------------------------------------------------------
  const stylesMap = computed(() => {
    const map: Record<string, SiteStyle> = {}

    for (const s of allItems.value) {
      map[s.name] = s
    }
    return map
  })

  const get = (name: string) => {
    return stylesMap.value[name] || null
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
    createItem,
    updateItem,
    deleteItem,
    onLazyLoad,
    fetchOnlyItem,
    fetchAllItems,
    routeToNewItem,
    routeToEditItem,
    routeToDeleteItem,
    stylesMap,
    get,
  }
})
