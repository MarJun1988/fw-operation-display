import {createRouter, createWebHistory} from 'vue-router'
import {useGeneralStore} from "@/stores/general.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashBoard.vue'),
    },

    // Verwaltung
    {
      path: '/management-area/',
      name: 'management-area',
      component: () => import('@/views/ManagementArea/ManageMent.vue'),
      redirect: '/management-area/ground-setting',
      children: [
        // Grundeinstellungen
        {
          path: '/management-area/ground-setting',
          name: 'ground-setting',
          meta: {
            label: 'Grundeinstellungen',
            icon: 'pi pi-cog',
          },
          redirect: '/management-area/ground-setting/overview',
          children: [
            {
              path: '/management-area/ground-setting/overview',
              name: 'ground-setting-overview',
              components: {
                default: () =>
                  import('@/views/ManagementArea/GroundSettings/GroundSettingOverview.vue'),
              },
            },
            {
              path: '/management-area/ground-setting/new',
              name: 'ground-setting-new',
              components: {
                default: () =>
                  import('@/views/ManagementArea/GroundSettings/GroundSettingOverview.vue'),
                dialog: () =>
                  import('@/views/ManagementArea/GroundSettings/GroundSettingDialog.vue'),
              },
            },
            {
              path: '/management-area/ground-setting/edit/:id',
              name: 'ground-setting-edit',
              components: {
                default: () =>
                  import('@/views/ManagementArea/GroundSettings/GroundSettingOverview.vue'),
                dialog: () =>
                  import('@/views/ManagementArea/GroundSettings/GroundSettingDialog.vue'),
              },
              props: {
                default: false, // Route-Params als Props für GroundSettingOverview
                dialog: true, // Route-Params als Props für GroundSettingDialog
              },
            },
            {
              path: '/management-area/ground-setting/delete/:id',
              name: 'ground-setting-delete',
              components: {
                default: () =>
                  import('@/views/ManagementArea/GroundSettings/GroundSettingOverview.vue'),
                dialog: () =>
                  import('@/views/ManagementArea/GroundSettings/GroundSettingDialogDelete.vue'),
              },
              props: {
                default: false, // Route-Params als Props für GroundSettingOverview
                dialog: true, // Route-Params als Props für GroundSettingDialog
              },
            },
          ],
        },
        // Alarmierungen
        {
          path: '/management-area/incoming-alert',
          name: 'incoming-alert',
          meta: {
            label: 'Eingegangene Alarmierungen',
            icon: 'pi pi-bell',
          },
          redirect: '/management-area/incoming-alert/overview',
          children: [
            {
              path: '/management-area/incoming-alert/overview',
              name: 'incoming-alert-overview',
              components: {
                default: () =>
                  import('@/views/ManagementArea/IncomingAlerts/IncomingAlertOverview.vue'),
              },
            },
            {
              path: '/management-area/incoming-alert/new',
              name: 'incoming-alert-new',
              components: {
                default: () =>
                  import('@/views/ManagementArea/IncomingAlerts/IncomingAlertOverview.vue'),
                dialog: () =>
                  import('@/views/ManagementArea/IncomingAlerts/IncomingAlertDialog.vue'),
              },
              props: {
                default: false, // Route-Params als Props für GroundSettingOverview
                dialog: true, // Route-Params als Props für GroundSettingDialog
              },
            },
            {
              path: '/management-area/incoming-alert/edit/:id',
              name: 'incoming-alert-edit',
              components: {
                default: () =>
                  import('@/views/ManagementArea/IncomingAlerts/IncomingAlertOverview.vue'),
                dialog: () =>
                  import('@/views/ManagementArea/IncomingAlerts/IncomingAlertDialog.vue'),
              },
              props: {
                default: false, // Route-Params als Props für GroundSettingOverview
                dialog: true, // Route-Params als Props für GroundSettingDialog
              },
            },
            {
              path: '/management-area/incoming-alert/delete/:id',
              name: 'incoming-alert-delete',
              components: {
                default: () =>
                  import('@/views/ManagementArea/IncomingAlerts/IncomingAlertOverview.vue'),
                dialog: () =>
                  import('@/views/ManagementArea/IncomingAlerts/IncomingAlertDialogDelete.vue'),
              },
              props: {
                default: false, // Route-Params als Props für GroundSettingOverview
                dialog: true, // Route-Params als Props für GroundSettingDialog
              },
            },
          ],
        },
        // Meldungen
        {
          path: '/management-area/message',
          name: 'message',
          meta: {
            label: 'Mitteilungen',
            icon: 'pi pi-envelope',
          },
          redirect: '/management-area/message/overview',
          children: [
            {
              path: '/management-area/message/overview',
              name: 'message-overview',
              components: {
                default: () => import('@/views/ManagementArea/Messages/MessageOverview.vue'),
              },
            },
            {
              path: '/management-area/message/new',
              name: 'message-new',
              components: {
                default: () => import('@/views/ManagementArea/Messages/MessageOverview.vue'),
                dialog: () => import('@/views/ManagementArea/Messages/MessageDialog.vue'),
              },
              props: {
                default: false, // Route-Params als Props für GroundSettingOverview
                dialog: true, // Route-Params als Props für GroundSettingDialog
              },
            },
            {
              path: '/management-area/message/edit/:id',
              name: 'message-edit',
              components: {
                default: () => import('@/views/ManagementArea/Messages/MessageOverview.vue'),
                dialog: () => import('@/views/ManagementArea/Messages/MessageDialog.vue'),
              },
              props: {
                default: false, // Route-Params als Props für GroundSettingOverview
                dialog: true, // Route-Params als Props für GroundSettingDialog
              },
            },
            {
              path: '/management-area/message/delete/:id',
              name: 'message-delete',
              components: {
                default: () => import('@/views/ManagementArea/Messages/MessageOverview.vue'),
                dialog: () => import('@/views/ManagementArea/Messages/MessageDialogDelete.vue'),
              },
              props: {
                default: false, // Route-Params als Props für GroundSettingOverview
                dialog: true, // Route-Params als Props für GroundSettingDialog
              },
            },
          ],
        },
        // Icon der Meldung
        {
          path: '/management-area/message-icon',
          name: 'message-icon',
          meta: {
            label: 'Mitteilungsicon',
            icon: 'pi pi-images',
          },
          redirect: '/management-area/message-icon/overview',
          children: [
            {
              path: '/management-area/message-icon/overview',
              name: 'message-icon-overview',
              components: {
                default: () =>
                  import('@/views/ManagementArea/MessageIcons/MessageIconOverview.vue'),
              },
            },
            {
              path: '/management-area/message-icon/new',
              name: 'message-icon-new',
              components: {
                default: () =>
                  import('@/views/ManagementArea/MessageIcons/MessageIconOverview.vue'),
                dialog: () => import('@/views/ManagementArea/MessageIcons/MessageIconDialog.vue'),
              },
              props: {
                default: false, // Route-Params als Props für GroundSettingOverview
                dialog: true, // Route-Params als Props für GroundSettingDialog
              },
            },
            {
              path: '/management-area/message-icon/edit/:id',
              name: 'message-icon-edit',
              components: {
                default: () =>
                  import('@/views/ManagementArea/MessageIcons/MessageIconOverview.vue'),
                dialog: () => import('@/views/ManagementArea/MessageIcons/MessageIconDialog.vue'),
              },
              props: {
                default: false, // Route-Params als Props für GroundSettingOverview
                dialog: true, // Route-Params als Props für GroundSettingDialog
              },
            },
            {
              path: '/management-area/message-icon/delete/:id',
              name: 'message-icon-delete',
              components: {
                default: () =>
                  import('@/views/ManagementArea/MessageIcons/MessageIconOverview.vue'),
                dialog: () =>
                  import('@/views/ManagementArea/MessageIcons/MessageIconDialogDelete.vue'),
              },
              props: {
                default: false, // Route-Params als Props für GroundSettingOverview
                dialog: true, // Route-Params als Props für GroundSettingDialog
              },
            },
          ],
        },
        // Aussehen des Dashboards
        {
          path: '/management-area/site-style',
          name: 'site-style',
          meta: {
            label: 'Darstellungen (CSS)',
            icon: 'pi pi-tags',
          },
          redirect: '/management-area/site-style/overview',
          children: [
            {
              path: '/management-area/site-style/overview',
              name: 'site-style-overview',
              components: {
                default: () => import('@/views/ManagementArea/SiteStyles/SiteStyleOverview.vue'),
              },
            },
            {
              path: '/management-area/site-style/new',
              name: 'site-style-new',
              components: {
                default: () => import('@/views/ManagementArea/SiteStyles/SiteStyleOverview.vue'),
                dialog: () => import('@/views/ManagementArea/SiteStyles/SiteStyleDialog.vue'),
              },
            },
            {
              path: '/management-area/site-style/edit/:id',
              name: 'site-style-edit',
              components: {
                default: () => import('@/views/ManagementArea/SiteStyles/SiteStyleOverview.vue'),
                dialog: () => import('@/views/ManagementArea/SiteStyles/SiteStyleDialog.vue'),
              },
              props: {
                default: false, // Route-Params als Props für GroundSettingOverview
                dialog: true, // Route-Params als Props für GroundSettingDialog
              },
            },
            {
              path: '/management-area/site-style/delete/:id',
              name: 'site-style-delete',
              components: {
                default: () => import('@/views/ManagementArea/SiteStyles/SiteStyleOverview.vue'),
                dialog: () => import('@/views/ManagementArea/SiteStyles/SiteStyleDialogDelete.vue'),
              },
              props: {
                default: false, // Route-Params als Props für GroundSettingOverview
                dialog: true, // Route-Params als Props für GroundSettingDialog
              },
            },
          ],
        },
        // Version
        {
          path: '/management-area/version',
          name: 'version',
          meta: {
            label: 'Version',
            icon: 'pi pi-check-circle',
          },
          redirect: '/management-area/version/overview',
          children: [
            {
              path: '/management-area/version/overview',
              name: 'version-overview',
              components: {
                default: () =>
                  import('@/views/ManagementArea/Version/VersionOverview.vue'),
              },
            },
            {
              path: '/management-area/version/new',
              name: 'version-new',
              components: {
                default: () =>
                  import('@/views/ManagementArea/Version/VersionOverview.vue'),
                dialog: () =>
                  import('@/views/ManagementArea/Version/VersionDialog.vue'),
              },
            },
            {
              path: '/management-area/version/edit/:id',
              name: 'version-edit',
              components: {
                default: () =>
                  import('@/views/ManagementArea/Version/VersionOverview.vue'),
                dialog: () =>
                  import('@/views/ManagementArea/Version/VersionDialog.vue'),
              },
              props: {
                default: false, // Route-Params als Props für GroundSettingOverview
                dialog: true, // Route-Params als Props für GroundSettingDialog
              },
            },
            {
              path: '/management-area/version/delete/:id',
              name: 'version-delete',
              components: {
                default: () =>
                  import('@/views/ManagementArea/Version/VersionOverview.vue'),
                dialog: () =>
                  import('@/views/ManagementArea/Version/VersionDialogDelete.vue'),
              },
              props: {
                default: false, // Route-Params als Props für GroundSettingOverview
                dialog: true, // Route-Params als Props für GroundSettingDialog
              },
            },
          ],
        },
      ],
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
})

router.beforeEach(async (to) => {
  const storeGeneral = useGeneralStore()

  // DB-Werte einmal laden
  if (!storeGeneral.isBusy) {
    await storeGeneral.fetchAllItems()
  }

  const baseTitle = storeGeneral.getSiteTitle

  // optional: Route-spezifisch
  const routeTitle =
    typeof to.meta.label === 'string'
      ? ` – ${to.meta.label}`
      : ''

  document.title = `${baseTitle}${routeTitle}`
})

export default router
