import {defineStore, storeToRefs} from "pinia";
import {useApiStore} from "@/stores/api";
import {ref} from "vue";
import axios from "axios";
import pinia from "@/stores/store";
import {useTranslationStore} from "@/stores/translate";
import {useDataTableStore} from "@/stores/dataTable";
import {useGroundSettingStore} from "@/stores/ManagementArea/groundSetting";
import {useIncomingAlertStore} from "@/stores/ManagementArea/incomingAlert";
import {useMessageStore} from "@/stores/ManagementArea/message";
import {useSiteStyleStore} from "@/stores/ManagementArea/siteStyle";
//
const apiUrl = useApiStore(pinia);
//
// Translations-Store
const storeTranslation = useTranslationStore();
const {toastMessage} = storeToRefs(storeTranslation)

let nameOfTheStore = `Entity`;
export const useEntityStore = defineStore(`store${nameOfTheStore}`, () => {

    // State
    const result = ref({
        status: null, message: null, errors: []
    });


    // Actions
    /**
     * Reset the state result of Default
     *
     * @returns {Promise<void>}
     */
    const resetResult = async () => {
        result.value = {
            status: null, message: null, errors: []
        }
    }

    /**
     * Action, Create, Update and Delete the Entry
     *
     * @param entity
     * @param param
     * @param actionType
     * @returns {Promise<void>}
     */
    const itemAction = async (entity, param, actionType) => {
        // Löschen der alten Results
        await resetResult();

        let type = '';
        let url = "";
        let store = "";

        switch (await entity) {
            case 'GroundSetting':
                if (actionType === 'edit' || actionType === 'delete') {
                    url = apiUrl.general[actionType].slice(0, -4) + `/${param.id}`;
                } else {
                    url = apiUrl.general[actionType]
                }
                store = useGroundSettingStore();
                break;
            case 'IncomingAlert':
                if (actionType === 'edit' || actionType === 'delete') {
                    url = apiUrl.incomingAlert[actionType].slice(0, -4) + `/${param.id}`;
                } else {
                    url = apiUrl.incomingAlert[actionType]
                }
                store = useIncomingAlertStore();
                break;
            case 'Message':
                if (actionType === 'edit' || actionType === 'delete') {
                    url = apiUrl.message[actionType].slice(0, -4) + `/${param.id}`;
                } else {
                    url = apiUrl.message[actionType]
                }
                store = useMessageStore();
                break;
            case 'SiteStyle':
                if (actionType === 'edit' || actionType === 'delete') {
                    url = apiUrl.siteStyle[actionType].slice(0, -4) + `/${param.id}`;
                } else {
                    url = apiUrl.siteStyle[actionType]
                }
                store = useSiteStyleStore();
                break;

        }

        await axios.post(url, param)
            .then(async response => {
                // Rückgabewert im Store Speichern
                result.value = await response.data;
                // Abrufen der Daten aus der Datenbank
                if (store) {
                    await store.loadDataForTable(useDataTableStore().lastLazyParams);
                }
            })
            .catch(async error => {
                if (error && error.response && error.response.data)
                    // Keine Rechte
                    if (error.response.data.status && parseInt(error.response.data.status) === 403) {
                        result.value = {
                            status: 403, message: toastMessage.value.noRight.message
                        };
                    } else {
                        // Rückgabewert im Store Speichern
                        result.value = await error.response.data;
                        console.error(error);
                    }
            });
    }

    return {result, resetResult, itemAction}
});