interface DefaultSiteStyle {
  name: string
  description: string
  htmlStyle: string
  htmlClass: string
}

export const DEFAULT_SITE_STYLES: DefaultSiteStyle[] = [
  {
    name: 'base_layout',
    description: 'Grundlayout des Dashboards',
    htmlClass: 'min-h-screen min-w-screen bg-white dark:bg-black',
    htmlStyle: '',
  },
  // 1ter Abschnitt
  {
    name: 'section_1',
    description: '1ter Abschnitt von oben, wo die "Überschrift" drin steht',
    htmlClass: 'min-w-screen grid grid-cols-3 border-b-1',
    htmlStyle: '',
  },
  {
    name: 'section_1_column_1',
    description: '1ter Abschnitt, 1 Spalte von Links "komme"',
    htmlClass: 'text-center content-center order-1 text-xl md:text-2xl font-bold',
    htmlStyle: '',
  },
  {
    name: 'section_1_column_2',
    description: '1ter Abschnitt, 2 Spalte von Links "komme nicht"',
    htmlClass: 'text-center content-center order-2 text-xl md:text-2xl font-bold',
    htmlStyle: '',
  },
  {
    name: 'section_1_column_3',
    description: '1ter Abschnitt, 1 Spalte von Links "komme > 10min"',
    htmlClass: 'text-center content-center order-3 text-xl md:text-2xl font-bold',
    htmlStyle: '',
  },
  {
    name: 'section_1_iframe_divera',
    description: '1ter Abschnitt, iFrame von Divera',
    htmlClass: 'col-span-3 order-4 h-95',
    htmlStyle: '',
  },
  {
    name: 'section_2',
    description: '2ter Abschnitt von oben, wo die "Alarmierung" drin steht',
    htmlClass: 'min-w-screen grid border-b-1 p-4',
    htmlStyle: '',
  },
  {
    name: 'section_2_alert_message_headline',
    description: '2ter Abschnitt, Überschrift der "Einsatzmeldung"',
    htmlClass: 'text-center text-1xl md:text-4xl  font-bold text-red-700 m-3',
    htmlStyle: '',
  },
  {
    name: 'section_2_alert_message_icon',
    description: '2ter Abschnitt, Icon der "Einsatzmeldung"',
    htmlClass: 'pi pi-envelope content-center font-bold text-white',
    htmlStyle: 'font-size: inherit;',
  },
  {
    name: 'section_2_alert_message_text',
    description: '2ter Abschnitt, Alarmtext der "Einsatzmeldung"',
    htmlClass: 'text-center text-1xl md:text-3xl',
    htmlStyle: '',
  },
  {
    name: 'section_2_alert_address_headline',
    description: '2ter Abschnitt, Überschrift vom "Einsatzort"',
    htmlClass: 'text-center text-1xl md:text-4xl font-bold text-red-700 m-3 mt-10',
    htmlStyle: '',
  },
  {
    name: 'section_2_alert_address_icon',
    description: '2ter Abschnitt, Icon vom "Einsatzort"',
    htmlClass: 'pi pi-map content-center font-bold text-white',
    htmlStyle: 'font-size: inherit;',
  },
  {
    name: 'section_2_alert_address_text',
    description: '2ter Abschnitt, teil des Alarmtext vom "Einsatzort"',
    htmlClass: 'text-center text-1xl md:text-3xl',
    htmlStyle: '',
  },
  // 3ter Abschnitt
  {
    name: 'section_3',
    description: '3ter Abschnitt von oben, wo die "Karte" drin steht',
    htmlClass:
      'w-90 h-90 fixed bottom-0',
    htmlStyle: '',
  },
  // 4ter Abschnitt
  {
    name: 'section_4',
    description:
      '4ter Abschnitt von oben, wo die "Mitteilungen und Wichtige Informationen" drin steht',
    htmlClass: 'min-w-screen grid',
    htmlStyle: '',
  },
  {
    name: 'section_4_message_headline',
    description: '4ter Abschnitt, Überschrift der "Mitteilungen und Wichtige Informationen"',
    htmlClass: 'text-center text-1xl md:text-3xl font-bold text-red-700 m-3',
    htmlStyle: '',
  },
  {
    name: 'section_4_message_icon',
    description: '4ter Abschnitt, Icon der "Mitteilungen und Wichtige Informationen"',
    htmlClass: 'pi pi-info-circle content-center font-bold text-white',
    htmlStyle: 'font-size: inherit;',
  },
  {
    name: 'section_4_message_list_ul',
    description: '4ter Abschnitt, das <ul> Element',
    htmlClass: '',
    htmlStyle: '',
  },
  {
    name: 'section_4_message_list_li',
    description: '4ter Abschnitt, das <li> Element',
    htmlClass: 'w-full md:w-1/2 m-auto border-b p-3',
    htmlStyle: '',
  },
  {
    name: 'section_4_message_list_li_div',
    description: '4ter Abschnitt, <div> des Bildes der "Mitteilungen" im <li> Element',
    htmlClass: 'grid grid-flow-col grid-rows-2 gap-2 items-center',
    htmlStyle: '',
  },
  {
    name: 'section_4_message_list_image',
    description: '4ter Abschnitt, Bildes der "Mitteilungen" im <li> Element',
    htmlClass: 'row-span-2 h-7 md:h-10 justify-self-start',
    htmlStyle: '',
  },
  {
    name: 'section_4_message_list_headline',
    description: '4ter Abschnitt, Überschrift der "Mitteilungen" im <li> Element',
    htmlClass: 'text-1xl md:text-2xl',
    htmlStyle: '',
  },
  {
    name: 'section_4_message_list_text',
    description: '4ter Abschnitt, Text der "Mitteilungen" im <li> Element',
    htmlClass: 'col-span-2 text-1xl md:text-2xl',
    htmlStyle: '',
  },
  {
    name: 'section_4_message_list_date_time',
    description:
      '4ter Abschnitt, Text des erstellungs/bearbeitungs "Datum/Uhrzeit " im <li> Element',
    htmlClass: 'text-xs w-full self-start text-right',
    htmlStyle: '',
  },
    // 5ter Abschnitt
  {
    name: 'section_5',
    description: '5ter Abschnitt von oben, wo die "Uhr und Datum" drin steht',
    htmlClass:
      'bottom-10 grid grid-cols-1 text-center border-1 w-80 md:fixed right-5 p-2 md:p-5 shadow-lg shadow-white/50 hover:bg-grey-50 m-5 !m-auto !mt-5 transition duration-300 ease-in-out hover:scale-85',
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
