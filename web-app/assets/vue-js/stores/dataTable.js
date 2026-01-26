import {defineStore} from "pinia";
import {ref} from "vue";

let storeName = `storeDataTable`;
export const useDataTableStore = defineStore(storeName, () => {
    // State
    const lastLazyParams = ref({
        first: 0,
        rows: 25,
        sortField: null,
        sortOrder: null,
        filters: [],
        multiSortMeta: [],
    });
    // Getters
    // Actions
    return {lastLazyParams}
})