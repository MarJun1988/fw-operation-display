<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useIncomingAlertStore } from '@/stores/incomingAlert.ts'
import { useSiteStyles } from '@/composables/useSiteStyles.ts'
import { useGenerals } from '@/composables/useGenerals.ts'

// Pinia Stores
const storeIncomingAlert = useIncomingAlertStore()
const { getLastIncomingAlert, getLastIncomingAlertAddress} = storeToRefs(storeIncomingAlert)

// Generals
const { getValue } = useGenerals()

const section2AlertMessageHeadlineText = getValue('section_2_alert_message_headline')
const section2AlertAddressHeadlineText = getValue('section_2_alert_address_headline')

// Styles
const { style } = useSiteStyles()

const section2 = style('section_2')
const section2AlertMessageHeadline = style('section_2_alert_message_headline')
const section2AlertMessageIcon = style('section_2_alert_message_icon')
const section2AlertMessageText = style('section_2_alert_message_text')
const section2AlertAddressHeadline = style('section_2_alert_address_headline')
const section2AlertAddressIcon = style('section_2_alert_address_icon')
const section2AlertAddressText = style('section_2_alert_address_text')

</script>

<template>
  <div
    :class="section2.htmlClass"
    :style="section2.htmlStyle"
  >
    <span
      :class="section2AlertMessageHeadline.htmlClass"
      :style="section2AlertMessageHeadline.htmlStyle"
    >
      <i
        :class="section2AlertMessageIcon.htmlClass"
        :style="section2AlertMessageIcon.htmlStyle"
      />
      {{ section2AlertMessageHeadlineText }}</span>
    <span
      :class="section2AlertMessageText.htmlClass"
      :style="section2AlertMessageText.htmlStyle"
    >
      {{ getLastIncomingAlert.text }}
    </span>
    <span
      :class="section2AlertAddressHeadline.htmlClass"
      :style="section2AlertAddressHeadline.htmlStyle"
    >
      <i
        :class="section2AlertAddressIcon.htmlClass"
        :style="section2AlertAddressIcon.htmlStyle"
      />
      {{ section2AlertAddressHeadlineText }}
    </span>
    <span
      :class="section2AlertAddressText.htmlClass"
      :style="section2AlertAddressText.htmlStyle"
    >
      {{ getLastIncomingAlertAddress.addressText }}
    </span>
  </div>
</template>
