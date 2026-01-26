<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useMessageStore } from '@/stores/message.ts'
import { useSiteStyles } from '@/composables/useSiteStyles.ts'
import { useGenerals } from '@/composables/useGenerals.ts'
import type { Message } from '@/utils/interfaces.ts'

// Pinia Stores
const storeMessage = useMessageStore()
const { allItems: allItemsMessage } = storeToRefs(storeMessage)

// Generals
const { getValue } = useGenerals()

const section4MessageHeadlineText = getValue('section_4_message_headline')

// Styles
const { style } = useSiteStyles()

const section4 = style('section_4')
const section4MessageHeadline = style('section_4_message_headline')
const section4MessageIcon = style('section_4_message_icon')
const section4MessageListUl = style('section_4_message_list_ul')
const section4MessageListLi = style('section_4_message_list_li')
const section4MessageListLiDiv = style('section_4_message_list_li_div')
const section4MessageListImage = style('section_4_message_list_image')
const section4MessageListHeadline = style('section_4_message_list_headline')
const section4MessageListText = style('section_4_message_list_text')
const section4MessageListDateTime = style('section_4_message_list_date_time')

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
</script>

<template>
  <div
    :class="section4.htmlClass"
    :style="section4.htmlStyle"
  >
    <span
      :class="section4MessageHeadline.htmlClass"
      :style="section4MessageHeadline.htmlStyle"
    >
      <i
        :class="section4MessageIcon.htmlClass"
        :style="section4MessageIcon.htmlStyle"
      />
      {{ section4MessageHeadlineText }}
    </span>
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
        <div
          :class="section4MessageListLiDiv.htmlClass"
          :style="section4MessageListLiDiv.htmlStyle"
        >
          <img
            v-if="message && message.icon && message.icon.path && message.icon.name"
            :alt="message.icon?.name"
            :class="section4MessageListImage.htmlClass"
            :src="message.icon?.path"
            :style="section4MessageListImage.htmlStyle"
          >
          <span
            :class="section4MessageListHeadline.htmlClass"
            :style="section4MessageListHeadline.htmlStyle"
          >
            {{ message.headline }}
          </span>
          <span
            :class="section4MessageListText.htmlClass"
            :style="section4MessageListText.htmlStyle"
          >
            {{ message.message }}
          </span>
          <span
            :class="section4MessageListDateTime.htmlClass"
            :style="section4MessageListDateTime.htmlStyle"
          >
            {{ formatMessageDateTime(message) }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>
