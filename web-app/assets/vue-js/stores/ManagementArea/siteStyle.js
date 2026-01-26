
import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "axios";
import {useApiStore} from "@/stores/api";
import {generateFilter, generateOrderBy} from "@/utils";

let nameOfTheStore = `SiteStyle`;
export const useSiteStyleStore = defineStore(`store${nameOfTheStore}`, () => {
    // State
    const dataById = ref({
        id: null,
        sorting: '',
        name: '',
        description: '',
        style: '',
        comment: '',
        createdAt: '',
        updatedAt: ''
    });
    const dataByIdDefault = ref({
        id: null,
        sorting: '',
        name: '',
        description: '',
        style: '',
        comment: '',
        createdAt: '',
        updatedAt: ''
    });
    const dataForTable = ref([]);
    const dataTotalCount = ref(0);
    const dataFilterCount = ref(0);
    const isLoading = ref(false);

    const displayViewAlertMonitor = ref({
        come: "",
        doNotCome: "",
        comeTenMinutesLater: "",
        sectionOne: "",
        sectionTwo: "",
        sectionThree: "",
        headlineAlertMessage: "",
        textAlertMessage: "",
        headlinePlaceOfUse: "",
        textPlaceOfUse: "",
        headlineMessage: "",
        textMessageHeadline: "",
        textMessageMessage: "",
        time: "",
        date: ""
    });
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
        let url = `${useApiStore().siteStyles}`;

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
                    await setData(response.data.items);
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
            axios.get(`${useApiStore().siteStyle.getById.slice(0, -4)}/${id}`)
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

    /**
     * Set the Items for the Display View
     *
     * @param items
     * @returns {Promise<void>}
     */
    const setData = async (items) => {
        if (items) {
            items.forEach(item => {
                if (item.name) {
                    switch (item.name) {
                        case 'display-view-alert-monitor-come':
                            displayViewAlertMonitor.value.come = item.style;
                            break;
                        case 'display-view-alert-monitor-do-not-come':
                            displayViewAlertMonitor.value.doNotCome = item.style;
                            break;
                        case 'display-view-alert-monitor-come-ten-minutes-later':
                            displayViewAlertMonitor.value.comeTenMinutesLater = item.style;
                            break;
                        case 'display-view-alert-monitor-section-one':
                            displayViewAlertMonitor.value.sectionOne = item.style;
                            break;
                        case 'display-view-alert-monitor-section-two':
                            displayViewAlertMonitor.value.sectionTwo = item.style;
                            break;
                        case 'display-view-alert-monitor-section-three':
                            displayViewAlertMonitor.value.sectionThree = item.style;
                            break;
                        case 'display-view-alert-monitor-headline-alert-message':
                            displayViewAlertMonitor.value.headlineAlertMessage = item.style;
                            break;
                        case 'display-view-alert-monitor-text-alert-message':
                            displayViewAlertMonitor.value.textAlertMessage = item.style;
                            break;
                        case 'display-view-alert-monitor-headline-place-of-use':
                            displayViewAlertMonitor.value.headlinePlaceOfUse = item.style;
                            break;
                        case 'display-view-alert-monitor-text-place-of-use':
                            displayViewAlertMonitor.value.textPlaceOfUse = item.style;
                            break;
                        case 'display-view-alert-monitor-headline-message':
                            displayViewAlertMonitor.value.headlineMessage = item.style;
                            break;
                        case 'display-view-alert-monitor-text-message-headline':
                            displayViewAlertMonitor.value.textMessageHeadline = item.style;
                            break;
                        case 'display-view-alert-monitor-text-message-message':
                            displayViewAlertMonitor.value.textMessageMessage = item.style;
                            break;
                        case 'display-view-alert-monitor-time':
                            displayViewAlertMonitor.value.time = item.style;
                            break;
                        case 'display-view-alert-monitor-date':
                            displayViewAlertMonitor.value.date = item.style;
                            break;
                    }
                }
            })
        }
    };

    return {
        // States
        dataById, dataForTable, dataTotalCount, dataFilterCount, displayViewAlertMonitor, isLoading,
        // Actions
        loadDataForTable, loadDataById, resetDefaultDataById
    }
})