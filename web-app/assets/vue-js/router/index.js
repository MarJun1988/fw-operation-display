import {createRouter, createWebHistory} from "vue-router";
import pinia from "@/stores/store";
import {mainMenuNames, mainMenuRoutes} from "@/router/default";
import {routesDisplayRaspberryPi} from "@/router/routesDisplayRaspberryPi";
import {routesManagementArea} from "@/router/routesManagementArea"

// Translations-Store
import {useTranslationStore} from "@/stores/translate";

// Translations-Store
const storeTranslation = useTranslationStore(pinia);
const {generals, menus} = storeTranslation;

const router = createRouter({
    history: createWebHistory(), routes: [
        // Standard Seite
        {
            path: `${mainMenuRoutes.default}`,
            name: `${mainMenuNames.default}`,
            redirect: `${mainMenuNames.displayRaspberryPi}`,
            component: () => import("@/views/DefaultSite.vue"),
            meta: {
                label: `${menus.mainMenu.label}`,
                mainMenu: false,
                requiresAuth: true,
                requiresRole: []
            },
            children: []
        },
        // Dashboard
        routesDisplayRaspberryPi,
        // Verwaltung
        routesManagementArea,
        // Seite nicht gefunden
        {
            path: "/:catchAll(.*)",
            component: () => import('@/views/NotFound.vue')
        },

    ]
});

router.beforeEach((to, from) => {
    // Festlegung des Seiten Titles
    let siteTitle = `${generals.siteTitle}`;
    let siteTitleShort = `${generals.siteTitleShort}`;

    window.document.title = to && to.meta.label ? `${siteTitleShort} - ${to.meta.label}` : siteTitle;

});

export default router;