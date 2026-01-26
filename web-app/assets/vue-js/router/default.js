// Hauptmenü
const mainMenuRoutes = {
    default: '/',
    displayRaspberryPi: '/display-raspberry-pi',
    managementArea: '/management-area'
};
const mainMenuNames = {
    default: 'default',
    displayRaspberryPi: 'displayRaspberryPi',
    managementArea: 'managementArea'
};
// Verwaltung
const managementAreaRoutes = {
    // Grundeinstellungen
    groundSettings: `${mainMenuRoutes.managementArea}/ground-settings`,
    groundSettingNew: `${mainMenuRoutes.managementArea}/ground-setting/new`,
    groundSettingEdit: `${mainMenuRoutes.managementArea}/ground-setting/edit`,
    groundSettingDelete: `${mainMenuRoutes.managementArea}/ground-setting/delete`,
    // Eingegangen Alarmierungen
    incomingAlerts: `${mainMenuRoutes.managementArea}/incoming-alerts`,
    incomingAlertNew: `${mainMenuRoutes.managementArea}/incoming-alert/new`,
    incomingAlertEdit: `${mainMenuRoutes.managementArea}/incoming-alert/edit`,
    incomingAlertDelete: `${mainMenuRoutes.managementArea}/incoming-alert/delete`,
    // Mitteilungen
    messages: `${mainMenuRoutes.managementArea}/messages`,
    messageNew: `${mainMenuRoutes.managementArea}/message/new`,
    messageEdit: `${mainMenuRoutes.managementArea}/message/edit`,
    messageDelete: `${mainMenuRoutes.managementArea}/message/delete`,
    // Seiten Aussehen
    siteStyles: `${mainMenuRoutes.managementArea}/site-styles`,
    siteStyleNew: `${mainMenuRoutes.managementArea}/site-style/new`,
    siteStyleEdit: `${mainMenuRoutes.managementArea}/site-style/edit`,
    siteStyleDelete: `${mainMenuRoutes.managementArea}/site-style/delete`
};
const managementAreaNames = {
    // Grundeinstellungen
    groundSettings: `${mainMenuNames.managementArea}-ground-settings`,
    groundSettingNew: `${mainMenuNames.managementArea}-ground-setting-new`,
    groundSettingEdit: `${mainMenuNames.managementArea}-ground-setting-edit`,
    groundSettingDelete: `${mainMenuNames.managementArea}-ground-setting-delete`,
    // Eingegangen Alarmierungen
    incomingAlerts: `${mainMenuNames.managementArea}-incoming-alerts`,
    incomingAlertNew: `${mainMenuNames.managementArea}-incoming-alert-new`,
    incomingAlertEdit: `${mainMenuNames.managementArea}-incoming-alert-edit`,
    incomingAlertDelete: `${mainMenuNames.managementArea}-incoming-alert-delete`,
    // Mitteilungen
    messages: `${mainMenuNames.managementArea}-messages`,
    messageNew: `${mainMenuNames.managementArea}-message-new`,
    messageEdit: `${mainMenuNames.managementArea}-message-edit`,
    messageDelete: `${mainMenuNames.managementArea}-message-delete`,
    // Seiten Aussehen
    siteStyles: `${mainMenuNames.managementArea}-site-styles`,
    siteStyleNew: `${mainMenuNames.managementArea}-site-style-new`,
    siteStyleEdit: `${mainMenuNames.managementArea}-site-style-edit`,
    siteStyleDelete: `${mainMenuNames.managementArea}-site-style-delete`
};

export {
    mainMenuRoutes,
    mainMenuNames,
    managementAreaRoutes,
    managementAreaNames
};