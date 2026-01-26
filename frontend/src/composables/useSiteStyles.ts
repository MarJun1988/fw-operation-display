import {computed, ref, type Ref, watch} from 'vue'
import {useSiteStyleStore} from '@/stores/siteStyle'
import {DEFAULT_SITE_STYLES} from '@/assets/fallbacks/defaultSiteStyles.ts'
import {useCommonStore} from '@/stores/common.ts'
import {devLog} from "@/utils/utils.ts";

const FALLBACKS = Object.fromEntries(DEFAULT_SITE_STYLES.map((g) => [g.name, g]))

export function useSiteStyles() {
  const store = useSiteStyleStore()
  const storeCommon = useCommonStore()

  const ready: Ref<boolean> = ref(false)

  // 1️⃣ Sofort prüfen: wenn loading fertig → aktivieren
  watch(
    () => storeCommon.isLoading,
    (loading) => {
      if (!loading) {
        ready.value = true
      }
    },
    {immediate: true},
  )

  // 2️⃣ Timeout fallback: egal ob DB hängt → nach X ms bereit werden
  setTimeout(() => {
    if (!ready.value) {
      console.warn('[useSiteStyles] Timeout → fallback aktiviert')
      ready.value = true
    }
  }, 500)

  // 3️⃣ Sicheres Getter
  function safeGet(dbName: string) {
    if (!ready.value) {
      return {htmlClass: '', htmlStyle: ''} // Vor-Ladezustand
    }

    const dbValue = store.get(dbName)

    if (dbValue) {
      devLog('style', dbValue.htmlStyle)

      return {
        htmlClass: dbValue.htmlClass || FALLBACKS[dbName]?.htmlClass || '',
        htmlStyle: dbValue.htmlStyle || FALLBACKS[dbName]?.htmlStyle || '',
      }
    }

    return FALLBACKS[dbName] || {htmlClass: '', htmlStyle: ''}
  }

  // 4️⃣ Composable API
  return {
    ready: computed(() => ready.value),

    get: safeGet,

    style(dbName: string) {
      return computed(() => safeGet(dbName))
    },

    styleClass(dbName: string) {
      return computed(() => safeGet(dbName).htmlClass)
    },

    styleStyle(dbName: string) {
      return computed(() => safeGet(dbName).htmlStyle)
    },
  }
}
