<script lang="ts" setup>
import { onBeforeMount} from 'vue'
import { useGeneralStore } from '@/stores/general.ts'
import { useSiteStyleStore } from '@/stores/siteStyle.ts'
import { useMessageStore } from '@/stores/message.ts'
import { useIncomingAlertStore } from '@/stores/incomingAlert.ts'
import { useSiteStyles } from '@/composables/useSiteStyles.ts'
import SectionOne from '@/components/Dashbaord/SectionOne.vue'
import SectionTwo from '@/components/Dashbaord/SectionTwo.vue'
import SectionThree from '@/components/Dashbaord/SectionThree.vue'
import SectionFour from '@/components/Dashbaord/SectionFour.vue'
import SectionFive from '@/components/Dashbaord/SectionFive.vue'
import { useGenerals } from '@/composables/useGenerals.ts'

// Pinia Stores
const storeGeneral = useGeneralStore()
const storeSiteStyle = useSiteStyleStore()
const storeMessage = useMessageStore()
const storeIncomingAlert = useIncomingAlertStore()

// Generals
const { getBool } = useGenerals()

const showSection1 = getBool('show_section_1')
const showSection2 = getBool('show_section_2')
const showSection3 = getBool('show_section_3')
const showSection4 = getBool('show_section_4')
const showSection5 = getBool('show_section_5')

// Styles
const { style } = useSiteStyles()

const baseLayout = style('base_layout')

/**
 * Load the Store Items from the Database
 */
onBeforeMount(() => {
  storeGeneral.fetchAllItems()
  storeSiteStyle.fetchAllItems()
  storeMessage.fetchAllItems()
  storeIncomingAlert.onLazyLoad({ first: 0, rows: 10 })
})
</script>

<template>
  <main
    :class="baseLayout.htmlClass"
    :style="baseLayout.htmlStyle"
    class="z-10"
  >
    <!-- 1. Section (Divera) -->
    <SectionOne v-if="showSection1" />
    <!-- 2. Section (Einsatztext + Adresse) -->
    <SectionTwo v-if="showSection2" />
    <!-- 3. Section (Karte) -->
    <SectionThree v-if="showSection3" />
    <!-- 4. Section (Mitteilungen und wichtige Informationen) -->
    <SectionFour v-if="showSection4" />
    <!-- 5. Section (Uhrzeit) -->
    <SectionFive v-if="showSection5" />
  </main>
</template>
