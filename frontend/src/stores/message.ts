import { defineStore } from 'pinia'
import { computed, nextTick, ref, type Ref, watch } from 'vue'
import { useMutation, useSubscription } from '@vue/apollo-composable'
import type {
  AnySubscriptionMessage,
  CustomColumnProps,
  Message,
  SubscriptionDeleteMessage,
} from '@/utils/interfaces.ts'
import gql from 'graphql-tag'
import { useCommonStore } from '@/stores/common.ts'
import {
  MUTATIONEN_CREATE_MESSAGE,
  MUTATIONEN_DELETE_MESSAGE,
  MUTATIONEN_UPDATE_MESSAGE,
  QUERY_MESSAGE,
  QUERY_MESSAGES,
  QUERY_MESSAGES_PAGED,
  SUBSCRIPTION_MESSAGE_CREATED,
  SUBSCRIPTION_MESSAGE_DELETED,
  SUBSCRIPTION_MESSAGE_UPDATED,
} from '@/utils/graphql.ts'
import type { DataTableFilterMeta, DataTableSortMeta } from 'primevue/datatable'
import { FilterMatchMode } from '@primevue/core/api'
import type { DataTableFilterEvent, DataTablePageEvent, DataTableSortEvent } from 'primevue'
import { apolloClient } from '@/apollo.ts'
import type { RouteParamValue } from 'vue-router'
import { devLog } from '@/utils/utils.ts'

export const useMessageStore = defineStore('messageStore', () => {
  const item: Ref<Message> = ref<Message>({
    id: '',
    headline: '',
    message: '',
    iconId: '',
    icon: {
      id: '',
      name: '',
      path: '',
      comment: '',
      createdAt: new Date(),
      updatedAt: null,
      Message: null,
    },
    sorting: 0,
    createdAt: new Date(),
    updatedAt: null,
    comment: null,
  })
  const pagedItems: Ref<Message[]> = ref<Message[]>([])
  const allItems: Ref<Message[]> = ref<Message[]>([])
  const totalCount: Ref<number> = ref(0)
  // Spalten für die Sortierung
  const multiSortMeta: Ref<DataTableSortMeta[]> = ref([{field: 'createdAt', order: -1}])

  const filters: Ref<DataTableFilterMeta> = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    headline: { value: null, matchMode: FilterMatchMode.CONTAINS },
    message: { value: null, matchMode: FilterMatchMode.CONTAINS },
    iconId: { value: null, matchMode: FilterMatchMode.CONTAINS },
    icon: { value: null, matchMode: FilterMatchMode.CONTAINS },
    'icon.path': { value: null, matchMode: FilterMatchMode.CONTAINS },
    sorting: { value: null, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO },
    comment: { value: null, matchMode: FilterMatchMode.CONTAINS },
    createdAt: { value: null, matchMode: FilterMatchMode.DATE_IS },
    updatedAt: { value: null, matchMode: FilterMatchMode.DATE_IS },
  })

  /**
   * Spalten für die Tabelle
   */
  const columns: Ref<CustomColumnProps[]> = ref([
    {columnKey: 'message-id', field: 'id', header: '#', defaultShowing: false, dataType: 'text'},
    {
      columnKey: 'message-icon-path',
      field: 'icon.path',
      header: 'Vorschau',
      defaultShowing: true,
      excludeGlobalFilter: true,
      filterNotShowing: true,
      dataType: 'text',
      headerClass: 'w-30',
      bodyClass: 'text-center place-items-center',
    },
    {
      columnKey: 'message-headline',
      field: 'headline',
      header: 'Überschrift',
      defaultShowing: true,
      dataType: 'text'
    },
    {
      columnKey: 'message-message',
      field: 'message',
      header: 'Meldung',
      defaultShowing: true,
      dataType: 'text'
    },
    {
      columnKey: 'message-iconId',
      field: 'iconId',
      header: 'ID des Icon',
      defaultShowing: false,
      dataType: 'text'
    },
    {
      columnKey: 'message-icon',
      field: 'icon',
      header: 'Icon',
      defaultShowing: false,
      dataType: 'text'
    },
    {
      columnKey: 'message-sorting',
      field: 'sorting',
      header: 'Sortierung',
      defaultShowing: false,
      dataType: 'numeric'
    },
    {
      columnKey: 'message-comment',
      field: 'comment',
      header: 'Kommentar',
      defaultShowing: false,
      dataType: 'text'
    },
    {
      columnKey: 'message-createdAt',
      field: 'createdAt',
      header: 'erstellt am',
      dataType: 'date',
      defaultShowing: false,
    },
    {
      columnKey: 'message-updatedAt',
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
    headline: { value: null, matchMode: FilterMatchMode.CONTAINS },
    message: { value: null, matchMode: FilterMatchMode.CONTAINS },
    iconId: { value: null, matchMode: FilterMatchMode.CONTAINS },
    icon: { value: null, matchMode: FilterMatchMode.CONTAINS },
    'icon.path': { value: null, matchMode: FilterMatchMode.CONTAINS },
    sorting: { value: null, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO },
    comment: { value: null, matchMode: FilterMatchMode.CONTAINS },
    createdAt: { value: null, matchMode: FilterMatchMode.DATE_IS },
    updatedAt: { value: null, matchMode: FilterMatchMode.DATE_IS },
  }

  // Pagination-Zustand
  const page: Ref<number> = ref(0)
  const pageSize: Ref<number> = ref(10)

  // ✅ Lokaler Common-Store nur einmal referenzieren
  const common = useCommonStore()

  const mapMessageDates = (item: Message) => {
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
        query: QUERY_MESSAGES_PAGED,
        variables: { page: event },
        fetchPolicy: 'no-cache',
      })

      pagedItems.value = data.messagesPaged.items.map(mapMessageDates)
      totalCount.value = data.messagesPaged.totalRecords
    } finally {
      common.isLoading = false
    }
    common.isLoading = false
  }

  const fetchOnlyItem = async (id: string | RouteParamValue[]) => {
    try {
      common.isLoading = true
      const { data } = await apolloClient
        .query({
          query: QUERY_MESSAGE,
          variables: { messageId: id },
        })
        .finally(() => (common.isLoading = false))
      item.value.id = data.message.id
      item.value.headline = data.message.headline
      item.value.message = data.message.message
      item.value.iconId = data.message.iconId
      item.value.icon = data.message.icon
      item.value.sorting = data.message.sorting
      item.value.comment = data.message.comment
      item.value.createdAt = data.message.createdAt ? new Date(data.message.createdAt) : undefined
      item.value.updatedAt = data.message.updatedAt ? new Date(data.message.updatedAt) : undefined
    } catch (err) {
      devLog('fetchOnlyItem messageStore: ', err)
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
          query: QUERY_MESSAGES,
        })
        .finally(() => (common.isLoading = false))
      allItems.value = data.messages.map(mapMessageDates)
    } catch (err) {
      devLog('fetchAllItems messageStore: ', err)
      common.error = err
    } finally {
      common.isLoading = false
    }
  }

  // 2️⃣ Subscriptions für Live-Updates
  // : SubscriptionHandler<General>[]
  const subscriptions: AnySubscriptionMessage[] = [
    {
      query: SUBSCRIPTION_MESSAGE_CREATED,
      handler: (msg: Message) => {
        devLog('SUBSCRIPTION_MESSAGE_CREATED', msg)
        if (!pagedItems.value.find((a) => a.id === msg.id)) {
          pagedItems.value = [msg, ...pagedItems.value] // <-- erzeugt neues Array
          allItems.value = [msg, ...allItems.value] // <-- erzeugt neues Array
          totalCount.value++
        }
      },
    },
    {
      query: SUBSCRIPTION_MESSAGE_UPDATED,
      handler: (msg: Message) => {
        devLog('SUBSCRIPTION_MESSAGE_UPDATED', msg)
        pagedItems.value = pagedItems.value.map((a) => (a.id === msg.id ? msg : a))
        allItems.value = allItems.value.map((a) => (a.id === msg.id ? msg : a))
      },
    },
    {
      query: SUBSCRIPTION_MESSAGE_DELETED,
      handler: async (msg: SubscriptionDeleteMessage) => {
        devLog('SUBSCRIPTION_MESSAGE_DELETED', msg)
        if (!msg?.deleted?.length) return

        const deletedIds = msg.deleted.map((d) => d.id)
        pagedItems.value = pagedItems.value.filter((a) => !deletedIds.includes(a.id))
        allItems.value = allItems.value.filter((a) => !deletedIds.includes(a.id))

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
  const { mutate: createMutateMessage, loading: creatingLoading } = useMutation(
    MUTATIONEN_CREATE_MESSAGE,
    {
      update(cache, { data }) {
        if (!data?.createMessage) return
        cache.modify({
          fields: {
            generals(existing = []) {
              const newRef = cache.writeFragment({
                data: data.createMessage,
                fragment: gql`
                  fragment NewMessage on Message {
                    id
                    headline
                    message
                    iconId
                    icon {
                      id
                      name
                      path
                    }
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

  const createItem = async (input?: Partial<Message>) => {
    const vars: Message = {
      headline: input?.headline ?? item.value.headline,
      message: input?.message ?? item.value.message,
      iconId: input?.icon?.id ?? item.value.icon?.id,
      sorting: input?.sorting ?? item.value.sorting,
      comment: input?.comment ?? item.value.comment,
    }

    await createMutateMessage(vars)
  }

  // ✅ UPDATE
  const { mutate: updateMutateMessage, loading: updatingLoading } =
    useMutation(MUTATIONEN_UPDATE_MESSAGE)

  const updateItem = async (input?: Partial<Message>) => {
    const vars: Message = {
      id: input?.id ?? item.value.id,
      headline: input?.headline ?? item.value.headline,
      message: input?.message ?? item.value.message,
      iconId: input?.iconId ?? item.value.iconId,
      sorting: input?.sorting ?? item.value.sorting,
      comment: input?.comment ?? item.value.comment,
    }

    const result = await updateMutateMessage(vars)
    if (result?.data?.updateMessage) {
      pagedItems.value = pagedItems.value.map((m) =>
        m.id === result?.data.updateMessage.id ? result?.data.updateMessage : m,
      )
    }
  }

  // ✅ DELETE
  const { mutate: deleteMutateMessage, loading: deletingLoading } =
    useMutation(MUTATIONEN_DELETE_MESSAGE)

  const deleteItem = async (ids: (string | undefined)[]) => {
    const result = await deleteMutateMessage({ ids })

    if (result?.data?.deleteMessage?.deleted) {
      const resultItems: Message[] = result?.data?.deleteMessage.deleted

      for (let i = 0; i < resultItems.length; i++) {
        pagedItems.value = pagedItems.value.filter(
          (a) => a.id !== result?.data?.deleteMessage.deleted[i].id,
        )

        pagedItems.value = [...pagedItems.value] // neue Referenz, um Reaktivität zu erzwingen
      }

      totalCount.value = result?.data.deleteMessage?.totalCount // ✅ direkt aus Mutation
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
    return { name: 'message-new' }
  }

  /**
   * Route zum Bearbeiten
   * @param item
   */
  const routeToEditItem = (item: Message) => {
    return { name: 'message-edit', params: { id: item.id } }
  }

  /**
   * Route zum Löschen
   * @param item
   */
  const routeToDeleteItem = (item: Message) => {
    return { name: 'message-delete', params: { id: item.id } }
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
