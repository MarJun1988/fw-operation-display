import {defineStore} from "pinia";
import {ref} from "vue";

let storeName = `Translation`;
export const useTranslationStore = defineStore(`store${storeName}`, () => {
    // State
    const components = ref(__COMPONENTS__);
    const confirmDialog = ref(__CONFIRM_DIALOG__);
    const dataTables = ref(__DATA_TABLES__);
    const dialogs = ref(__DIALOGS__);
    const generals = ref(__GENERALS__);
    const menus = ref(__MENUS__);
    const sites = ref(__SITES__);

    return {
        components,
        confirmDialog,
        dataTables,
        dialogs,
        generals,
        menus,
        sites
    }
});