<script lang="ts" setup>
import {computed, onBeforeMount, ref} from 'vue'
import {useGeneralStore} from '@/stores/general.ts'
import {useSiteStyleStore} from '@/stores/siteStyle.ts'
import {useMessageStore} from '@/stores/message.ts'
import {useIncomingAlertStore} from '@/stores/incomingAlert.ts'
import {useSiteStyles} from '@/composables/useSiteStyles.ts'
import {useGenerals} from '@/composables/useGenerals.ts'
import SectionMap from "@/components/Dashbaord/SectionMap.vue";
import {storeToRefs} from "pinia";
import type {Message} from "@/utils/interfaces.ts";

// Pinia Stores
const storeGeneral = useGeneralStore()
const storeSiteStyle = useSiteStyleStore()
const storeMessage = useMessageStore()
const storeIncomingAlert = useIncomingAlertStore()
const {getLastIncomingAlert, getLastIncomingAlertAddress} = storeToRefs(storeIncomingAlert)
const {allItems: allItemsMessage} = storeToRefs(storeMessage)

// Generals
const {getBool} = useGenerals()

const showSection1 = getBool('show_section_1')
const showSection2 = getBool('show_section_2')
const showSection3 = getBool('show_section_3')
const showSection4 = getBool('show_section_4')
const showSection5 = getBool('show_section_5')

// Styles
// const {style} = useSiteStyles()

// const baseLayout = style('base_layout')

/**
 * Load the Store Items from the Database
 */
onBeforeMount(() => {
  storeGeneral.fetchAllItems()
  storeSiteStyle.fetchAllItems()
  storeMessage.fetchAllItems()
  storeIncomingAlert.onLazyLoad({
    first: 0, rows: 10,
    "multiSortMeta": [
      {
        "field": "createdAt",
        "order": -1
      }
    ]
  })
})


/**
 * Format the Date and Time from the Message or Information
 * @param message
 */
const formatMessageDateTime = (message: Message) => {
  const formatDateTime: Intl.DateTimeFormatOptions = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Berlin',
  }

  if (message && message.updatedAt) {
    return message.updatedAt.toLocaleString('de-DE', formatDateTime)
  } else if (message && message.createdAt) {
    return message.createdAt.toLocaleString('de-DE', formatDateTime)
  }

  return ''
}

// Generals
const {getValue} = useGenerals()

const urlFromDivera247 = getValue('url_from_divera_24_7')
const section1Column1Text = getValue('section_1_column_1_text')
const section1Column2Text = getValue('section_1_column_2_text')
const section1Column3Text = getValue('section_1_column_3_text')

const section2AlertMessageHeadlineText = getValue('section_2_alert_message_headline')
const section2AlertAddressHeadlineText = getValue('section_2_alert_address_headline')

const section4MessageHeadlineText = getValue('section_4_message_headline')

const showSection5Date = getValue('show_section_5_Date')
const showSection5Time = getValue('show_section_5_Time')
const formatDate = getValue('format_date')
const formatTime = getValue('format_time')

// Styles
const {style,} = useSiteStyles()

const mainGrid = style('main_grid')
const mainContent = style('main_content')
const infoColumn = style('info_column')

const section1Column1 = style('section_1_column_1')
const section1Column2 = style('section_1_column_2')
const section1Column3 = style('section_1_column_3')
const section1IframeDivera = style('section_1_iframe_divera')

const section2AlertMessageHeadline = style('section_2_alert_message_headline')
const section2AlertMessageIcon = style('section_2_alert_message_icon')
const section2AlertMessageText = style('section_2_alert_message_text')
const section2AlertAddressHeadline = style('section_2_alert_address_headline')
const section2AlertAddressIcon = style('section_2_alert_address_icon')
const section2AlertAddressText = style('section_2_alert_address_text')

const section4 = style('section_4')
const section4MessageHeadline = style('section_4_message_headline')
const section4MessageIcon = style('section_4_message_icon')
const section4MessageListUl = style('section_4_message_list_ul')
const section4MessageListLi = style('section_4_message_list_li')
// const section4MessageListLiDiv = style('section_4_message_list_li_div')
const section4MessageListImage = style('section_4_message_list_image')
const section4MessageListHeadline = style('section_4_message_list_headline')
const section4MessageListText = style('section_4_message_list_text')
const section4MessageListDateTime = style('section_4_message_list_date_time')

const section5 = style('section_5')
const section5Date = style('section_5_data')
const section5Time = style('section_5_time')

const now = ref(new Date())

// Current Date & Time refresh
setInterval(() => {
  now.value = new Date()
}, 1000)

/**
 * Format the Date in the Section_5, from Database or Fallback a File
 */
const formattedDate = computed(() =>
  now.value.toLocaleDateString('de-DE', JSON.parse(formatDate.value)),
)
/**
 * Format the Time in the Section_5, from Database or Fallback a File
 */
const formattedTime = computed(() =>
  now.value.toLocaleTimeString('de-DE', JSON.parse(formatTime.value)),
)

</script>

<template>
  <!-- MAIN GRID -->
  <main
    :class="mainGrid.htmlClass"
    :style="mainGrid.htmlStyle"
  >
    <!-- TOP TEXTE -->
    <div
      v-if="showSection1"
      :class="section1Column1.htmlClass"
      :style="section1Column1.htmlStyle"
    >
      {{ section1Column1Text }}
    </div>
    <div
      v-if="showSection1"
      :class="section1Column2.htmlClass"
      :style="section1Column2.htmlStyle"
    >
      {{ section1Column2Text }}
    </div>
    <div
      v-if="showSection1"
      :class="section1Column3.htmlClass"
      :style="section1Column3.htmlStyle"
    >
      {{ section1Column3Text }}
    </div>

    <!-- IFRAME / DIVERA -->
    <div
      v-if="showSection1"
      :class="section1IframeDivera.htmlClass"
      :style="section1IframeDivera.htmlStyle"
    >
      <iframe
        :src="urlFromDivera247"
        height="100%"
        width="100%"
      />
    </div>

    <!-- MAIN CONTENT -->
    <div
      :class="mainContent.htmlClass"
      :style="mainContent.htmlStyle"
    >
      <!-- MAP -->
      <SectionMap v-if="showSection3" />
      <!-- RIGHT INFO COLUMN -->
      <div
        :class="infoColumn.htmlClass"
        :style="infoColumn.htmlStyle"
      >
        <!-- Einsatztext - Headline -->
        <div
          v-if="showSection2"
          :class="section2AlertMessageHeadline.htmlClass"
          :style="section2AlertMessageHeadline.htmlStyle"
        >
          <i
            :class="section2AlertMessageIcon.htmlClass"
            :style="section2AlertMessageIcon.htmlStyle"
          />
          {{ section2AlertMessageHeadlineText }}
        </div>
        <!-- Text -->
        <div
          v-if="showSection2"
          :class="section2AlertMessageText.htmlClass"
          :style="section2AlertMessageText.htmlStyle"
        >
          {{ getLastIncomingAlert.text }}
        </div>
        <!-- Adresse - Headline -->
        <div
          v-if="showSection2"
          :class="section2AlertAddressHeadline.htmlClass"
          :style="section2AlertAddressHeadline.htmlStyle"
        >
          <i
            :class="section2AlertAddressIcon.htmlClass"
            :style="section2AlertAddressIcon.htmlStyle"
          />
          {{ section2AlertAddressHeadlineText }}
        </div>
        <!-- Text -->
        <div
          v-if="showSection2"
          :class="section2AlertAddressText.htmlClass"
          :style="section2AlertAddressText.htmlStyle"
        >
          {{ getLastIncomingAlertAddress.addressText }}
        </div>

        <!-- Mitteilungen -->
        <div
          v-if="showSection4"
          :class="section4.htmlClass"
          :style="section4.htmlStyle"
        >
          <div
            :class="section4MessageHeadline.htmlClass"
            :style="section4MessageHeadline.htmlStyle"
          >
            <i
              :class="section4MessageIcon.htmlClass"
              :style="section4MessageIcon.htmlStyle"
            />
            {{ section4MessageHeadlineText }}
          </div>
          <ul
            :class="section4MessageListUl.htmlClass"
            :style="section4MessageListUl.htmlStyle"
          >
            <li
              v-for="message in allItemsMessage.sort((a, b) => a.sorting - b.sorting)"
              :key="message.id"
              :class="section4MessageListLi.htmlClass"
              :style="section4MessageListLi.htmlStyle"
            >
              <!-- ICON (links, 2 Zeilen) -->
              <img
                v-if="message?.icon?.path && message?.icon?.name"
                :alt="message.icon.name"
                :class="section4MessageListImage.htmlClass"
                :src="message.icon.path"
                :style="section4MessageListImage.htmlStyle"
              >

              <!-- HEADLINE (oben mittig) -->
              <span
                :class="section4MessageListHeadline.htmlClass"
                :style="section4MessageListHeadline.htmlStyle"
              >
                {{ message.headline }}
              </span>

              <!-- DATETIME (oben rechts) -->
              <span
                :class="section4MessageListDateTime.htmlClass"
                :style="section4MessageListDateTime.htmlStyle"
              >
                {{ formatMessageDateTime(message) }}
              </span>

              <!-- MESSAGE TEXT (unten, über 2 Spalten) -->
              <span
                :class="section4MessageListText.htmlClass"
                :style="section4MessageListText.htmlStyle"
              >
                {{ message.message }}
              </span>
            </li>
          </ul>
        </div>

        <!-- Uhrzeit -->
        <router-link
          v-if="showSection5"
          to="/management-area"
        >
          <div
            :class="section5.htmlClass"
            :style="section5.htmlStyle"
          >
            <span
              v-if="showSection5Time"
              :class="section5Time.htmlClass"
              :style="section5Time.htmlStyle"
            >{{ formattedTime }}</span>
            <span
              v-if="showSection5Date"
              :class="section5Date.htmlClass"
              :style="section5Date.htmlStyle"
            >{{ formattedDate }}</span>
            <!--          class="bg-rose-400 p-4 text-white"-->
          </div>
        </router-link>
      </div>
    </div>
  </main>
</template>
