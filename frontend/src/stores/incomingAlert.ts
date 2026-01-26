import type {
  AnySubscriptionIncomingAlert,
  CustomColumnProps,
  IncomingAlert,
  SubscriptionDeleteIncomingAlert,
} from '@/utils/interfaces.ts'
import { useCommonStore } from '@/stores/common.ts'
import { computed, type ComputedRef, nextTick, ref, type Ref, watch } from 'vue'
import type { DataTableFilterEvent, DataTablePageEvent, DataTableSortEvent } from 'primevue'
import { type RouteParamValue } from 'vue-router'
import { apolloClient } from '@/apollo.ts'
import { defineStore } from 'pinia'
import {
  MUTATIONEN_CREATE_INCOMING_ALERT,
  MUTATIONEN_DELETE_INCOMING_ALERT,
  MUTATIONEN_UPDATE_INCOMING_ALERT,
  QUERY_INCOMING_ALERT,
  QUERY_INCOMING_ALERTS_PAGED,
  SUBSCRIPTION_INCOMING_ALERT_CREATED,
  SUBSCRIPTION_INCOMING_ALERT_DELETED,
  SUBSCRIPTION_INCOMING_ALERT_UPDATED,
} from '@/utils/graphql.ts'
import { useMutation, useSubscription } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import type { DataTableFilterMeta, DataTableSortMeta } from 'primevue/datatable'
import { FilterMatchMode } from '@primevue/core/api'
import { devLog } from '@/utils/utils.ts'

export const useIncomingAlertStore = defineStore('incomingAlertStore', () => {
  const item: Ref<IncomingAlert> = ref<IncomingAlert>({
    id: '',
    address: '',
    text: '',
    createdAt: new Date(),
    updatedAt: null,
    comment: null,
  })
  const pagedItems: Ref<IncomingAlert[]> = ref<IncomingAlert[]>([])
  const allItems: Ref<IncomingAlert[]> = ref<IncomingAlert[]>([])
  const totalCount: Ref<number> = ref(0)
  // Spalten für die Sortierung
  const multiSortMeta: DataTableSortMeta[] = [{ field: 'createdAt', order: -1 }]

  const filters: Ref<DataTableFilterMeta> = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.CONTAINS },
    text: { value: null, matchMode: FilterMatchMode.CONTAINS },
    address: { value: null, matchMode: FilterMatchMode.CONTAINS },
    comment: { value: null, matchMode: FilterMatchMode.CONTAINS },
    createdAt: { value: null, matchMode: FilterMatchMode.DATE_IS },
    updatedAt: { value: null, matchMode: FilterMatchMode.DATE_IS },
  })

  /**
   * Spalten für die Tabelle
   */
  const columns: Ref<CustomColumnProps[]> = ref([
    { field: 'id', header: '#', defaultShowing: false, dataType: 'text' },
    { field: 'address', header: 'Adresse', defaultShowing: true, dataType: 'text' },
    { field: 'text', header: 'Text', defaultShowing: true, dataType: 'text' },
    { field: 'comment', header: 'Kommentar', defaultShowing: false, dataType: 'text' },
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
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.CONTAINS },
    text: { value: null, matchMode: FilterMatchMode.CONTAINS },
    address: { value: null, matchMode: FilterMatchMode.CONTAINS },
    comment: { value: null, matchMode: FilterMatchMode.CONTAINS },
    createdAt: { value: null, matchMode: FilterMatchMode.DATE_IS },
    updatedAt: { value: null, matchMode: FilterMatchMode.DATE_IS },
  }

  // Pagination-Zustand
  const page: Ref<number> = ref(0)
  const pageSize: Ref<number> = ref(10)

  // ✅ Lokaler Common-Store nur einmal referenzieren
  const common = useCommonStore()

  const mapIncomingAlertDates = (item: IncomingAlert) => {
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
      const { data } = await apolloClient.query({
        query: QUERY_INCOMING_ALERTS_PAGED,
        variables: { page: event },
        fetchPolicy: 'no-cache',
      })

      pagedItems.value = data.incomingAlertsPaged.items.map(mapIncomingAlertDates)
      totalCount.value = data.incomingAlertsPaged.totalRecords
    } catch (err) {
      devLog('onLazyLoad incomingAlertStore: ', err)
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
          query: QUERY_INCOMING_ALERT,
          variables: { incomingAlertId: id },
        })
        .finally(() => (common.isLoading = false))
      item.value.id = data.incomingAlert.id
      item.value.text = data.incomingAlert.text
      item.value.address = data.incomingAlert.address
      item.value.comment = data.incomingAlert.comment
      item.value.createdAt = data.incomingAlert.createdAt
        ? new Date(data.incomingAlert.createdAt)
        : undefined
      item.value.updatedAt = data.incomingAlert.updatedAt
        ? new Date(data.incomingAlert.updatedAt)
        : undefined
    } catch (err) {
      devLog('fetchOnlyItem incomingAlertStore: ', err)
      common.error = err
    } finally {
      common.isLoading = false
    }
  }

  // 2️⃣ Subscriptions für Live-Updates
  // : SubscriptionHandler<General>[]
  const subscriptions: AnySubscriptionIncomingAlert[] = [
    {
      query: SUBSCRIPTION_INCOMING_ALERT_CREATED,
      handler: (msg: IncomingAlert) => {
        devLog('SUBSCRIPTION_INCOMING_ALERT_CREATED', msg)
        if (!pagedItems.value.find((a) => a.id === msg.id)) {
          pagedItems.value = [msg, ...pagedItems.value] // <-- erzeugt neues Array
          totalCount.value++
        }
      },
    },
    {
      query: SUBSCRIPTION_INCOMING_ALERT_UPDATED,
      handler: (msg: IncomingAlert) => {
        devLog('SUBSCRIPTION_INCOMING_ALERT_UPDATED', msg)
        pagedItems.value = pagedItems.value.map((a) => (a.id === msg.id ? msg : a))
      },
    },
    {
      query: SUBSCRIPTION_INCOMING_ALERT_DELETED,
      handler: async (msg: SubscriptionDeleteIncomingAlert) => {
        devLog('SUBSCRIPTION_INCOMING_ALERT_DELETED', msg)
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
  const { mutate: createMutateIncomingAlert, loading: creatingLoading } = useMutation(
    MUTATIONEN_CREATE_INCOMING_ALERT,
    {
      update(cache, { data }) {
        if (!data?.createIncomingAlert) return
        cache.modify({
          fields: {
            generals(existing = []) {
              const newRef = cache.writeFragment({
                data: data.createIncomingAlert,
                fragment: gql`
                  fragment NewIncomingAlert on IncomingAlert {
                    id
                    address
                    text
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

  const createItem = async (input?: Partial<IncomingAlert>) => {
    const vars: IncomingAlert = {
      address: input?.address ?? item.value.address,
      text: input?.text ?? item.value.text,
      comment: input?.comment ?? item.value.comment,
    }

    await createMutateIncomingAlert(vars)
  }

  // ✅ UPDATE
  const { mutate: updateMutateIncomingAlert, loading: updatingLoading } = useMutation(
    MUTATIONEN_UPDATE_INCOMING_ALERT,
  )

  const updateItem = async (input?: Partial<IncomingAlert>) => {
    const vars: IncomingAlert = {
      id: input?.id ?? item.value.id,
      address: input?.address ?? item.value.address,
      text: input?.text ?? item.value.text,
      comment: input?.comment ?? item.value.comment,
    }

    const result = await updateMutateIncomingAlert(vars)
    if (result?.data?.updateIncomingAlert) {
      pagedItems.value = pagedItems.value.map((g) =>
        g.id === result?.data.updateIncomingAlert.id ? result?.data.updateIncomingAlert : g,
      )
    }
  }

  // ✅ DELETE
  const { mutate: deleteMutateIncomingAlert, loading: deletingLoading } = useMutation(
    MUTATIONEN_DELETE_INCOMING_ALERT,
  )

  const deleteItem = async (ids: (string | undefined)[]) => {
    const result = await deleteMutateIncomingAlert({ ids })

    if (result?.data?.deleteIncomingAlert?.deleted) {
      const resultItems: IncomingAlert[] = result?.data?.deleteIncomingAlert.deleted

      for (let i = 0; i < resultItems.length; i++) {
        pagedItems.value = pagedItems.value.filter(
          (a) => a.id !== result?.data?.deleteIncomingAlert.deleted[i].id,
        )

        pagedItems.value = [...pagedItems.value] // neue Referenz, um Reaktivität zu erzwingen
      }

      totalCount.value = result?.data.deleteIncomingAlert?.totalCount // ✅ direkt aus Mutation

      // generals.value = generals.value.filter((g: General) => !ids.includes(g.id))
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
    return { name: 'incoming-alert-new' }
  }

  /**
   * Route zum Bearbeiten
   * @param item
   */
  const routeToEditItem = (item: IncomingAlert) => {
    return { name: 'incoming-alert-edit', params: { id: item.id } }
  }

  /**
   * Route zum Löschen
   * @param item
   */
  const routeToDeleteItem = (item: IncomingAlert) => {
    return { name: 'incoming-alert-delete', params: { id: item.id } }
  }

  const getLastIncomingAlert: ComputedRef<IncomingAlert> = computed(() => {
    if (pagedItems.value && pagedItems.value.length > 0 && pagedItems.value[0]) {
      return pagedItems.value[0]
    }
    return item.value
  })

  const getLastIncomingAlertAddress = computed(() => {
    if (pagedItems.value && pagedItems.value.length > 0 && pagedItems.value[0]) {
      // per Regex Nachricht zerlegen
      /**
       * Erwartete Ausgabe:
       * [0] Ort-Ortsteil Straße Hausnummer
       * [1] Objekt Beschreibung
       * [2] Tätigkeit
       * [3] Alarmtext Lang
       * [4] Datum & Uhrzeit
       */
      const matches = [...pagedItems.value[0].text.matchAll(/\/([^/]+)/g)].map((m) =>
        m && m.length > 1 && m[1] ? m[1].trim() : '',
      )

      devLog('getLastIncomingAlertAddress - Regex match: ', matches)

      if (matches && matches.length > 0 && matches[0]) {
        // Trennung Ort und Ortsteil
        const addressSplit = matches[0].split('-')

        devLog('getLastIncomingAlertAddress - addressSplit: ', addressSplit)

        // Anpassung, wenn Namen zusammen geschrieben sind
        let addressByCaps: string = ''
        if (addressSplit && addressSplit.length > 0 && addressSplit[1]) {
          addressByCaps = addressSplit[1].replace(/([A-Z])/g, ' $1').trim().replace(/\bStr\./g, 'Straße')
        }

        const result = {
          addressText: `${matches[0]} ${matches[1] ? '(' + matches[1].trim() + ')' : ''}`,
          addressForCoordinates: addressByCaps,
        }

        devLog('getLastIncomingAlertAddress - result ', result)
        return result
      }
    }
    return {
      addressText: '',
      addressForCoordinates: '',
    }
  })

  return {
    filters,
    page,
    pageSize,
    item,
    multiSortMeta,
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
    routeToNewItem,
    routeToEditItem,
    routeToDeleteItem,
    getLastIncomingAlert,
    getLastIncomingAlertAddress,
  }
})
