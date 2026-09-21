import { computed, ref, type Ref, watch } from 'vue'

import { useGeneralStore } from '@/stores/general.ts'
import { DEFAULT_GENERALS } from '@/assets/fallbacks/defaultGenerals.ts'
import { useCommonStore } from '@/stores/common.ts'

// 🔥 Fallbacks nur hier!
const FALLBACKS = Object.fromEntries(DEFAULT_GENERALS.map((g) => [g.name, g]))

export function useGenerals() {
  const store = useGeneralStore()
  const storeCommon = useCommonStore()

  const ready:Ref<boolean> = ref(false)

  // 1️⃣ Sofort prüfen: wenn loading fertig → aktivieren
  watch(
    () => storeCommon.isLoading,
    (loading) => {
      if (!loading) {
        ready.value = true
      }
    },
    { immediate: true }
  )

  // 2️⃣ Timeout fallback: egal ob DB hängt → nach X ms bereit werden
  setTimeout(() => {
    if (!ready.value) {
      console.warn('[useGenerals] Timeout → fallback aktiviert')
      ready.value = true
    }
  }, 500)


  // 3️⃣ Sicheres Getter
  function safeGet(dbName: string) {
    if (!ready.value) {
      return { name: '', value: '' } // Vor-Ladezustand
    }

    const dbValue = store.get(dbName)

    if (dbValue) {
      return {
        name: dbValue.name || FALLBACKS[dbName]?.name || '',
        value: dbValue.value || FALLBACKS[dbName]?.value || '',
      }
    }

    return FALLBACKS[dbName] || { name: '', value: '' }
  }

  // 4️⃣ Composable API
  return {
    ready: computed(() => ready.value),

    get: safeGet,

    item(dbName: string) {
      return computed(() => safeGet(dbName))
    },

    getName(dbName: string) {
      return computed(() => safeGet(dbName).name)
    },

    getValue(dbName: string) {
      return computed(() => safeGet(dbName).value)
    },

    getBool(dbName: string) {
      return computed(() => {
        const v = safeGet(dbName).value

        if (v === '1') return true
        if (v === '0') return false
        if (v === 'true') return true
        if (v === 'false') return false

        return Boolean(v)
      })
    }
  }
}
