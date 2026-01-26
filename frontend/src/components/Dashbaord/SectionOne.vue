<script lang="ts" setup>
import { useSiteStyles } from '@/composables/useSiteStyles.ts'
import { useGenerals } from '@/composables/useGenerals.ts'

// Generals
const { getValue } = useGenerals()

const urlFromDivera247 = getValue('url_from_divera_24_7')
const section1Column1Text = getValue('section_1_column_1_text')
const section1Column2Text = getValue('section_1_column_2_text')
const section1Column3Text = getValue('section_1_column_3_text')

// Styles
const { style, } = useSiteStyles()

const section1 = style('section_1')
const section1Column1 = style('section_1_column_1')
const section1Column2 = style('section_1_column_2')
const section1Column3 = style('section_1_column_3')
const section1IframeDivera = style('section_1_iframe_divera')
</script>

<template>
  <div
    :class="section1.htmlClass"
    :style="section1.htmlStyle"
  >
    <span
      :class="section1Column1.htmlClass"
      :style="section1Column1.htmlStyle"
    >
      {{ section1Column1Text }}
    </span>
    <span
      :class="section1Column2.htmlClass"
      :style="section1Column2.htmlStyle"
    >
      {{ section1Column2Text }}
    </span>
    <span
      :class="section1Column3.htmlClass"
      :style="section1Column3.htmlStyle"
    >
      {{ section1Column3Text }}
    </span>
    <iframe
      :class="section1IframeDivera.htmlClass"
      :src="urlFromDivera247"
      :style="section1IframeDivera.htmlStyle"
      height="100%"
      width="100%"
    />
  </div>
</template>
