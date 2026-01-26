import {PrismaClient} from '@prisma/client'
import {buildPrismaWhere} from "./utils/utils.js";

export const typeDefs = /* GraphQL */ `
    type IncomingAlert {
        id: ID!
        address: String!
        text: String!
        createdAt: DateTime!
        updatedAt: DateTime
        comment: String
    }

    extend type Query {
        incomingAlerts: [IncomingAlert!]!
        incomingAlert(id: ID!): IncomingAlert
        totalIncomingAlerts: Int!
        incomingAlertsPaged(page: DataTablePageInput):IncomingAlertPage!
    }

    extend type Mutation {
        createIncomingAlert(
            address: String!
            text: String!
            comment: String
        ): IncomingAlert!
        updateIncomingAlert(
            id: ID!,
            address: String,
            text: String,
            comment: String
        ): IncomingAlert
        deleteIncomingAlert(
            ids: [ID!]!
        ): DeleteIncomingAlertsPayload!
    }

    extend type Subscription {
        incomingAlertCreated: IncomingAlert!,
        incomingAlertUpdated: IncomingAlert!,
        incomingAlertDeleted: DeleteIncomingAlertsPayload!
    }

    # 👇 Neuer Typ für Pagination und Count
    type IncomingAlertPage {
        totalRecords: Int!
        items: [IncomingAlert!]!
    }

    type DeleteIncomingAlertsPayload {
        deleted: [IncomingAlert!]!
        totalCount: Int!
    }
`

const prisma = new PrismaClient()

export const resolvers = {
    Query: {
        incomingAlerts: () =>
            prisma.incomingAlert.findMany({orderBy: {createdAt: 'desc'}}),

        incomingAlert: (_: unknown, {id}: { id: string }) =>
            prisma.incomingAlert.findUnique({where: {id}}),

        incomingAlertsPaged: async (_: any, {page}: any) => {
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
                    {text: {contains: search, mode: 'insensitive'}},
                    {address: {contains: search, mode: 'insensitive'}},
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

            console.log('where incomingAlert: ', where)

            // 📦 4️⃣ Daten + Gesamtanzahl abrufen
            const [totalRecords, items] = await Promise.all([
                prisma.incomingAlert.count({where}),
                prisma.incomingAlert.findMany({
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
        createIncomingAlert: async (_: unknown, args: any, {pubsub}: any) => {
            try {
                const alert = await prisma.incomingAlert.create({data: args})
                await pubsub.publish('INCOMING_ALERT_CREATED', {incomingAlertCreated: alert})
                console.log('Alert created successfully.', alert)
                return alert
            } catch (error) {
                console.error('❌ Created failed:', error)
                throw new Error('Failed to created alert')
            }
        },
        updateIncomingAlert: async (_: any, args: any, {pubsub}: any) => {
            try {
                const alertIdOld = await prisma.incomingAlert.findUnique({
                    where: {id: args.id}
                })
                const incomingAlertUpdated = await prisma.incomingAlert.update({
                    where: {id: args.id},
                    data: {
                        text: args.text ?? undefined,
                        address: args.address ?? undefined,
                        comment: args.comment ?? undefined,
                        updatedAt: new Date(),
                    },
                })
                await pubsub.publish('INCOMING_ALERT_UPDATED', {incomingAlertUpdated: incomingAlertUpdated})
                console.log('Alert updated successfully.', alertIdOld, ' => ', incomingAlertUpdated)
                return incomingAlertUpdated
            } catch (error) {
                console.error('❌ Updated failed:', error)
                throw new Error('Failed to updated alert')
            }
        },
        deleteIncomingAlert: async (_: any, {ids}: { ids: string[] }, {pubsub}: any) => {
            try {
                // Mehrere Datensätze abrufen (für Rückgabe & Events)
                const incomingAlerts = await prisma.incomingAlert.findMany({
                    where: {id: {in: ids}},
                })

                // Löschen aller übergebenen IDs
                await prisma.incomingAlert.deleteMany({
                    where: {id: {in: ids}},
                })

                // neuen Count berechnen
                const totalCount = await prisma.incomingAlert.count()

                // Subscription: einzeln broadcasten
                for (const a of incomingAlerts) {
                    await pubsub.publish('INCOMING_ALERT_DELETED', {
                        incomingAlertDeleted: {deleted: [a], totalCount},
                    })
                    console.log('Alert deleted successfully.', a)
                }

                return {deleted: incomingAlerts, totalCount}

            } catch (error) {
                console.error('❌ Delete failed:', error)
                throw new Error('Failed to delete alert')
            }
        }
    },
    Subscription: {
        incomingAlertCreated: {
            subscribe: (_: any, __: any, {pubsub}: any) =>
                pubsub.asyncIterator(['INCOMING_ALERT_CREATED']),
        },
        incomingAlertUpdated: {
            subscribe: (_: any, __: any, {pubsub}: any) =>
                pubsub.asyncIterator(['INCOMING_ALERT_UPDATED']),
        },
        incomingAlertDeleted: {
            subscribe: (_: any, __: any, {pubsub}: any) =>
                pubsub.asyncIterator(['INCOMING_ALERT_DELETED']),
        },
    },
}