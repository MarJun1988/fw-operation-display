import {useTranslationStore} from "@/stores/translate";
import pinia from "@/stores/store";
import {mainMenuNames, mainMenuRoutes, managementAreaNames, managementAreaRoutes} from "@/router/default";

// Store - Übersetzungen
const storeTranslation = useTranslationStore(pinia);
const {menus} = (storeTranslation)

const routesManagementArea = {
    path: `${mainMenuRoutes.managementArea}`,
    name: `${mainMenuNames.managementArea}`,
    redirect: `${managementAreaRoutes.groundSettings}`,
    components: {
        default: () => import("@/views/ManagementArea.vue"),
    },
    meta: {
        label: `${menus.mainMenu.managementArea.label}`,
        mainMenu: true,
        requiresAuth: true,
        requiresRole: []
    },
    children: [
        // Grundeinstellungen
        {
            path: `${managementAreaRoutes.groundSettings}`,
            name: `${managementAreaNames.groundSettings}`,
            components: {
                view: () => import("@/views/ManagementArea/GroundSettings.vue"),
                dialog: () => import("@/views/ManagementArea/GroundSettingDialog.vue")
            },
            meta: {
                tabNumber: 0,
                mainMenu: false,
                label: `${menus.mainMenu.managementArea.children.groundSettings.label}`,
                icon: `${menus.mainMenu.managementArea.children.groundSettings.icon}`,
            },
            children: [
                {
                    path: `${managementAreaRoutes.groundSettingNew}`,
                    name: `${managementAreaNames.groundSettingNew}`,
                    components: {
                        dialog: () => import("@/views/ManagementArea/GroundSettingDialog.vue")
                    },
                    meta: {
                        mainMenu: false,
                        label: ``,
                        icon: ``,
                    },
                },
                {
                    path: `${managementAreaRoutes.groundSettingEdit}/:id`,
                    name: `${managementAreaNames.groundSettingEdit}`,
                    components: {
                        dialog: () => import("@/views/ManagementArea/GroundSettingDialog.vue")
                    },
                    meta: {
                        mainMenu: false,
                        label: ``,
                        icon: ``,
                    },
                },
                {
                    path: `${managementAreaRoutes.groundSettingDelete}/:id`,
                    name: `${managementAreaNames.groundSettingDelete}`,
                    components: {
                        dialog: () => import("@/views/ManagementArea/GroundSettingDialog.vue")
                    },
                    meta: {
                        mainMenu: false,
                        label: ``,
                        icon: ``,
                    },
                },
            ]
        },
        // Eingegangen Alarmierungen
        {
            path: `${managementAreaRoutes.incomingAlerts}`,
            name: `${managementAreaNames.incomingAlerts}`,
            components: {
                view: () => import("@/views/ManagementArea/IncomingAlerts.vue"),
                dialog: () => import("@/views/ManagementArea/IncomingAlertDialog.vue")
            },
            meta: {
                tabNumber: 1,
                mainMenu: false,
                label: `${menus.mainMenu.managementArea.children.incomingAlerts.label}`,
                icon: `${menus.mainMenu.managementArea.children.incomingAlerts.icon}`,
            },
            children: [
                {
                    path: `${managementAreaRoutes.incomingAlertNew}`,
                    name: `${managementAreaNames.incomingAlertNew}`,
                    components: {
                        dialog: () => import("@/views/ManagementArea/IncomingAlertDialog.vue")
                    },
                    meta: {
                        mainMenu: false,
                        label: ``,
                        icon: ``,
                    },
                },
                {
                    path: `${managementAreaRoutes.incomingAlertEdit}/:id`,
                    name: `${managementAreaNames.incomingAlertEdit}`,
                    components: {
                        dialog: () => import("@/views/ManagementArea/IncomingAlertDialog.vue")
                    },
                    meta: {
                        mainMenu: false,
                        label: ``,
                        icon: ``,
                    },
                },
                {
                    path: `${managementAreaRoutes.incomingAlertDelete}/:id`,
                    name: `${managementAreaNames.incomingAlertDelete}`,
                    components: {
                        dialog: () => import("@/views/ManagementArea/IncomingAlertDialog.vue")
                    },
                    meta: {
                        mainMenu: false,
                        label: ``,
                        icon: ``,
                    },
                },
            ]
        },
        // Mitteilungen
        {
            path: `${managementAreaRoutes.messages}`,
            name: `${managementAreaNames.messages}`,
            components: {
                view: () => import("@/views/ManagementArea/Messages.vue"),
                dialog: () => import("@/views/ManagementArea/MessageDialog.vue")
            },
            meta: {
                tabNumber: 2,
                mainMenu: false,
                label: `${menus.mainMenu.managementArea.children.messages.label}`,
                icon: `${menus.mainMenu.managementArea.children.messages.icon}`,
            },
            children: [
                {
                    path: `${managementAreaRoutes.messageNew}`,
                    name: `${managementAreaNames.messageNew}`,
                    components: {
                        dialog: () => import("@/views/ManagementArea/MessageDialog.vue")
                    },
                    meta: {
                        mainMenu: false,
                        label: ``,
                        icon: ``,
                    },
                },
                {
                    path: `${managementAreaRoutes.messageEdit}/:id`,
                    name: `${managementAreaNames.messageEdit}`,
                    components: {
                        dialog: () => import("@/views/ManagementArea/MessageDialog.vue")
                    },
                    meta: {
                        mainMenu: false,
                        label: ``,
                        icon: ``,
                    },
                },
                {
                    path: `${managementAreaRoutes.messageDelete}/:id`,
                    name: `${managementAreaNames.messageDelete}`,
                    components: {
                        dialog: () => import("@/views/ManagementArea/MessageDialog.vue")
                    },
                    meta: {
                        mainMenu: false,
                        label: ``,
                        icon: ``,
                    },
                },
            ]
        },
        // Seiten Aussehen
        {
            path: `${managementAreaRoutes.siteStyles}`,
            name: `${managementAreaNames.siteStyles}`,
            components: {
                view: () => import("@/views/ManagementArea/SiteStyles.vue"),
                dialog: () => import("@/views/ManagementArea/SiteStyleDialog.vue")
            },
            meta: {
                tabNumber: 3,
                mainMenu: false,
                label: `${menus.mainMenu.managementArea.children.siteStyle.label}`,
                icon: `${menus.mainMenu.managementArea.children.siteStyle.icon}`,
            },
            children: [
                {
                    path: `${managementAreaRoutes.siteStyleNew}`,
                    name: `${managementAreaNames.siteStyleNew}`,
                    components: {
                        dialog: () => import("@/views/ManagementArea/SiteStyleDialog.vue")
                    },
                    meta: {
                        mainMenu: false,
                        label: ``,
                        icon: ``,
                    },
                },
                {
                    path: `${managementAreaRoutes.siteStyleEdit}/:id`,
                    name: `${managementAreaNames.siteStyleEdit}`,
                    components: {
                        dialog: () => import("@/views/ManagementArea/SiteStyleDialog.vue")
                    },
                    meta: {
                        mainMenu: false,
                        label: ``,
                        icon: ``,
                    },
                },
                {
                    path: `${managementAreaRoutes.siteStyleDelete}/:id`,
                    name: `${managementAreaNames.siteStyleDelete}`,
                    components: {
                        dialog: () => import("@/views/ManagementArea/SiteStyleDialog.vue")
                    },
                    meta: {
                        mainMenu: false,
                        label: ``,
                        icon: ``,
                    },
                },
            ]
        }
    ]
}

export {
    routesManagementArea
};