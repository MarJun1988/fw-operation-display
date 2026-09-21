import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client/core'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'
import ApolloLinkTimeout from 'apollo-link-timeout'

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

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
    keepAlive: 15000,
    retryAttempts: 50,
    shouldRetry: () => true,
    retryWait: async (retries) => {
      const capped = Math.min(retries, 6)
      const baseDelay = 500 * 2 ** capped
      const jitter = Math.floor(Math.random() * 300)
      await wait(baseDelay + jitter)
    },
    on: {
      connected: () => console.log('✅ WS verbunden'),
      closed: (event) => {
        if (event instanceof CloseEvent) {
          console.log('❌ WS geschlossen', event.code, event.reason)
          return
        }
        console.log('❌ WS geschlossen', event)
      },
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
