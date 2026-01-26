import { ApolloServer } from '@apollo/server'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { expressMiddleware } from '@as-integrations/express5'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'

// ✅ funktioniert mit "type": "module" + NodeNext
import pkg from 'ioredis'
import { RedisPubSub } from 'graphql-redis-subscriptions'

const { default: Redis } = pkg as any

const redisOptions = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
}

export const pubsub = new RedisPubSub({
    publisher: new Redis(redisOptions),
    subscriber: new Redis(redisOptions),
})

import { rootTypeDefs } from './graphql/root.js'
import { typeDefs as generalTypeDefs, resolvers as generalResolvers } from './graphql/general.js'
import { typeDefs as incomingAlertTypeDefs, resolvers as incomingAlertResolvers } from './graphql/incomingAlert.js'
import { typeDefs as messageTypeDefs, resolvers as messageResolvers  } from './graphql/message.js'
import { typeDefs as messageIconTypeDefs, resolvers as messageIconResolvers } from './graphql/messageIcon.js'
import { typeDefs as siteStyleTypeDefs, resolvers as siteStyleResolvers } from './graphql/siteStyle.js'

const typeDefs = mergeTypeDefs([
    rootTypeDefs,
    generalTypeDefs,
    messageTypeDefs,
    messageIconTypeDefs,
    incomingAlertTypeDefs,
    siteStyleTypeDefs
])

const resolvers = mergeResolvers([
    generalResolvers,
    messageResolvers,
    incomingAlertResolvers,
    messageIconResolvers,
    siteStyleResolvers
])

export const schema = makeExecutableSchema({
     typeDefs,
     resolvers,
 })

export async function createApolloMiddleware() {
  const apollo = new ApolloServer({ schema })
  await apollo.start()
  return expressMiddleware(apollo, {
    context: async () => ({ pubsub }),
  })
}