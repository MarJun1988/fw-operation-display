import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "axios";
import {useApiStore} from "@/stores/api";
import {generateFilter, generateOrderBy} from "@/utils";

let nameOfTheStore = `IncomingAlert`;
export const useIncomingAlertStore = defineStore(`store${nameOfTheStore}`, () => {
    // State
    const dataById = ref({
        id: null, address: '', text: '', comment: '', createdAt: '', updatedAt: ''
    });
    const dataByIdDefault = ref({
        id: null, address: '', text: '', comment: '', createdAt: '', updatedAt: ''
    });
    const dataForTable = ref([]);
    const dataTotalCount = ref(0);
    const dataFilterCount = ref(0);
    const isLoading = ref(false);
    const lastAlert = ref({
        id: '', message: '', placeComplete: '', subPlaceComplete: ''
    });
    const splitLastAlert = ref({
        'id': '', 'numberControlCenter': '', 'keywordShort': '', 'keywordLong': '', 'location': '', 'otherAddressInformation': '', 'personPatient': '', 'text': '', 'messageComplete': '',
    });
    const splitLastAlertDefault = {
        'id': '', 'numberControlCenter': '', 'keywordShort': '', 'keywordLong': '', 'location': '', 'otherAddressInformation': '', 'personPatient': '', 'text': '', 'messageComplete': '',
    };

    // Getters

    // Actions
    /**
     * Load all Entries from the Database (api)
     * @param lazyParams
     * @returns {Promise<void>}
     */
    const loadDataForTable = async(lazyParams = null) => {
        await setIsLoading(true);
        let para = {};
        let url = `${useApiStore().incomingAlerts}`;

        if (lazyParams) {
            // Zusammensetzen des Objektes
            para = {
                limit: lazyParams.rows, offset: lazyParams.first, order: generateOrderBy(lazyParams.multiSortMeta), filter: generateFilter(lazyParams.filters)
            };
            // Umwandlung der Parameter, wegen Sonderzeichen
            let parameters = JSON.stringify(para);

            url += `?${encodeURIComponent(parameters)}`;
        }

        axios.get(url)
            .then(async(response) => {
                if (response && response.data && response.data.items) {
                    dataForTable.value = await response.data.items;
                    await setLastAlert(response.data.items[0]);
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
            .finally(async() => {
                await setIsLoading(false);
            });
    };

    /**
     * Load one Entry with the ID from the Database (api)
     * @param id The ID from the Entry
     * @returns {Promise<void>}
     */
    const loadDataById = async(id) => {
        await resetDefaultDataById();
        await setIsLoading(true);
        if (id) {
            axios.get(`${useApiStore().incomingAlert.getById.slice(0, -4)}/${id}`)
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
                .finally(async() => {
                    await setIsLoading(false);
                });
        }
    };

    /**
     * Set the Loading State from the Data
     * @param state
     * @returns {Promise<void>}
     */
    const setIsLoading = async(state) => {
        if (typeof state !== 'undefined' || state !== null) {
            isLoading.value = state;
        }
    };

    /**
     * Set the Item of the Default Values
     * @returns {Promise<void>}
     */
    const resetDefaultDataById = async() => {
        dataById.value = Object.assign({}, dataByIdDefault.value);
    };

    /**
     * Set the Last Alert for the Display
     *
     * @param item
     * @returns {Promise<void>}
     */
    const setLastAlert = async(item) => {
        // Zurücksetzen der letzten Werte
        splitLastAlert.value = Object.assign({}, splitLastAlertDefault);
        if (item) {
            splitLastAlert.value.id = item.id;
            splitLastAlert.value.messageComplete = item.text;

            let defaultCharacters = "\\w\\s\\dÄäÖöÜüß!?#.,;:\\-/\\\\()_<>=+ ";

            // Regex ab 2024.04-30
            let patternAfter = new RegExp(`^(#\\d*)([${defaultCharacters}]*)\\/([${defaultCharacters}]*)([-])([${defaultCharacters}]*)\\/([${defaultCharacters}]*)\\/([${defaultCharacters}]*)\\/([${defaultCharacters}]*)\\/([\\d. :]*)`);

            // Regex vor dem 2024-04-30
            let patternBefore = new RegExp(`^(#\\d*)([${defaultCharacters}]*)\\/([${defaultCharacters}]*)\\/([${defaultCharacters}]*)\\/([${defaultCharacters}]*)([-])([${defaultCharacters}]*)\\/([${defaultCharacters}]*)\\/([\\d. :]*)`);

            // Sonstige
            let pattern = new RegExp(`^(#\\d*)([${defaultCharacters}]*)\\/([${defaultCharacters}]*)\\/([${defaultCharacters}]*)\\/([${defaultCharacters}]*)\\/([-])([${defaultCharacters}]*)\\/([${defaultCharacters}]*)\\/([\\d. :]*)`);

            let match = [];

            // Wörter die im String vorhanden sein soll
            const searchWords = ['Niederwiesa', 'Lichtenwalde', 'Braunsdorf', 'Flöha', 'Euba', 'Freiberg']
            let wordCheckIsGood = false;
            let location = '';

            if (match = splitLastAlert.value.messageComplete.match(patternAfter)) {
                // Wenn ein Match gefunden wird, durchlaufen Sie alle Matches und entfernen Sie unerwünschte Leerzeichen
                match = match.map(m => m.trim());

                // Prüfen ob eines der Wörter vorhanden sind
                searchWords.forEach(word => {
                    if (new RegExp(`\\b${word}\\b`, 'g').test(match[5])) {
                        location = `${match[5]}`
                        wordCheckIsGood = true;
                    } else if (!wordCheckIsGood) {
                        location = `${match[3]} ${match[5]}`
                    }
                });

                splitLastAlert.value = {
                    'id': item.id,
                    'numberControlCenter': match[1],
                    'keywordShort': match[2],
                    'keywordLong': match[8],
                    'location': location,
                    'otherAddressInformation': match[6],
                    'personPatient': '',
                    'text': match[7],
                    'messageComplete': item.text,
                };
            } else if (match = splitLastAlert.value.messageComplete.match(patternBefore)) {
                // Wenn ein Match gefunden wird, durchlaufen Sie alle Matches$patternBefore und entfernen Sie unerwünschte Leerzeichen
                match = match.map(m => m.trim());

                // Prüfen ob eines der Wörter vorhanden sind
                searchWords.forEach(word => {
                    if (new RegExp(`\\b${word}\\b`, 'g').test(match[5])) {
                        location = `${match[5]}`
                        wordCheckIsGood = true;
                    } else if (!wordCheckIsGood) {
                        location = `${match[3]} ${match[5]}`
                    }
                });

                splitLastAlert.value = {
                    'id': item.id,
                    'numberControlCenter': match[1],
                    'keywordShort': match[2],
                    'keywordLong': match[3],
                    'location': match[6],
                    'otherAddressInformation': location,
                    'personPatient': '',
                    'text': match[8],
                    'messageComplete': item.text,
                };
            } else {
                // // Check if directory exists, if not, create it.
                // if (!fs.existsSync('Prod-Fehler')) {
                //     fs.mkdirSync('Prod-Fehler');
                // }
                //
                // // Append to file
                // fs.appendFileSync('Prod-Fehler/IncomingAlert.txt', "Es wurde kein passendes RegEx gefunden: " + alertMessage + "\n");
            }


            // let textSplit = item.text.split('/')
            //
            // if (textSplit.length > 1) {
            //     let placeComplete = textSplit[2];
            //     let split = placeComplete.split('-');
            //     if (split.length > 0) {
            //         lastAlert.value.placeComplete = `${split[1]}`;
            //         lastAlert.value.subPlaceComplete = '';
            //         if (textSplit[3]) {
            //             lastAlert.value.subPlaceComplete = `${textSplit[3]}`;
            //         }
            //     }
            // } else {
            //     lastAlert.value.placeComplete = '';
            //     lastAlert.value.subPlaceComplete = '';
            // }
        }
    };

    return {
        // States
        dataById, dataForTable, dataTotalCount, dataFilterCount, isLoading, lastAlert, splitLastAlert, // Actions
        loadDataForTable, loadDataById, resetDefaultDataById
    }
})