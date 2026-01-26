
import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "axios";
import {useApiStore} from "@/stores/api";
import {generateFilter, generateOrderBy} from "@/utils";

let nameOfTheStore = `Message`;
export const useMessageStore = defineStore(`store${nameOfTheStore}`, () => {
    // State
    const dataById = ref({
        id: null,
        headline: '',
        message: '',
        comment: '',
        createdAt: '',
        updatedAt: ''
    });
    const dataByIdDefault = ref({
        id: null,
        headline: '',
        message: '',
        comment: '',
        createdAt: '',
        updatedAt: ''
    });
    const dataForTable = ref([]);
    const dataTotalCount = ref(0);
    const dataFilterCount = ref(0);
    const isLoading = ref(false);
    // Getters

    // Actions
    /**
     * Load all Entries from the Database (api)
     * @param lazyParams
     * @returns {Promise<void>}
     */
    const loadDataForTable = async (lazyParams = null) => {
        await setIsLoading(true);
        let para = {};
        let url = `${useApiStore().messages}`;

        if (lazyParams) {
            // Zusammensetzen des Objektes
            para = {
                limit: lazyParams.rows,
                offset: lazyParams.first,
                order: generateOrderBy(lazyParams.multiSortMeta),
                filter: generateFilter(lazyParams.filters)
            };
            // Umwandlung der Parameter, wegen Sonderzeichen
            let parameters = JSON.stringify(para);

            url += `?${encodeURIComponent(parameters)}`;
        }

        axios.get(url)
            .then(async (response) => {
                if (response && response.data && response.data.items) {
                    dataForTable.value = await response.data.items;
                }
                if (response && response.data && response.data.totalRecords) {
                    dataTotalCount.value = await response.data.totalRecords;
                }
                if (response && response.data && response.data.filterCount) {
                    dataFilterCount.value = await response.data.filterCount;
                }
                await setIsLoading(false);

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(async () => {
                await setIsLoading(false);
            });
    };

    /**
     * Load one Entry with the ID from the Database (api)
     * @param id The ID from the Entry
     * @returns {Promise<void>}
     */
    const loadDataById = async (id) => {
        await resetDefaultDataById();
        await setIsLoading(true);
        if (id) {
            axios.get(`${useApiStore().message.getById.slice(0, -4)}/${id}`)
                .then(async function (response) {
                    if (response && response.data && response.data.item) {
                        dataById.value = response.data.item;
                    }
                    await setIsLoading(false);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(async () => {
                    await setIsLoading(false);
                });
        }
    };

    /**
     * Set the Loading State from the Data
     * @param state
     * @returns {Promise<void>}
     */
    const setIsLoading = async (state) => {
        if (typeof state !== 'undefined' || state !== null) {
            isLoading.value = state;
        }
    };

    /**
     * Set the Item of the Default Values
     * @returns {Promise<void>}
     */
    const resetDefaultDataById = async () => {
        dataById.value = Object.assign({}, dataByIdDefault.value);
    };

    return {
        // States
        dataById, dataForTable, dataTotalCount, dataFilterCount, isLoading,
        // Actions
        loadDataForTable, loadDataById, resetDefaultDataById
    }
})