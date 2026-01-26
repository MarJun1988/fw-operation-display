 interface DefaultGeneral {
   name: string
   value: string
   comment: string
 }

 export const DEFAULT_GENERALS: DefaultGeneral[] = [
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
     comment: '4ter Abschnitt, Überschrift "Mitteilungen und Wichtige Informationen"',
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
     name: "fire_department_address",
     value: "Dresdner Str. 22, 09577 Niederwiesa",
     comment: "Gerätehaus lat Koordinaten"
   },
   {
     name: "default_map_zoom",
     value: "16",
     comment: "Zoom der Karte"
   },
 ]
