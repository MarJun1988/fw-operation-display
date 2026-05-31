import {PrismaClient} from '@prisma/client'
import {buildPrismaWhere} from "./utils/utils.js";

export const typeDefs = /* GraphQL */ `
    type Message {
        id: ID!
        headline: String!
        message: String!
        iconId: String
        icon: MessageIcon
        sorting: Int!
        createdAt: DateTime!
        updatedAt: DateTime
        comment: String
    }

    extend type Query {
        messages: [Message!]!
        message(id: ID!): Message
        totalMessages: Int!
        messagesPaged(page: DataTablePageInput):MessagePage!
    }

    extend type Mutation {
        createMessage(
            headline: String!
            message: String!
            iconId: String
            icon: String
            sorting: Int!
            comment: String
        ): Message!
        updateMessage(
            id: ID!,
            headline: String!
            message: String!
            iconId: String
            icon: String
            sorting: Int!
            comment: String
        ): Message!
        deleteMessage(
            ids: [ID!]!
        ):DeleteMessagesPayload!
    }

    extend type Subscription {
        messageCreated: Message!,
        messageUpdated: Message!,
        messageDeleted: DeleteMessagesPayload!
    }

    # 👇 Neuer Typ für Pagination und Count
    type MessagePage {
        totalRecords: Int!
        items: [Message!]!
    }

    type DeleteMessagesPayload {
        deleted: [Message!]!
        totalCount: Int!
    }
`

const prisma = new PrismaClient()

export const resolvers = {
    Query:  {
        messages: () =>
            prisma.message.findMany({orderBy: {createdAt: 'desc'}, include: {icon: true}}),

        message: (_: unknown, {id}: { id: string }) =>
            prisma.message.findUnique({where: {id}, include: {icon: true}}),

        messagesPaged: async (_: any, {page}: any) => {
            const {
                first = 0,
                rows = 10,
                sortField,
                sortOrder,
                multiSortMeta,
                filters = {},
            } = page || {}

            // const where: any = {}
            const where = buildPrismaWhere(filters)

            // 🔎 1️⃣ Globale Suche
            if (filters.global?.value) {
                const search = filters.global.value
                where.OR = [
                    {headline: {contains: search, mode: 'insensitive'}},
                    {message: {contains: search, mode: 'insensitive'}},
                    {iconId: {contains: search, mode: 'insensitive'}},
                    {icon: {contains: search, mode: 'insensitive'}},
                    {comment: {contains: search, mode: 'insensitive'}},
                ]
            }

            // ↕️ 3️⃣ Sortierung
            let orderBy: any = {}

            if (Array.isArray(multiSortMeta) && multiSortMeta.length > 0) {
                orderBy = multiSortMeta.map((s) => ({
                    [s.field]: s.order === 1 ? 'asc' : 'desc',
                }))
            } else if (sortField) {
                orderBy = {[sortField]: sortOrder === 1 ? 'asc' : 'desc'}
            }

            console.log('where message: ', where)

            // 📦 4️⃣ Daten + Gesamtanzahl abrufen
            const [totalRecords, items] = await Promise.all([
                prisma.message.count({where}),
                prisma.message.findMany({
                    where,
                    skip: first,
                    take: rows,
                    orderBy,
                    include: {
                        icon: true,   // 🔥 Relation mit abrufen
                    },
                }),
            ])

            return {totalRecords, items}
        },
    },
    Mutation: {
        createMessage: async (_: unknown, args: any, {pubsub}: any) => {
            try {
                const msg = await prisma.message.create({data: args, include: {icon: true}})
                await pubsub.publish('MESSAGE_CREATED', {messageCreated: msg, include: {icon: true}})
                console.log('Message created successfully.', msg)
                return msg
            } catch (error) {
                console.error('❌ Created failed:', error)
                throw new Error('Failed to created Message')
            }

        },
        updateMessage: async (_: any, args: any, {pubsub}: any) => {
            try {
                const msgOld = await prisma.message.findUnique({
                    where: {id: args.id}
                })
                const msgUpdated = await prisma.message.update({
                    where: {id: args.id},
                    data: {
                        headline: args.headline ?? undefined,
                        message: args.message ?? undefined,
                        iconId: args.iconId ?? undefined,
                        sorting: args.sorting ?? undefined,
                        comment: args.comment ?? undefined,
                        updatedAt: new Date(),
                    },
                    include: {
                        icon: true,
                    }
                })
                await pubsub.publish('MESSAGE_UPDATED', {messageUpdated: msgUpdated, include: {icon: true}})
                console.log('Message updated successfully.', msgOld, ' => ', msgUpdated)
                return msgUpdated
            } catch (error) {
                console.error('❌ Updated failed:', error)
                throw new Error('Failed to updated Message')
            }
        },
        deleteMessage: async (_: any, {ids}: { ids: string[] }, {pubsub}: any) => {
            try {
                // Mehrere Datensätze abrufen (für Rückgabe & Events)
                const msgs = await prisma.message.findMany({
                    where: {id: {in: ids}},
                })

                // Löschen aller übergebenen IDs
                await prisma.message.deleteMany({
                    where: {id: {in: ids}},
                })

                // neuen Count berechnen
                const totalCount = await prisma.message.count()

                // Subscription: einzeln broadcasten
                for (const msg of msgs) {
                    await pubsub.publish('MESSAGE_DELETED', {
                        messageDeleted: {deleted: [msg], totalCount},
                    })
                    console.log('Message deleted successfully.', msg)
                }

                return {deleted: msgs, totalCount}

            } catch (error) {
                console.error('❌ Delete failed:', error)
                throw new Error('Failed to delete Message')
            }
        }
    },
    Subscription: {
        messageCreated: {
            subscribe: (_: any, __: any, {pubsub}: any) =>
                pubsub.asyncIterator(['MESSAGE_CREATED']),
        },
        messageUpdated: {
            subscribe: (_: any, __: any, {pubsub}: any) =>
                pubsub.asyncIterator(['MESSAGE_UPDATED']),
        },
        messageDeleted: {
            subscribe: (_: any, __: any, {pubsub}: any) =>
                pubsub.asyncIterator(['MESSAGE_DELETED']),
        },
    },
}