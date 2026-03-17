import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client/core'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'
import ApolloLinkTimeout from 'apollo-link-timeout'

// Relative Endpoints: Nginx proxied /api -> backend /graphql
const httpUrl = '/api/graphql'
const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws'
const wsUrl = `${wsProtocol}://${window.location.host}/api/graphql`

const httpLink = new HttpLink({
  uri: httpUrl,
  headers: {
    'x-apollo-operation-name': 'client',
  },
})


// Timeout-Link setzen – z. B. 10 000 ms = 10 Sekunden
const timeoutLink = new ApolloLinkTimeout(10000)

// Kombiniere Timeout + HTTP Link
const timeoutHttpLink = timeoutLink.concat(httpLink)

// WebSocket-Link für Subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: wsUrl,
    on: {
      connected: () => console.log('✅ WS verbunden'),
      closed: () => console.log('❌ WS geschlossen'),
      error: (e) => console.error('WS Fehler:', e),
    },
  }),
)

const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query)
    return def.kind === 'OperationDefinition' && def.operation === 'subscription'
  },
  wsLink,
  timeoutHttpLink, // Hier den Timeout-versetzten Http-Link verwenden
)

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})
