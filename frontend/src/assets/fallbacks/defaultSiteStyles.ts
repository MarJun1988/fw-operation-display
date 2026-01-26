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
    htmlClass: 'text-center text-1xl md:text-3xl',
    htmlStyle: 'flex items-center justify-center gap-4 text-1xl md:text-3xl text-center border-b-1 border-white',
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
    htmlClass: '. flex items-center justify-center gap-4 text-1xl md:text-3xl text-center border-b-1 border-white',
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
