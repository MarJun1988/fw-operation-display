import {useTranslationStore} from "@/stores/translate";
import pinia from "@/stores/store";
import {mainMenuNames, mainMenuRoutes} from "@/router/default";

// Store - Übersetzungen
const storeTranslation = useTranslationStore(pinia);
const {menus} = (storeTranslation)

const routesDisplayRaspberryPi = {
    path: `${mainMenuRoutes.displayRaspberryPi}`,
    name: `${mainMenuNames.displayRaspberryPi}`,
    component: () => import("@/views/DisplayRaspberryPi.vue"),
    meta: {
        label: `${menus.mainMenu.displayRaspberryPi.label}`,
        mainMenu: true,
        requiresAuth: true,
        requiresRole: []
    },
    children: []
}

export {
    routesDisplayRaspberryPi
};