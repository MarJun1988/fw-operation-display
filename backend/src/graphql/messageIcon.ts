import {PrismaClient} from '@prisma/client'
import {buildPrismaWhere} from "./utils/utils.js";

export const typeDefs = /* GraphQL */ `
    type MessageIcon {
        id: ID!
        name: String!
        path: String!
        Message: [Message]
        createdAt: DateTime!
        updatedAt: DateTime
        comment: String
    }

    extend type Query {
        messageIcons: [MessageIcon!]!
        messageIcon(id: ID!): MessageIcon
        totalMessageIcons: Int!
        messageIconsPaged(page: DataTablePageInput):MessageIconPage!
    }

    extend type Mutation {
        createMessageIcon(
            name: String!
            path: String!
            comment: String
        ): MessageIcon!
        updateMessageIcon(
            id: ID!,
            name: String!
            path: String!
            comment: String
        ): MessageIcon!
        deleteMessageIcon(
            ids: [ID!]!
        ): DeleteMessageIconsPayload
    }

    extend type Subscription {
        messageIconCreated: MessageIcon!,
        messageIconUpdated: MessageIcon!,
        messageIconDeleted: DeleteMessageIconsPayload!
    }

    # 👇 Neuer Typ für Pagination und Count
    type MessageIconPage {
        totalRecords: Int!
        items: [MessageIcon!]!
    }

    type DeleteMessageIconsPayload {
        deleted: [MessageIcon!]!
        totalCount: Int!
    }
`

const prisma = new PrismaClient()

export const resolvers = {
    Query: {
        messageIcons: () =>
            prisma.messageIcon.findMany({orderBy: {createdAt: 'desc'}}),

        messageIcon: (_: unknown, {id}: { id: string }) =>
            prisma.messageIcon.findUnique({where: {id}}),

        messageIconsPaged: async (_: any, {page}: any) => {
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
                    {name: {contains: search, mode: 'insensitive'}},
                    {path: {contains: search, mode: 'insensitive'}},
                    {comment: {contains: search, mode: 'insensitive'}},
                ]
            }

            // ↕️ 3️⃣ Sortierung
            let orderBy: any = {createdAt: 'desc'}

            if (Array.isArray(multiSortMeta) && multiSortMeta.length > 0) {
                orderBy = multiSortMeta.map((s) => ({
                    [s.field]: s.order === 1 ? 'asc' : 'desc',
                }))
            } else if (sortField) {
                orderBy = {[sortField]: sortOrder === 1 ? 'asc' : 'desc'}
            }

            console.log('where messageIcon: ', where)

            // 📦 4️⃣ Daten + Gesamtanzahl abrufen
            const [totalRecords, items] = await Promise.all([
                prisma.messageIcon.count({where}),
                prisma.messageIcon.findMany({
                    where,
                    skip: first,
                    take: rows,
                    orderBy,
                }),
            ])

            return {totalRecords, items}
        },
    },
    Mutation: {
        createMessageIcon: async (_: unknown, args: any, {pubsub}: any) => {
            try {
                const msgIcon = await prisma.messageIcon.create({data: args})
                await pubsub.publish('MESSAGE_ICON_CREATED', {messageIconCreated: msgIcon})
                console.log('MessageIcon created successfully.', msgIcon)
                return msgIcon;
            } catch (error) {
                console.error('❌ Created failed:', error)
                // console.error("❌ Prisma Error:", error.meta ?? error)
                // throw error   // gib den echten Fehler zurück
                throw new Error('Failed to created MessageIcon')
            }
        },
        updateMessageIcon: async (_: any, args: any, {pubsub}: any) => {
            try {
                const msgIconOld = await prisma.messageIcon.findUnique({
                    where: {id: args.id}
                })
                const msgIconUpdated = await prisma.messageIcon.update({
                    where: {id: args.id},
                    data: {
                        name: args.name ?? undefined,
                        path: args.path ?? undefined,
                        comment: args.comment ?? undefined,
                        updatedAt: new Date(),
                    },
                })
                await pubsub.publish('MESSAGE_ICON_UPDATED', {messageIconUpdated: msgIconUpdated})
                console.log('MessageIcon updated successfully.', msgIconOld, ' => ', msgIconUpdated)
                return msgIconUpdated
            } catch (error) {
                console.error('❌ Updated failed:', error)
                throw new Error('Failed to updated MessageIcon')
            }
        },
        deleteMessageIcon: async (_: any, {ids}: { ids: string[] }, {pubsub}: any) => {
            try {
                // Mehrere Datensätze abrufen (für Rückgabe & Events)
                const msgIcons = await prisma.messageIcon.findMany({
                    where: {id: {in: ids}},
                })

                // Löschen aller übergebenen IDs
                await prisma.messageIcon.deleteMany({
                    where: {id: {in: ids}},
                })

                // neuen Count berechnen
                const totalCount = await prisma.messageIcon.count()

                // Subscription: einzeln broadcasten
                for (const msgIcon of msgIcons) {
                    await pubsub.publish('MESSAGE_ICON_DELETED', {
                        messageIconDeleted: {deleted: [msgIcon], totalCount},
                    })
                    console.log('Message Icon deleted successfully.', msgIcon)
                }

                return {deleted: msgIcons, totalCount}
            } catch (error) {
                console.error('❌ Delete failed:', error)
                throw new Error('Failed to delete Message Icon')
            }
        },

    },
    Subscription: {
        messageIconCreated: {
            subscribe: (_: any, __: any, {pubsub}: any) =>
                pubsub.asyncIterator(['MESSAGE_ICON_CREATED']),
        },
        messageIconUpdated: {
            subscribe: (_: any, __: any, {pubsub}: any) =>
                pubsub.asyncIterator(['MESSAGE_ICON_UPDATED']),
        },
        messageIconDeleted: {
            subscribe: (_: any, __: any, {pubsub}: any) =>
                pubsub.asyncIterator(['MESSAGE_ICON_DELETED']),
        },
    },
}