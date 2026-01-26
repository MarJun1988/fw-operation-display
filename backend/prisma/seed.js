import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const allowUpdate = process.env.ALLOW_SEED_UPDATE === 'true'

const DEFAULT_GENERALS = [
    {
        name: 'site_title',
        value: 'Fw - Einsatzmonitor',
        comment: 'Titel der Webseite, welcher in der Browserzeile steht',
    },
    {
        name: 'url_from_divera_24_7',
        value: 'https://www.divera247.com/',
        comment: 'Url von dem Einsatzmonitor',
    },
    // 1ter Abschnitt
    {
        name: 'section_1_column_1_text',
        value: 'komme',
        comment: '1ter Abschnitt, 1 Spalte von Links Überschrift "komme"',
    },
    {
        name: 'section_1_column_2_text',
        value: 'komme nicht',
        comment: '1ter Abschnitt, 2 Spalte von Links Überschrift "komme nicht"',
    },
    {
        name: 'section_1_column_3_text',
        value: 'komme > 10min',
        comment: '1ter Abschnitt, 3 Spalte von Links Überschrift "komme > 10min"',
    },
    // 2ter Abschnitt
    {
        name: 'section_2_alert_message_headline',
        value: 'Einsatzmeldung',
        comment: '2ter Abschnitt, Überschrift "Einsatzmeldung"',
    },
    {
        name: 'section_2_alert_address_headline',
        value: 'Einsatzort',
        comment: '2ter Abschnitt, Überschrift "Einsatzort"',
    },
    // 3ter Abschnitt
    {
        name: 'section_4_message_headline',
        value: 'Mitteilungen und Wichtige Informationen',
        comment:
            '4ter Abschnitt, Überschrift "Mitteilungen und Wichtige Informationen"',
    },
    // Sichtbarkeit aller Sektionen
    {
        name: 'show_section_1',
        value: 'true',
        comment: '1ter Abschnitt, Sichtbarkeit Divera Anzeige (true/false)',
    },
    {
        name: 'show_section_2',
        value: 'true',
        comment: '2ter Abschnitt, Sichtbarkeit Alarmierungsdetails (true/false)',
    },
    {
        name: 'show_section_3',
        value: 'true',
        comment: '3ter Abschnitt, Sichtbarkeit der Karte (true/false)',
    },
    {
        name: 'show_section_4',
        value: 'true',
        comment: '4ter Abschnitt, Sichtbarkeit Meldungen (true/false)',
    },
    {
        name: 'show_section_5',
        value: 'true',
        comment: '5ter Abschnitt, Sichtbarkeit Datum/Uhrzeit (true/false)',
    },
    {
        name: 'show_section_5_Date',
        value: 'true',
        comment: '5ter Abschnitt, Sichtbarkeit des Datum (true/false)',
    },
    {
        name: 'show_section_5_Time',
        value: 'true',
        comment: '5ter Abschnitt, Sichtbarkeit der Uhrzeit (true/false)',
    },

    // Formatierungen
    {
        name: 'format_date',
        value: JSON.stringify({
            weekday: 'long',
            day: '2-digit',
            month: 'long',
        }),
        comment: 'Formatierung des Datums',
    },
    {
        name: 'format_time',
        value: JSON.stringify({
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Europe/Berlin',
        }),
        comment: 'Formatierung der Uhrzeit',
    },

    // Adresse des Gerätehauses
    {
        name: 'fire_department_address',
        value: 'Dresdner Str. 22, 09577 Niederwiesa',
        comment: 'Gerätehaus lat Koordinaten',
    },
    {
        name: 'default_map_zoom',
        value: '16',
        comment: 'Zoom der Karte',
    },
]

const defaultImagesFolder = '/images'

/**
 * Gemeinsame Fallback-Werte für "General".
 * Wird sowohl im Backend-Seeder als auch im Frontend verwendet.
 */
const DEFAULT_MESSAGE_ICONS = [
    {
        name: '101-11-Fußgaengerueberweg_rechts',
        path: `${defaultImagesFolder}/101-11-Fußgaengerueberweg_rechts.svg`,
    },
    {
        name: '101-12-Viehtrieb_rechts',
        path: `${defaultImagesFolder}/101-12-Viehtrieb_rechts.svg`,
    },
    {
        name: '101-15-Steinschlag_rechts',
        path: `${defaultImagesFolder}/101-15-Steinschlag_rechts.svg`,
    },
    {
        name: '101-21-Fußgaengerueberweg_links',
        path: `${defaultImagesFolder}/101-21-Fußgaengerueberweg_links.svg`,
    },
    {
        name: '101-22-Viehtrieb_links',
        path: `${defaultImagesFolder}/101-22-Viehtrieb_links.svg`,
    },
    {
        name: '101-25-Steinschlag_links',
        path: `${defaultImagesFolder}/101-25-Steinschlag_links.svg`,
    },
    {
        name: '101-51-Schnee_oder_Eisglaette',
        path: `${defaultImagesFolder}/101-51-Schnee_oder_Eisglaette.svg`,
    },
    {
        name: '101-52-Splitt_oder_Schotter',
        path: `${defaultImagesFolder}/101-52-Splitt_oder_Schotter.svg`,
    },
    {
        name: '101-53-Ufer',
        path: `${defaultImagesFolder}/101-53-Ufer.svg`,
    },
    {
        name: '101-54-Unzureichendes_Lichtraumprofil',
        path: `${defaultImagesFolder}/101-54-Unzureichendes_Lichtraumprofil.svg`,
    },
    {
        name: '101-Gefahrstelle',
        path: `${defaultImagesFolder}/101-Gefahrstelle.svg`,
    },
    {
        name: '102-Kreuzung_oder_Einmuendung',
        path: `${defaultImagesFolder}/102-Kreuzung_oder_Einmuendung.svg`,
    },
    {
        name: '103-10-Kurve_links',
        path: `${defaultImagesFolder}/103-10-Kurve_links.svg`,
    },
    {
        name: '103-20-Kurve_rechts',
        path: `${defaultImagesFolder}/103-20-Kurve_rechts.svg`,
    },
    {
        name: '105-10-Doppelkurve_zunaechst_links.svg',
        path: `${defaultImagesFolder}/105-10-Doppelkurve_zunaechst_links.svg`,
    },
    {
        name: '105-20-Doppelkurve_zunaechst_rechts',
        path: `${defaultImagesFolder}/105-20-Doppelkurve_zunaechst_rechts.svg`,
    },
    {
        name: '112-Unebene_Fahrbahn',
        path: `${defaultImagesFolder}/112-Unebene_Fahrbahn.svg`,
    },
    {
        name: '114 -Schleuder_oder_Rutschgefahr',
        path: `${defaultImagesFolder}/114 -Schleuder_oder_Rutschgefahr.svg`,
    },
    {
        name: '120-Verengte_Fahrbahn',
        path: `${defaultImagesFolder}/120-Verengte_Fahrbahn.svg`,
    },
    {
        name: '123-Arbeitsstelle',
        path: `${defaultImagesFolder}/123-Arbeitsstelle.svg`,
    },
    {
        name: '124-Stau',
        path: `${defaultImagesFolder}/124-Stau.svg`,
    },
    {
        name: '125-Gegenverkehr',
        path: `${defaultImagesFolder}/125-Gegenverkehr.svg`,
    },
    {
        name: '131-Lichtzeichenanlage',
        path: `${defaultImagesFolder}/131-Lichtzeichenanlage.svg`,
    },
    {
        name: '136-10-Kinder_Aufstellung_rechts',
        path: `${defaultImagesFolder}/136-10-Kinder_Aufstellung_rechts.svg`,
    },
    {
        name: '136-20-Kinder_Aufstellung_links',
        path: `${defaultImagesFolder}/136-20-Kinder_Aufstellung_links.svg`,
    },
    {
        name: '142-20-Wildwechsel_Aufstellung_links',
        path: `${defaultImagesFolder}/142-20-Wildwechsel_Aufstellung_links.svg`,
    },
    {
        name: '151-Bahnuebergang',
        path: `${defaultImagesFolder}/151-Bahnuebergang.svg`,
    },
    {
        name: '205-Vorfahrt_gewaehren',
        path: `${defaultImagesFolder}/205-Vorfahrt_gewaehren.svg`,
    },
    {
        name: '206-Halt_Vorfahrt_gewaehren',
        path: `${defaultImagesFolder}/206-Halt_Vorfahrt_gewaehren.svg`,
    },
    {
        name: '208-Vorrang_des_Gegenverkehrs',
        path: `${defaultImagesFolder}/208-Vorrang_des_Gegenverkehrs.svg`,
    },
    {
        name: '220-10-Einbahnstraße_linksweisend',
        path: `${defaultImagesFolder}/220-10-Einbahnstraße_linksweisend.svg`,
    },
    {
        name: '220-20-Einbahnstraße_rechtsweisend',
        path: `${defaultImagesFolder}/220-20-Einbahnstraße_rechtsweisend.svg`,
    },
    {
        name: '250-Verbot_fuer_Fahrzeuge_aller_Art',
        path: `${defaultImagesFolder}/250-Verbot_fuer_Fahrzeuge_aller_Art.svg`,
    },
    {
        name: '251-Verbot_fuer_Kraftwagen',
        path: `${defaultImagesFolder}/251-Verbot_fuer_Kraftwagen.svg`,
    },
    {
        name: '264-2-Tatsaechliche_Breite_2m',
        path: `${defaultImagesFolder}/264-2-Tatsaechliche_Breite_2m.svg`,
    },
    {
        name: '264-2_3-Tatsaechliche_Breite_2,3m',
        path: `${defaultImagesFolder}/264-2_3-Tatsaechliche_Breite_2_3m.svg"`,
    },
    {
        name: '265-3_8-Tatsaechliche_Hoehe',
        path: `${defaultImagesFolder}/265-3_8-Tatsaechliche_Hoehe.svg`,
    },
    {
        name: '267-Verbot_der_Einfahrt',
        path: `${defaultImagesFolder}/267-Verbot_der_Einfahrt.svg`,
    },
    {
        name: '268-Schneeketten_vorgeschrieben',
        path: `${defaultImagesFolder}/268-Schneeketten_vorgeschrieben.svg`,
    },
    {
        name: '272_Verbot_des_Wendens',
        path: `${defaultImagesFolder}/272_Verbot_des_Wendens.svg`,
    },
    {
        name: '274-5-Zulaessige_Hoechstgeschwindigkeit_5kmh',
        path: `${defaultImagesFolder}/274-5-Zulaessige_Hoechstgeschwindigkeit_5kmh.svg`,
    },
    {
        name: '274-10-Zulaessige_Hoechstgeschwindigkeit_10kmh',
        path: `${defaultImagesFolder}/274-10-Zulaessige_Hoechstgeschwindigkeit_10kmh.svg`,
    },
    {
        name: '274-20-Zulaessige_Hoechstgeschwindigkeit_20kmh',
        path: `${defaultImagesFolder}/274-20-Zulaessige_Hoechstgeschwindigkeit_20kmh.svg`,
    },
    {
        name: '274-30-Zulaessige_Hoechstgeschwindigkeit_30kmh',
        path: `${defaultImagesFolder}/274-30-Zulaessige_Hoechstgeschwindigkeit_30kmh.svg`,
    },
    {
        name: '274-50-Zulaessige_Hoechstgeschwindigkeit_50kmh',
        path: `${defaultImagesFolder}/274-50-Zulaessige_Hoechstgeschwindigkeit_50kmh.svg`,
    },
    {
        name: '357-Sackgasse',
        path: `${defaultImagesFolder}/357-Sackgasse.svg`,
    },
    {
        name: '42-10-Wildwechsel_Aufstellung_rechts',
        path: `${defaultImagesFolder}/42-10-Wildwechsel_Aufstellung_rechts.svg`,
    },
]

const DEFAULT_SITE_STYLES = [
    {
        name: 'base_layout',
        description: 'Grundlayout des Dashboards',
        htmlClass: 'min-h-screen min-w-screen bg-white dark:bg-black',
        htmlStyle: '',
    },
    {
        name: 'main_grid',
        description: 'Main Grid (z.b. 3Zeilen)',
        htmlClass: 'grid h-screen w-screen grid-cols-1 md:grid-cols-6 bg-black',
        htmlStyle: 'grid-template-rows: 40px 370px 1fr;',
    },
    {
        name: 'main_content',
        description: 'Main Content (z.b. links: Karte | rechts: Inhalt)',
        htmlClass: 'col-span-1 md:col-span-6 grid grid-cols-1 md:grid-cols-6 h-full bg-black',
        htmlStyle: '',
    },
    {
        name: 'info_column',
        description: 'Informations Bereich (z.b. Einsatztet | Einsatzort | Mitteilungen)',
        htmlClass: 'md:col-span-4 grid grid-rows-[auto_auto_auto_auto_1fr] overflow-y-auto bg-black',
        htmlStyle: '',
    },
    // 1ter Abschnitt
    {
        name: 'section_1_column_1',
        description: '1ter Abschnitt, 1 Spalte von Links "komme"',
        htmlClass:
            'flex items-center justify-center md:col-span-2 text-4xl font-bold',
        htmlStyle: '',
    },
    {
        name: 'section_1_column_2',
        description: '1ter Abschnitt, 2 Spalte von Links "komme nicht"',
        htmlClass:
            'flex items-center justify-center md:col-span-2 text-4xl font-bold',
        htmlStyle: '',
    },
    {
        name: 'section_1_column_3',
        description: '1ter Abschnitt, 1 Spalte von Links "komme > 10min"',
        htmlClass:
            'flex items-center justify-center md:col-span-2 text-4xl font-bold',
        htmlStyle: '',
    },
    {
        name: 'section_1_iframe_divera',
        description: '1ter Abschnitt, iFrame von Divera',
        htmlClass: 'flex items-center justify-center col-span-1 md:col-span-6 m-0',
        htmlStyle: '',
    },
    {
        name: 'section_2_alert_message_headline',
        description: '2ter Abschnitt, Überschrift der "Einsatzmeldung"',
        htmlClass: 'flex items-center justify-center gap-4 p-4 text-3xl text-red-500 border-t-1 border-white font-bold',
        htmlStyle: '',
    },
    {
        name: 'section_2_alert_message_icon',
        description: '2ter Abschnitt, Icon der "Einsatzmeldung"',
        htmlClass: 'pi pi-map text-white self-center',
        htmlStyle: 'font-size: inherit;',
    },
    {
        name: 'section_2_alert_message_text',
        description: '2ter Abschnitt, Alarmtext der "Einsatzmeldung"',
        htmlClass: '. flex items-center justify-center gap-4 text-1xl md:text-3xl text-center border-b-1 border-white',
        htmlStyle: '',
    },
    {
        name: 'section_2_alert_address_headline',
        description: '2ter Abschnitt, Überschrift vom "Einsatzort"',
        htmlClass:
            'flex items-center justify-center gap-4  p-4 text-3xl text-red-500 font-bold',
        htmlStyle: '',
    },
    {
        name: 'section_2_alert_address_icon',
        description: '2ter Abschnitt, Icon vom "Einsatzort"',
        htmlClass: 'pi pi-envelope text-white self-center',
        htmlStyle: 'font-size: inherit;',
    },
    {
        name: 'section_2_alert_address_text',
        description: '2ter Abschnitt, teil des Alarmtext vom "Einsatzort"',
        htmlClass: 'flex items-center justify-center gap-4 text-1xl md:text-3xl text-center border-b-1 border-white',
        htmlStyle: '',
    },
    // 3ter Abschnitt
    {
        name: 'section_3',
        description: '3ter Abschnitt von oben, wo die "Karte" drin steht',
        htmlClass: 'md:col-span-2 h-full flex items-center justify-center',
        htmlStyle: '',
    },
    // 4ter Abschnitt
    {
        name: 'section_4',
        description:
            '4ter Abschnitt von oben, wo die "Mitteilungen und Wichtige Informationen" drin steht',
        htmlClass: 'flex justify-center flex-col gap-4 justify-end mb-4',
        htmlStyle: '',
    },
    {
        name: 'section_4_message_headline',
        description:
            '4ter Abschnitt, Überschrift der "Mitteilungen und Wichtige Informationen"',
        htmlClass: 'text-2xl text-red-500 font-bold flex justify-center p-4 gap-4',
        htmlStyle: '',
    },
    {
        name: 'section_4_message_icon',
        description:
            '4ter Abschnitt, Icon der "Mitteilungen und Wichtige Informationen"',
        htmlClass: 'pi pi-info-circle text-white self-center',
        htmlStyle: 'font-size: inherit;',
    },
    {
        name: 'section_4_message_list_ul',
        description: '4ter Abschnitt, das <ul> Element',
        htmlClass: 'list-none flex justify-center',
        htmlStyle: '',
    },
    {
        name: 'section_4_message_list_li',
        description: '4ter Abschnitt, das <li> Element',
        htmlClass: 'grid grid-cols-[auto_1fr_auto] grid-rows-2 gap-x-3 gap-y-1 items-center',
        htmlStyle: '',
    },
    {
        name: 'section_4_message_list_li_div',
        description:
            '4ter Abschnitt, <div> des Bildes der "Mitteilungen" im <li> Element',
        htmlClass: 'grid grid-rows-3 grid-cols-3',
        htmlStyle: '',
    },
    {
        name: 'section_4_message_list_image',
        description: '4ter Abschnitt, Bildes der "Mitteilungen" im <li> Element',
        htmlClass: 'h-15 row-span-2 self-center',
        htmlStyle: '',
    },
    {
        name: 'section_4_message_list_headline',
        description:
            '4ter Abschnitt, Überschrift der "Mitteilungen" im <li> Element',
        htmlClass: 'col-start-2 row-start-1 text-2xl',
        htmlStyle: '',
    },
    {
        name: 'section_4_message_list_text',
        description: '4ter Abschnitt, Text der "Mitteilungen" im <li> Element',
        htmlClass: 'col-start-2 col-span-2 row-start-2 text-2xl',
        htmlStyle: '',
    },
    {
        name: 'section_4_message_list_date_time',
        description:
            '4ter Abschnitt, Text des erstellungs/bearbeitungs "Datum/Uhrzeit" im <li> Element',
        htmlClass: 'col-start-3 row-start-1 text-right self-start',
        htmlStyle: '',
    },
    // 5ter Abschnitt
    {
        name: 'section_5',
        description: '5ter Abschnitt von oben, wo die "Uhr und Datum" drin steht',
        htmlClass:
            'bottom-10 grid grid-cols-1 text-center border-1 w-80 md:fixed left-5 p-2 md:p-5 shadow-lg shadow-white/50 hover:bg-grey-50 m-5 !m-auto !mt-5 transition duration-300 ease-in-out hover:scale-85 z-2000 text-black bg-white',
        htmlStyle: '',
    },
    {
        name: 'section_5_data',
        description: '5ter Abschnitt, wo das "Datum" ist',
        htmlClass: 'text-1xl md:text-2xl',
        htmlStyle: '',
    },
    {
        name: 'section_5_time',
        description: '5ter Abschnitt, wo die "Uhrzeit" ist',
        htmlClass: 'text-1xl md:text-2xl',
        htmlStyle: '',
    },
]

const DEFAULT_VERSIONS = [
    {
        versionNumber: 'v.2.1.0',
        description: 'Mit Version 2.1 wurde das System insgesamt weiter stabilisiert und verbessert. Neben mehreren Bugfixes und Layout-Optimierungen wurde eine neue Hilfe eingeführt und vollständig ausgebaut. Zusätzlich sorgen Verbesserungen an der Versionierung, der Datenspeicherung sowie kleinere funktionale Anpassungen für einen zuverlässigeren und komfortableren Betrieb.',
        createdAt: '2025-12-22T20:00:00Z',
    },
    {
        versionNumber: 'v.2.0.8',
        description: 'Es ist so weit: Die Hilfe ist nun vollständig im neuen Gewand verfügbar.',
        createdAt: '2025-12-22T15:00:00Z',
    },
    {
        versionNumber: 'v.2.0.7',
        description: 'Einführung der Hilfe: Eine Hilfe steht nun zur Verfügung und wird bis Ende Januar 2026 weiter vervollständigt.',
        createdAt: '2025-12-21T21:30:00Z',
    },
    {
        versionNumber: 'v.2.0.6',
        description: 'Neues Feature: Tabelleneinstellungen werden im Browser-LocalStorage gespeichert.',
        createdAt: '2025-12-19T21:30:00Z',
    },
    {
        versionNumber: 'v.2.0.5',
        description: 'Ein Fehler wurde behoben, der das automatische Sichern der Datenbank verhindert hat.',
        createdAt: '2025-12-19T15:15:00Z',
    },
    {
        versionNumber: 'v.2.0.4',
        description: 'Layout-Anpassung des Dashboards: Die Karte ist nun prominenter platziert.',
        createdAt: '2025-12-19T13:00:00Z',
    },
    {
        versionNumber: 'v.2.0.3',
        description: 'Ein kleiner Bug wurde behoben: Der Seitentitel wird jetzt korrekt aus der Datenbank ausgelesen und angezeigt.',
        createdAt: '2025-12-16T15:00:00Z',
    },
    {
        versionNumber: 'v.2.0.2',
        description: 'Eine saubere Versionierung wurde eingeführt. Ansonsten sollte alles stabil über die CI/CD-Pipelines weiterlaufen.',
        createdAt: '2025-12-15T21:00:00Z',
    },
    {
        versionNumber: 'v.2.0.1',
        description: 'Ein kleiner Bug wurde behoben, bei dem die Adresse nicht immer korrekt aus dem Alarm extrahiert wurde. Dieses Problem sollte nun behoben sein.',
        createdAt: '2025-12-15T14:40:00Z',
    },
    {
        versionNumber: 'v.2.0.0',
        description: 'Alles neu macht der Dezember: Mit Version 2.0.0 wird ein komplett überarbeitetes Release eingeführt. Das Frontend basiert nun auf Vue.js, das Backend auf Node.js mit Apollo GraphQL inklusive Subscriptions. Neu hinzugekommen ist außerdem eine Kartenfunktion mit Einsatzadresse.',
        createdAt: '2025-12-07T12:00:00Z',
    },
    {
        versionNumber: 'v.1.0.1',
        description: 'Wie so oft im Feinschliff: Die Anwendung läuft nun deutlich flüssiger und die Auswertung ist präziser.',
        createdAt: '2023-10-13T12:00:00Z',
    },
    {
        versionNumber: 'v.1.0.0',
        description: 'Die erste Version der Anwendung, optimiert für einen Einplatinencomputer. Umgesetzt mit Symfony 6 im Backend und Vue.js als Frontend-Framework.',
        createdAt: '2022-10-03T12:00:00Z',
    },
];

// --- General Settings ---
const generals = Object.entries(DEFAULT_GENERALS).map(([, val], index) => ({
    name: val.name,
    value: val.value,
    sorting: index,
    comment: val.comment,
}))

// --- Site Styles ---
const siteStyles = Object.entries(DEFAULT_SITE_STYLES).map(
    ([, val], index) => ({
        name: val.name,
        description: val.description,
        sorting: index,
        htmlClass: val.htmlClass,
        htmlStyle: val.htmlStyle,
        comment: 'Standard Layout des Web Anwendung',
    }),
)

// --- Message Icons ---
const messageIcons = Object.entries(DEFAULT_MESSAGE_ICONS).map(([, val]) => ({
    name: val.name,
    path: val.path,
    comment: 'Standard Layout des Web Anwendung',
}))

// --- General Settings ---
const versions = Object.entries(DEFAULT_VERSIONS).map(([, val]) => ({
    versionNumber: val.versionNumber,
    description: val.description,
    createdAt: val.createdAt,
}))

// ----------------------------------------------------------------
// FINAL SEED FUNCTION (Prisma executes THIS ONE)
// ----------------------------------------------------------------
export default async function seed() {
    // eslint-disable-next-line no-undef
    console.log('=> Starte Datenbank-Seeding...')

    // --- Generals ---
    if (generals && generals.length > 0) {
        // eslint-disable-next-line no-undef
        console.log(`Seeding Generals (${generals.length})`)
        for (const general of generals) {
            await prisma.general.upsert({
                where: {name: general.name},
                update: allowUpdate
                    ? {
                        value: general.value,
                        comment: general.comment,
                    }
                    : {},

                // update: {}, // 🔥 WICHTIG: nichts überschreiben
                // update: {
                //     value: general.value,
                //     comment: general.comment
                // },
                create: general,
            })
        }
        // eslint-disable-next-line no-undef
        console.log(`Seeding Generals abgeschlossen`)
        // eslint-disable-next-line no-undef
        console.log(` -------- `)
    }

    // --- Site Styles ---
    if (siteStyles && siteStyles.length > 0) {
        // eslint-disable-next-line no-undef
        console.log(`Seeding Site Styles (${siteStyles.length})`)
        for (const siteStyle of siteStyles) {
            await prisma.siteStyle.upsert({
                where: {name: siteStyle.name},
                update: allowUpdate
                    ? {
                        description: siteStyle.description,
                        sorting: siteStyle.sorting,
                        htmlStyle: siteStyle.htmlStyle,
                        htmlClass: siteStyle.htmlClass,
                        comment: siteStyle.comment,
                    }
                    : {},
                // update: {
                //   description: siteStyle.description,
                //   sorting: siteStyle.sorting,
                //   htmlStyle: siteStyle.htmlStyle,
                //   htmlClass: siteStyle.htmlClass,
                //   comment: siteStyle.comment,
                // },
                // update: {}, // 🔥 WICHTIG: nichts überschreiben
                create: siteStyle,
            })
        }
        // eslint-disable-next-line no-undef
        console.log(`Seeding Site Styles abgeschlossen`)
        // eslint-disable-next-line no-undef
        console.log(` -------- `)
    }

    // --- Message Icons ---
    if (siteStyles && siteStyles.length > 0) {
        // eslint-disable-next-line no-undef
        console.log(`Seeding Message Icons (${messageIcons.length})`)
        for (const messageIcon of messageIcons) {
            await prisma.messageIcon.upsert({
                where: {name: messageIcon.name},
                update: allowUpdate
                    ? {
                        name: messageIcon.name,
                        path: messageIcon.path,
                        comment: messageIcon.comment,
                    }
                    : {},
                // update: {
                //   name: messageIcon.name,
                //   path: messageIcon.path,
                //   comment: messageIcon.comment,
                // },
                // update: {}, // 🔥 WICHTIG: nichts überschreiben
                create: messageIcon,
            })
        }
        // eslint-disable-next-line no-undef
        console.log(`Seeding Message Icons abgeschlossen`)
        // eslint-disable-next-line no-undef
        console.log(` -------- `)
    }

    // --- Versions ---
    if (versions && versions.length > 0) {
        // eslint-disable-next-line no-undef
        console.log(`Seeding Versions (${versions.length})`)
        for (const version of versions) {
            await prisma.version.upsert({
                where: {versionNumber: version.versionNumber},
                update: allowUpdate
                    ? {
                        versionNumber: version.versionNumber,
                        description: version.description,
                        createdAt: version.createdAt,
                    }
                    : {},

                // update: {}, // 🔥 WICHTIG: nichts überschreiben
                // update: {
                //     value: general.value,
                //     comment: general.comment
                // },
                create: version,
            })
        }
        // eslint-disable-next-line no-undef
        console.log(`Seeding Versions abgeschlossen`)
        // eslint-disable-next-line no-undef
        console.log(` -------- `)
    }

    // eslint-disable-next-line no-undef
    console.log(' Seeding abgeschlossen!')
}

// Für direkten Node-Aufruf:
seed()
    .catch((e) => {
        // eslint-disable-next-line no-undef
        console.error('=> Seed-Fehler:', e)
        // eslint-disable-next-line no-undef
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
