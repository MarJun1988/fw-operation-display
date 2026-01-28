import gql from 'graphql-tag'

// #### Query
// General
export const QUERY_GENERAL = gql`
  query General($generalId: ID!) {
    general(id: $generalId) {
      id
      name
      value
      sorting
      createdAt
      updatedAt
      comment
    }
  }
`
export const QUERY_GENERALS = gql`
  query Generals {
    generals {
      id
      name
      value
      sorting
      createdAt
      updatedAt
      comment
    }
  }
`
export const QUERY_GENERALS_PAGED = gql`
  query GeneralsPaged($page: DataTablePageInput) {
    generalsPaged(page: $page) {
      totalRecords
      items {
        id
        name
        value
        sorting
        createdAt
        updatedAt
        comment
      }
    }
  }
`

// IncomingAlert
export const QUERY_INCOMING_ALERT = gql`
  query IncomingAlert($incomingAlertId: ID!) {
    incomingAlert(id: $incomingAlertId) {
      id
      address
      text
      createdAt
      updatedAt
      comment
    }
  }
`
export const QUERY_INCOMING_ALERTS_PAGED = gql`
  query IncomingAlerts($page: DataTablePageInput) {
    incomingAlertsPaged(page: $page) {
      totalRecords
      items {
        id
        address
        text
        createdAt
        updatedAt
        comment
      }
    }
  }
`

// Messages
export const QUERY_MESSAGE = gql`
  query Message($messageId: ID!) {
    message(id: $messageId) {
      id
      headline
      message
      iconId
      icon {
        id
        path
        name
      }
      sorting
      createdAt
      updatedAt
      comment
    }
  }
`
export const QUERY_MESSAGES = gql`
  query Message {
    messages {
      id
      headline
      message
      iconId
      icon {
        id
        path
        name
      }
      createdAt
      updatedAt
      comment
    }
  }
`
export const QUERY_MESSAGES_PAGED = gql`
  query MessagesPaged($page: DataTablePageInput) {
    messagesPaged(page: $page) {
      items {
        id
        headline
        message
        iconId
        icon {
          id
          path
          name
        }
        sorting
        createdAt
        updatedAt
        comment
      }
      totalRecords
    }
  }
`

// MessageIcon
export const QUERY_MESSAGE_ICON = gql`
  query MessageIcon($messageIconId: ID!) {
    messageIcon(id: $messageIconId) {
      id
      name
      path
      Message {
        headline
        id
        message
        comment
      }
      createdAt
      updatedAt
      comment
    }
  }
`
export const QUERY_MESSAGE_ICONS = gql`
  query MessageIcons {
    messageIcons {
      id
      name
      path
      createdAt
      updatedAt
      comment
    }
  }
`
export const QUERY_MESSAGE_ICONS_PAGED = gql`
  query MessageIconsPaged($page: DataTablePageInput) {
    messageIconsPaged(page: $page) {
      totalRecords
      items {
        id
        name
        path
        Message {
          id
          headline
          message
          comment
        }
        createdAt
        updatedAt
        comment
      }
    }
  }
`

// SiteStyle
export const QUERY_SITE_STYLE = gql`
  query SiteStyle($siteStyleId: ID!) {
    siteStyle(id: $siteStyleId) {
      id
      name
      description
      htmlStyle
      htmlClass
      sorting
      createdAt
      updatedAt
      comment
    }
  }
`
export const QUERY_SITE_STYLES = gql`
  query SiteStyles {
    siteStyles {
      id
      name
      description
      htmlStyle
      htmlClass
      sorting
      createdAt
      updatedAt
      comment
    }
  }
`
export const QUERY_SITE_STYLE_PAGED = gql`
  query SiteStylesPaged($page: DataTablePageInput) {
    siteStylesPaged(page: $page) {
      totalRecords
      items {
        id
        name
        description
        htmlStyle
        htmlClass
        sorting
        createdAt
        updatedAt
        comment
      }
    }
  }
`

// Version
export const QUERY_VERSION = gql`
  query Version($versionId: ID!) {
    version(id: $versionId) {
      id
      versionNumber
      description
      createdAt
      updatedAt
      comment
    }
  }
`
export const QUERY_VERSIONS = gql`
  query Versions {
    versions {
      id
      versionNumber
      description
      createdAt
      updatedAt
      comment
    }
  }
`
export const QUERY_VERSIONS_PAGED = gql`
  query VersionsPaged($page: DataTablePageInput) {
    versionsPaged(page: $page) {
      totalRecords
      items {
        id
        versionNumber
        description
        createdAt
        updatedAt
        comment
      }
    }
  }
`

// #### Mutationen

// General
export const MUTATIONEN_CREATE_GENERAL = gql`
  mutation Mutation($name: String!, $value: String!,  $sorting: Int!, $comment: String) {
    createGeneral(name: $name, value: $value ,sorting: $sorting, comment: $comment) {
      id
      name
      value
      sorting
      createdAt
      updatedAt
      comment
    }
  }
`
export const MUTATIONEN_UPDATE_GENERAL = gql`
  mutation UpdateGeneral($id: ID!, $name: String!, $value: String!, $sorting: Int!, $comment: String) {
    updateGeneral(id: $id, name: $name, value: $value, sorting: $sorting, comment: $comment) {
      id
      name
      value
      sorting
      createdAt
      updatedAt
      comment
    }
  }
`
export const MUTATIONEN_DELETE_GENERAL = gql`
  mutation DeleteGeneral($ids: [ID!]!) {
    deleteGeneral(ids: $ids) {
      deleted {
        comment
        createdAt
        id
        name
        sorting
        updatedAt
        value
      }
      totalCount
    }
  }
`

// IncomingAlert
export const MUTATIONEN_CREATE_INCOMING_ALERT = gql`
  mutation CreateIncomingAlert($address: String!, $text: String!, $comment: String) {
    createIncomingAlert(address: $address, text: $text, comment: $comment) {
      id
      address
      text
      createdAt
      updatedAt
      comment
    }
  }
`
export const MUTATIONEN_UPDATE_INCOMING_ALERT = gql`
  mutation UpdateIncomingAlert($id: ID!, $address: String, $text: String, $comment: String) {
    updateIncomingAlert(id: $id, address: $address, text: $text, comment: $comment) {
      id
      address
      text
      createdAt
      updatedAt
      comment
    }
  }
`
export const MUTATIONEN_DELETE_INCOMING_ALERT = gql`
  mutation DeleteIncomingAlert($ids: [ID!]!) {
    deleteIncomingAlert(ids: $ids) {
      deleted {
        id
        address
        text
        createdAt
        updatedAt
        comment
      }
      totalCount
    }
  }
`

// Messages
export const MUTATIONEN_CREATE_MESSAGE = gql`
  mutation CreateMessage(
    $headline: String!
    $message: String!
    $iconId: String
    $icon: String
    $sorting: Int!,
    $comment: String
  ) {
    createMessage(
      headline: $headline
      message: $message
      iconId: $iconId
      icon: $icon
      sorting: $sorting,
      comment: $comment
    ) {
      id
      headline
      message
      iconId
      icon {
        id
        name
        path
      }
      sorting
      createdAt
      updatedAt
      comment
    }
  }
`
export const MUTATIONEN_UPDATE_MESSAGE = gql`
  mutation UpdateMessage(
    $id: ID!
    $headline: String!
    $message: String!
    $iconId: String
    $sorting: Int!
    $comment: String
  ) {
    updateMessage(
      id: $id
      headline: $headline
      message: $message
      iconId: $iconId
      sorting: $sorting,
      comment: $comment
    ) {
      id
      headline
      message
      iconId
      icon {
        id
        name
        path
      }
      sorting
      createdAt
      updatedAt
      comment
    }
  }
`
export const MUTATIONEN_DELETE_MESSAGE = gql`
  mutation DeleteMessage($ids: [ID!]!) {
    deleteMessage(ids: $ids) {
      deleted {
        id
        headline
        message
        iconId
        icon {
          id
          name
          path
        }
        sorting
        createdAt
        updatedAt
        comment
      }
      totalCount
    }
  }
`

// MessageIcon
export const MUTATIONEN_CREATE_MESSAGE_ICON = gql`
  mutation CreateMessageIcon($name: String!, $path: String!, $comment: String) {
    createMessageIcon(name: $name, path: $path, comment: $comment) {
      id
      name
      path
      createdAt
      updatedAt
      comment
    }
  }
`
export const MUTATIONEN_UPDATE_MESSAGE_ICON = gql`
  mutation UpdateMessageIcon($id: ID!, $name: String!, $path: String!, $comment: String) {
    updateMessageIcon(id: $id, name: $name, path: $path, comment: $comment) {
      id
      name
      path
      createdAt
      updatedAt
      comment
    }
  }
`
export const MUTATIONEN_DELETE_MESSAGE_ICON = gql`
  mutation DeleteMessageIcon($ids: [ID!]!) {
    deleteMessageIcon(ids: $ids) {
      deleted {
        id
        name
        path
        createdAt
        updatedAt
        comment
      }
      totalCount
    }
  }
`

// SiteStyle
export const MUTATIONEN_CREATE_SITE_STYLE = gql`
  mutation CreateSiteStyle($name: String!, $description: String!, $sorting: Int!, $htmlStyle: String, $htmlClass: String, $comment: String) {
    createSiteStyle(name: $name, description: $description, sorting: $sorting, htmlStyle: $htmlStyle, htmlClass: $htmlClass, comment: $comment) {
      id
      name
      description
      htmlStyle
      htmlClass
      sorting
      createdAt
      updatedAt
      comment
    }
  }
`
export const MUTATIONEN_UPDATE_SITE_STYLE = gql`
  mutation UpdateSiteStyle($id: ID!, $name: String!, $description: String!, $sorting: Int!, $htmlStyle: String, $htmlClass: String, $comment: String) {
    updateSiteStyle(id: $id, name: $name, description: $description, sorting: $sorting, htmlStyle: $htmlStyle, htmlClass: $htmlClass, comment: $comment) {
      id
      name
      description
      htmlStyle
      htmlClass
      sorting
      createdAt
      updatedAt
      comment
    }
  }
`
export const MUTATIONEN_DELETE_SITE_STYLE = gql`
  mutation DeleteSiteStyle($ids: [ID!]!) {
    deleteSiteStyle(ids: $ids) {
      deleted {
        id
        name
        description
        htmlStyle
        htmlClass
        sorting
        createdAt
        updatedAt
        comment
      }
      totalCount
    }
  }
`

// Version
export const MUTATIONEN_CREATE_VERSION = gql`
  mutation CreateVersion($versionNumber: String!, $description: String!, $comment: String) {
    createVersion(versionNumber: $versionNumber, description: $description, comment: $comment) {
      id
      versionNumber
      description
      createdAt
      updatedAt
      comment
    }
  }
`
export const MUTATIONEN_UPDATE_VERSION = gql`
  mutation UpdateVersion($id: ID!, $versionNumber: String!, $description: String!, $comment: String) {
    updateVersion(id: $id, versionNumber: $versionNumber, description: $description, comment: $comment) {
      id
      versionNumber
      description
      createdAt
      updatedAt
      comment
    }
  }
`
export const MUTATIONEN_DELETE_VERSION = gql`
  mutation DeleteVersion($ids: [ID!]!) {
    deleteVersion(ids: $ids) {
      deleted {
        id
        versionNumber
        description
        createdAt
        updatedAt
        comment
      }
      totalCount
    }
  }
`

// #### Subscription

// General
export const SUBSCRIPTION_GENERAL_CREATED = gql`
  subscription GeneralCreated {
    generalCreated {
      id
      name
      value
      sorting
      createdAt
      updatedAt
      comment
    }
  }
`
export const SUBSCRIPTION_GENERAL_UPDATED = gql`
  subscription GeneralUpdated {
    generalUpdated {
      id
      name
      value
      sorting
      createdAt
      updatedAt
      comment
    }
  }
`
export const SUBSCRIPTION_GENERAL_DELETED = gql`
  subscription GeneralDeleted {
    generalDeleted {
      deleted {
        id
        name
        value
        sorting
        createdAt
        updatedAt
        comment
      }
      totalCount
    }
  }
`

// IncomingAlert
export const SUBSCRIPTION_INCOMING_ALERT_CREATED = gql`
  subscription IncomingAlertCreated {
    incomingAlertCreated {
      id
      address
      text
      createdAt
      updatedAt
      comment
    }
  }
`
export const SUBSCRIPTION_INCOMING_ALERT_UPDATED = gql`
  subscription IncomingAlertUpdated {
    incomingAlertUpdated {
      id
      address
      text
      createdAt
      updatedAt
      comment
    }
  }
`
export const SUBSCRIPTION_INCOMING_ALERT_DELETED = gql`
  subscription Subscription {
    incomingAlertDeleted {
      deleted {
        id
        address
        text
        createdAt
        updatedAt
        comment
      }
      totalCount
    }
  }
`

// Messages
export const SUBSCRIPTION_MESSAGE_CREATED = gql`
  subscription MessageCreated {
    messageCreated {
      id
      headline
      message
      iconId
      icon {
        id
        name
        path
      }
      sorting
      createdAt
      updatedAt
      comment
    }
  }
`
export const SUBSCRIPTION_MESSAGE_UPDATED = gql`
  subscription MessageUpdated {
    messageUpdated {
      id
      headline
      message
      iconId
      icon {
        id
        name
        path
      }
      sorting
      createdAt
      updatedAt
      comment
    }
  }
`
export const SUBSCRIPTION_MESSAGE_DELETED = gql`
  subscription MessageDeleted {
    messageDeleted {
      deleted {
        id
        headline
        message
        iconId
        icon {
          id
          name
          path
        }
        sorting
        createdAt
        updatedAt
        comment
      }
      totalCount
    }
  }
`

// MessageIcon
export const SUBSCRIPTION_MESSAGE_ICON_CREATED = gql`
  subscription MessageIconCreated {
    messageIconCreated {
      id
      name
      path
      createdAt
      updatedAt
      comment
    }
  }
`
export const SUBSCRIPTION_MESSAGE_ICON_UPDATED = gql`
  subscription MessageIconUpdated {
    messageIconUpdated {
      id
      name
      path
      createdAt
      updatedAt
      comment
    }
  }
`
export const SUBSCRIPTION_MESSAGE_ICON_DELETED = gql`
  subscription MessageIconDeleted {
    messageIconDeleted {
      deleted {
        id
        name
        path
        createdAt
        updatedAt
        comment
      }
      totalCount
    }
  }
`

// SiteStyle
export const SUBSCRIPTION_SITE_STYLE_CREATED = gql`
  subscription SiteStyleCreated {
    siteStyleCreated {
      id
      name
      description
      htmlStyle
      htmlClass
      sorting
      createdAt
      updatedAt
      comment
    }
  }
`
export const SUBSCRIPTION_SITE_STYLE_UPDATED = gql`
  subscription SiteStyleUpdated {
    siteStyleUpdated {
      id
      name
      description
      htmlStyle
      htmlClass
      sorting
      createdAt
      updatedAt
      comment
    }
  }
`
export const SUBSCRIPTION_SITE_STYLE_DELETED = gql`
  subscription SiteStyleDeleted {
    siteStyleDeleted {
      deleted {
        id
        name
        description
        htmlStyle
        htmlClass
        sorting
        createdAt
        updatedAt
        comment
      }
      totalCount
    }
  }
`

// Version
export const SUBSCRIPTION_VERSION_CREATED = gql`
  subscription VersionCreated {
    versionCreated {
      id
      versionNumber
      description
      createdAt
      updatedAt
      comment
    }
  }
`
export const SUBSCRIPTION_VERSION_UPDATED = gql`
  subscription VersionUpdated {
    versionUpdated {
      id
      versionNumber
      description
      createdAt
      updatedAt
      comment
    }
  }
`
export const SUBSCRIPTION_VERSION_DELETED = gql`
  subscription VersionDeleted {
    versionDeleted {
      deleted {
        id
        versionNumber
        description
        createdAt
        updatedAt
        comment
      }
      totalCount
    }
  }
`
