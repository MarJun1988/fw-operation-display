import { defineStore } from 'pinia'
import { computed, nextTick, ref, type Ref, watch } from 'vue'
import type {
  AnySubscriptionMessageIcon,
  CustomColumnProps,
  MessageIcon,
  SubscriptionDeleteMessageIcon,
} from '@/utils/interfaces.ts'
import { useCommonStore } from '@/stores/common.ts'
import type { DataTableFilterMeta, DataTableSortMeta } from 'primevue/datatable'
import { FilterMatchMode } from '@primevue/core/api'
import type { DataTableFilterEvent, DataTablePageEvent, DataTableSortEvent } from 'primevue'
import { apolloClient } from '@/apollo.ts'
import {
  MUTATIONEN_CREATE_MESSAGE_ICON,
  MUTATIONEN_DELETE_MESSAGE_ICON,
  MUTATIONEN_UPDATE_MESSAGE_ICON,
  QUERY_MESSAGE_ICON,
  QUERY_MESSAGE_ICONS,
  QUERY_MESSAGE_ICONS_PAGED,
  SUBSCRIPTION_MESSAGE_ICON_CREATED,
  SUBSCRIPTION_MESSAGE_ICON_DELETED,
  SUBSCRIPTION_MESSAGE_ICON_UPDATED,
} from '@/utils/graphql.ts'
import type { RouteParamValue } from 'vue-router'
import { useMutation, useSubscription } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { devLog } from '@/utils/utils.ts'

export const useMessageIconStore = defineStore('messageIconStore', () => {
  const item = ref<MessageIcon>({
    id: '',
    name: '',
    path: '',
    comment: null,
    createdAt: new Date(),
    updatedAt: null,
    Message: null,
  })
  const pagedItems: Ref<MessageIcon[]> = ref<MessageIcon[]>([])
  const allItems: Ref<MessageIcon[]> = ref<MessageIcon[]>([])
  const totalCount: Ref<number> = ref(0)
  // Spalten für die Sortierung
  const multiSortMeta: Ref<DataTableSortMeta[]> = ref([{field: 'name', order: -1}])

  const filters: Ref<DataTableFilterMeta> = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    path: { value: null, matchMode: FilterMatchMode.CONTAINS },
    comment: { value: null, matchMode: FilterMatchMode.CONTAINS },
    createdAt: { value: null, matchMode: FilterMatchMode.DATE_IS },
    updatedAt: { value: null, matchMode: FilterMatchMode.DATE_IS },
  })

  /**
   * Spalten für die Tabelle
   */
  const columns: Ref<CustomColumnProps[]> = ref([
    {
      columnKey: 'message-icon-id',
      field: 'id',
      header: '#',
      defaultShowing: false,
      dataType: 'text'
    },
    {
      columnKey: 'message-icon-path-preview',
      field: 'path',
      header: 'Vorschau',
      defaultShowing: true,
      dataType: 'text',
      excludeGlobalFilter: true,
      filterNotShowing: true,
      headerClass: 'w-30',
      bodyClass: 'text-center place-items-center',
    },
    {
      columnKey: 'message-icon-name',
      field: 'name',
      header: 'Bezeichnung',
      defaultShowing: true,
      dataType: 'text'
    },
    {
      columnKey: 'message-icon-path',
      field: 'path',
      header: 'Pfade',
      defaultShowing: false,
      dataType: 'text'
    },
    {
      columnKey: 'message-icon-comment',
      field: 'comment',
      header: 'Kommentar',
      defaultShowing: false,
      dataType: 'text'
    },
    {
      columnKey: 'message-icon-createdAt',
      field: 'createdAt',
      header: 'erstellt am',
      dataType: 'date',
      defaultShowing: false,
    },
    {
      columnKey: 'message-icon-updatedAt',
      field: 'updatedAt',
      header: 'letzte bearbeitung',
      dataType: 'date',
      defaultShowing: false,
    },
  ])

  // Definierung der Filter
  const defaultFilters = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    path: { value: null, matchMode: FilterMatchMode.CONTAINS },
    comment: { value: null, matchMode: FilterMatchMode.CONTAINS },
    createdAt: { value: null, matchMode: FilterMatchMode.DATE_IS },
    updatedAt: { value: null, matchMode: FilterMatchMode.DATE_IS },
  }

  // Pagination-Zustand
  const page: Ref<number> = ref(0)
  const pageSize: Ref<number> = ref(10)

  // ✅ Lokaler Common-Store nur einmal referenzieren
  const common = useCommonStore()

  const mapMessageIconDates = (item: MessageIcon) => {
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
      const { data } = await apolloClient.query({
        query: QUERY_MESSAGE_ICONS_PAGED,
        variables: { page: event },
        fetchPolicy: 'no-cache',
      })

      pagedItems.value = data.messageIconsPaged.items.map(mapMessageIconDates)
      totalCount.value = data.messageIconsPaged.totalRecords
    } catch (err) {
      devLog('onLazyLoad messageIconStore: ', err)
      common.error = err
    } finally {
      common.isLoading = false
    }
  }

  const fetchOnlyItem = async (id: string | RouteParamValue[]) => {
    try {
      common.isLoading = true
      const { data } = await apolloClient
        .query({
          query: QUERY_MESSAGE_ICON,
          variables: { messageIconId: id },
        })
        .finally(() => (common.isLoading = false))
      item.value.id = data.messageIcon.id
      item.value.name = data.messageIcon.name
      item.value.path = data.messageIcon.path
      item.value.comment = data.messageIcon.comment
      item.value.createdAt = data.messageIcon.createdAt
        ? new Date(data.messageIcon.createdAt)
        : undefined
      item.value.updatedAt = data.messageIcon.updatedAt
        ? new Date(data.messageIcon.updatedAt)
        : undefined
      item.value.Message = data.messageIcon.Message
    } catch (err) {
      devLog('fetchOnlyItem messageIconStore: ', err)
      common.error = err
    } finally {
      common.isLoading = false
    }
  }
  const fetchAllItems = async () => {
    try {
      common.isLoading = true
      const { data } = await apolloClient
        .query({
          query: QUERY_MESSAGE_ICONS,
        })
        .finally(() => (common.isLoading = false))
      allItems.value = data.messageIcons.map(mapMessageIconDates)
    } catch (err) {
      devLog('fetchAllItems messageIconStore: ', err)
      common.error = err
    } finally {
      common.isLoading = false
    }
  }

  // 2️⃣ Subscriptions für Live-Updates
  // : SubscriptionHandler<General>[]
  const subscriptions: AnySubscriptionMessageIcon[] = [
    {
      query: SUBSCRIPTION_MESSAGE_ICON_CREATED,
      handler: (msg: MessageIcon) => {
        devLog('SUBSCRIPTION_MESSAGE_ICON_CREATED', msg)
        if (!pagedItems.value.find((a) => a.id === msg.id)) {
          pagedItems.value = [msg, ...pagedItems.value] // <-- erzeugt neues Array
          totalCount.value++
        }
      },
    },
    {
      query: SUBSCRIPTION_MESSAGE_ICON_UPDATED,
      handler: (msg: MessageIcon) => {
        devLog('SUBSCRIPTION_MESSAGE_ICON_UPDATED', msg)
        pagedItems.value = pagedItems.value.map((a) => (a.id === msg.id ? msg : a))
        allItems.value = allItems.value.map((a) => (a.id === msg.id ? msg : a))
      },
    },
    {
      query: SUBSCRIPTION_MESSAGE_ICON_DELETED,
      handler: async (msg: SubscriptionDeleteMessageIcon) => {
        devLog('SUBSCRIPTION_MESSAGE_ICON_DELETED', msg)
        if (!msg?.deleted?.length) return

        const deletedIds = msg.deleted.map((d) => d.id)
        pagedItems.value = pagedItems.value.filter((a) => !deletedIds.includes(a.id))

        totalCount.value = msg.totalCount ?? pagedItems.value.length

        if (pagedItems.value.length !== totalCount.value) {
          await onLazyLoad({ first: pageSize.value * page.value, rows: pageSize.value })
        }
      },
    },
  ]

  subscriptions.forEach(({ query, handler }) => {
    const { onResult } = useSubscription(query)

    onResult(({ data }) => {
      if (!data) return

      // Name des Subscription-Felds herausfinden
      const key = Object.keys(data)[0] as keyof typeof data

      // Exakter Typ wird automatisch zugewiesen
      const msg = data[key]

      handler(msg)
    })
  })

  // ✅ CREATE
  const { mutate: createMutateMessageIcon, loading: creatingLoading } = useMutation(
    MUTATIONEN_CREATE_MESSAGE_ICON,
    {
      update(cache, { data }) {
        if (!data?.createMessageIcon) return
        cache.modify({
          fields: {
            generals(existing = []) {
              const newRef = cache.writeFragment({
                data: data.createMessageIcon,
                fragment: gql`
                  fragment NewMessageIcon on MessageIcon {
                    id
                    name
                    path
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

  const createItem = async (input?: Partial<MessageIcon>) => {
    const vars: MessageIcon = {
      name: input?.name ?? item.value.name,
      path: input?.path ?? item.value.path,
      comment: input?.comment ?? item.value.comment,
    }

    await createMutateMessageIcon(vars)
  }

  // ✅ UPDATE
  const { mutate: updateMutateMessageIcon, loading: updatingLoading } = useMutation(
    MUTATIONEN_UPDATE_MESSAGE_ICON,
  )

  const updateItem = async (input?: Partial<MessageIcon>) => {
    const vars: MessageIcon = {
      id: input?.id ?? item.value.id,
      name: input?.name ?? item.value.name,
      path: input?.path ?? item.value.path,
      comment: input?.comment ?? item.value.comment,
    }

    const result = await updateMutateMessageIcon(vars)
    if (result?.data?.updateMessageIcon) {
      pagedItems.value = pagedItems.value.map((m) =>
        m.id === result?.data.updateMessageIcon.id ? result?.data.updateMessageIcon : m,
      )
    }
  }

  // ✅ DELETE
  const { mutate: deleteMutateMessageIcon, loading: deletingLoading } = useMutation(
    MUTATIONEN_DELETE_MESSAGE_ICON,
  )

  const deleteItem = async (ids: (string | undefined)[]) => {
    const result = await deleteMutateMessageIcon({ ids })

    if (result?.data?.deleteMessageIcon?.deleted) {
      const resultItems: MessageIcon[] = result?.data?.deleteMessageIcon.deleted

      for (let i = 0; i < resultItems.length; i++) {
        pagedItems.value = pagedItems.value.filter(
          (a) => a.id !== result?.data?.deleteMessageIcon.deleted[i].id,
        )

        pagedItems.value = [...pagedItems.value] // neue Referenz, um Reaktivität zu erzwingen
      }

      totalCount.value = result?.data.deleteMessageIcon?.totalCount // ✅ direkt aus Mutation
    }
  }

  // 📡 Bindung: loading/error direkt verknüpfen (reaktiv!)
  const isBusy = computed(
    () => creatingLoading.value || updatingLoading.value || deletingLoading.value,
  )

  watch([isBusy], () => {
    common.isLoading = isBusy.value
  })

  /**
   * Route zum neuen Eintrag
   */
  const routeToNewItem = () => {
    return { name: 'message-icon-new' }
  }

  /**
   * Route zum Bearbeiten
   * @param item
   */
  const routeToEditItem = (item: MessageIcon) => {
    return { name: 'message-icon-edit', params: { id: item.id } }
  }

  /**
   * Route zum Löschen
   * @param item
   */
  const routeToDeleteItem = (item: MessageIcon) => {
    return { name: 'message-icon-delete', params: { id: item.id } }
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
  }
})
