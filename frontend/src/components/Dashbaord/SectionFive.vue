<script lang="ts" setup>
import { computed,ref } from 'vue'
import { useSiteStyles } from '@/composables/useSiteStyles.ts'
import { useGenerals } from '@/composables/useGenerals.ts'

// Generals
const { getValue } = useGenerals()

const showSection5Date = getValue('show_section_5_Date')
const showSection5Time = getValue('show_section_5_Time')
const formatDate = getValue('format_date')
const formatTime = getValue('format_time')

// Styles
const { style } = useSiteStyles()

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
  <router-link to="/management-area">
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
    </div>
  </router-link>
</template>
