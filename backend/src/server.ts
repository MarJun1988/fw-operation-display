import 'dotenv/config'
import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import {WebSocketServer} from 'ws'
import {useServer} from 'graphql-ws/use/ws'
import healthRouter from './health.js';
import {createApolloMiddleware, pubsub, schema} from './app.js'

const PORT = parseInt(process.env.PORT || '4000', 10)

async function start() {
    const app = express()
    app.use(cors(), bodyParser.json())
    app.use(bodyParser.json({limit: '10mb'})) // oder '20mb'

    const apolloMiddleware = await createApolloMiddleware()
    app.use('/graphql', apolloMiddleware)

    app.use('/', healthRouter);

    const httpServer = http.createServer(app)

    const wsServer = new WebSocketServer({server: httpServer, path: '/graphql'})
    const cleanup = useServer({schema, context: () => ({pubsub})}, wsServer)

    httpServer.listen(PORT, () => {
        console.log(`GraphQL HTTP:  http://localhost:${PORT}/graphql`)
        console.log(`GraphQL WS:    ws://localhost:${PORT}/graphql`)
        console.log(`health-check:  http://localhost:${PORT}/health`)
    })

    const shutdown = async () => {
        await cleanup.dispose()
        httpServer.close(() => process.exit(0))
    }
    process.on('SIGINT', shutdown)
    process.on('SIGTERM', shutdown)
}

start().catch((e) => {
    console.error(e)
    process.exit(1)
})