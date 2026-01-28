<script lang="ts" setup>
import { computed, type ComputedRef, type Ref, ref } from 'vue'
import {
  type RouteLocationNormalizedLoaded,
  type Router,
  type RouteRecordNormalized,
  type RouteRecordRaw,
  useRoute,
  useRouter,
} from 'vue-router'

const props = defineProps<{
  parentName: string // z.B. "management-area"
}>()

const router: Router = useRouter()
const route: RouteLocationNormalizedLoaded = useRoute()

/**
 * Ruft aus dem VUE Router den Namen: 'management-area' ab um die Children zubekommen
 */
const getManagementAreaRoutes: Ref<RouteRecordNormalized[]> = ref(
  router.getRoutes().filter((route) => {
    return route.name === props.parentName
  }),
)

/**
 * Routen für den Tab aufbereiten bzw. abzugreifen aus dem Router
 */
const managementAreaRoutes: ComputedRef<RouteRecordRaw[] | undefined> = computed(() => {
  if (getManagementAreaRoutes.value.length > 0) {
    return getManagementAreaRoutes.value[0]?.children
  }
  return []
})

// --- Aktives Tab basierend auf aktueller URL bestimmen ---
const activeTab = computed(() => {
  if (!managementAreaRoutes.value?.length) return ''

  const pathSegments = route.path.split('/')
  const base = '/' + pathSegments.slice(1, 3).join('/')

  return managementAreaRoutes.value.find((r) => r.path === base)?.path ?? route.path
})
</script>

<template>
  <Tabs :value="activeTab">
    <TabList pt:tabList:class="justify-center bg-transparent">
      <Tab
        v-for="managementAreaRoute in managementAreaRoutes"
        :key="managementAreaRoute.name"
        :value="managementAreaRoute.path"
      >
        <router-link
          v-if="managementAreaRoute.path"
          v-slot="{ href, navigate }"
          :to="{ name: managementAreaRoute.name }"
          custom
        >
          <a
            v-ripple
            :href="href"
            class="flex flex-wrap items-center text-inherit"
            @click="navigate"
          >
            <i
              :class="managementAreaRoute?.meta?.icon"
              class="w-full"
            />
            <span class="w-full hidden md:block md:text-xs lg:text-base">{{
              managementAreaRoute?.meta?.label
            }}</span>
          </a>
        </router-link>
      </Tab>
    </TabList>
  </Tabs>
</template>
