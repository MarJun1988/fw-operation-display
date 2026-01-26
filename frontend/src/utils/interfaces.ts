import type { DocumentNode } from 'graphql/language'
import type { ColumnProps } from 'primevue/column'

export interface General {
  id?: string
  name: string
  value: string
  sorting: number
  comment?: string | null
  createdAt?: Date
  updatedAt?: Date | null
}

export interface IncomingAlert {
  id?: string
  address: string
  text: string
  comment?: string | null
  createdAt?: Date
  updatedAt?: Date | null
}

export interface Message {
  id?: string
  headline: string
  message: string
  iconId: string | null | undefined
  icon?: MessageIcon | null | undefined
  sorting: number
  createdAt?: Date
  updatedAt?: Date | null
  comment?: string | null
}

export interface MessageIcon {
  id?: string | null | undefined
  name: string | null | undefined
  path: string | null | undefined
  comment?: string | null | undefined
  createdAt?: Date | null | undefined
  updatedAt?: Date | null | undefined
  Message?: Message[] | null | undefined
}

export interface SiteStyle {
  id?: string
  name: string
  description: string
  htmlStyle: string
  htmlClass: string
  sorting: number
  comment?: string | null
  createdAt?: Date
  updatedAt?: Date | null
}

export interface CustomColumnProps extends ColumnProps {
  defaultShowing?: boolean
  filterNotShowing?: boolean
}

export interface GraphQlVariable {
  skip: number
  take: number
}

// Result
export interface SubscriptionDeleteGeneral {
  deleted: General[]
  totalCount: number
}

export interface SubscriptionConfig<T> {
  query: DocumentNode
// eslint-disable-next-line no-unused-vars
  handler: (_msg: T) => void
}

// Generals
export type SubscriptionMessagesGeneral = {
  generalCreated: General
  generalUpdated: General
  generalDeleted: SubscriptionDeleteGeneral
}

export type AnySubscriptionGeneral =
  | SubscriptionConfig<SubscriptionMessagesGeneral['generalCreated']>
  | SubscriptionConfig<SubscriptionMessagesGeneral['generalUpdated']>
  | SubscriptionConfig<SubscriptionMessagesGeneral['generalDeleted']>

export interface SubscriptionDeleteIncomingAlert {
  deleted: IncomingAlert[]
  totalCount: number
}

export type SubscriptionMessagesIncomingAlert = {
  incomingAlertCreated: IncomingAlert
  incomingAlertUpdated: IncomingAlert
  incomingAlertDeleted: SubscriptionDeleteIncomingAlert
}

export type AnySubscriptionIncomingAlert =
  | SubscriptionConfig<SubscriptionMessagesIncomingAlert['incomingAlertCreated']>
  | SubscriptionConfig<SubscriptionMessagesIncomingAlert['incomingAlertUpdated']>
  | SubscriptionConfig<SubscriptionMessagesIncomingAlert['incomingAlertDeleted']>

// Message
export interface SubscriptionDeleteMessage {
  deleted: Message[]
  totalCount: number
}

export type SubscriptionMessagesMessage = {
  messageCreated: Message
  messageUpdated: Message
  messageDeleted: SubscriptionDeleteMessage
}

export type AnySubscriptionMessage =
  | SubscriptionConfig<SubscriptionMessagesMessage['messageCreated']>
  | SubscriptionConfig<SubscriptionMessagesMessage['messageUpdated']>
  | SubscriptionConfig<SubscriptionMessagesMessage['messageDeleted']>

// Message ICON
export interface SubscriptionDeleteMessageIcon {
  deleted: MessageIcon[]
  totalCount: number
}

export type SubscriptionMessagesMessageIcon = {
  messageIconCreated: MessageIcon
  messageIconUpdated: MessageIcon
  messageIconDeleted: SubscriptionDeleteMessageIcon
}

export type AnySubscriptionMessageIcon =
  | SubscriptionConfig<SubscriptionMessagesMessageIcon['messageIconCreated']>
  | SubscriptionConfig<SubscriptionMessagesMessageIcon['messageIconUpdated']>
  | SubscriptionConfig<SubscriptionMessagesMessageIcon['messageIconDeleted']>

// SiteStyle ICON
export interface SubscriptionDeleteSiteStyle {
  deleted: SiteStyle[]
  totalCount: number
}

export type SubscriptionMessagesSiteStyle = {
  siteStyleCreated: SiteStyle
  siteStyleUpdated: SiteStyle
  siteStyleDeleted: SubscriptionDeleteSiteStyle
}

export type AnySubscriptionSiteStyle =
  | SubscriptionConfig<SubscriptionMessagesSiteStyle['siteStyleCreated']>
  | SubscriptionConfig<SubscriptionMessagesSiteStyle['siteStyleUpdated']>
  | SubscriptionConfig<SubscriptionMessagesSiteStyle['siteStyleDeleted']>

export interface Coordinates {
  lat: number
  lon: number
}
