import {defineStore} from "pinia";
import {ref} from "vue";

let nameOfTheStore = `Api`;
export const useApiStore = defineStore(`store${nameOfTheStore}`, () => {
    // State
    // Grundeinstellung
    const generals = ref(__API__.generals);
    const general = ref(__API__.general);
    // Eingegangene Alarmierungen
    const incomingAlerts = ref(__API__.incomingAlerts);
    const incomingAlert = ref(__API__.incomingAlert);
    // Nachrichten
    const messages = ref(__API__.messages);
    const message = ref(__API__.message);
    // Site Style
    const siteStyles = ref(__API__.siteStyles);
    const siteStyle = ref(__API__.siteStyle);

    return {
        generals,
        general,
        incomingAlerts,
        incomingAlert,
        messages,
        message,
        siteStyles,
        siteStyle
    }
});
