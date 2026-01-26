import {PrismaClient} from '@prisma/client'
import {buildPrismaWhere} from "./utils/utils.js";

export const typeDefs = /* GraphQL */ `
    scalar DateTime
    scalar JSON
    
    type General {
        id: ID!
        name: String!
        value: String!
        sorting: Int!
        createdAt: DateTime!
        updatedAt: DateTime
        comment: String
    }

    extend type Query {
        generals: [General!]!
        general(id: ID!): General
        generalsPaged(page: DataTablePageInput): GeneralPage!
    }

    extend type Mutation {
        createGeneral(
            name: String!
            value: String!
            sorting: Int!
            comment: String
        ): General!
        updateGeneral(
            id: ID!,
            name: String!
            value: String!
            sorting: Int!
            comment: String
        ): General!
        deleteGeneral(
            ids: [ID!]!
        ): DeleteGeneralsPayload!
    }

    extend type Subscription {
        generalCreated: General!,
        generalUpdated: General!,
        generalDeleted: DeleteGeneralsPayload!
    }

    # 👇 Neuer Typ für Pagination und Count
    type GeneralPage {
        totalRecords: Int!
        items: [General!]!
    }

    type DeleteGeneralsPayload {
        deleted: [General!]!
        totalCount: Int!
    }


    # 🔽 Input-Typ für PrimeVue DataTable Lazy Loading
    input DataTablePageInput {
        first: Int
        rows: Int
        page: Int
        pageCount: Int
        sortField: String
        sortOrder: Int
        multiSortMeta: [SortMetaInput]
        filters: JSON
        originalEvent: JSON
        #        first: Int          # Startindex
        #        rows: Int           # Anzahl Zeilen pro Seite
        #        sortField: String   # Einzelfeldsortierung
        #        sortOrder: Int      # 1 = ASC, -1 = DESC
        #        multiSortMeta: [SortMetaInput] # für Multi-Sortierung
        #        filters: JSON       # komplexe Filterstruktur
    }

    # 🔽 Multi-Sort-Input (wie PrimeVue multiSortMeta)
    input SortMetaInput {
        field: String!
        order: Int!
    }

`

const prisma = new PrismaClient()

export const resolvers = {
    Query: {
        generals: () =>
            prisma.general.findMany({orderBy: {name: 'desc'}}),

        general: (_: unknown, {id}: { id: string }) =>
            prisma.general.findUnique({where: {id}}),

        generalsPaged: async (_: any, {page}: any) => {
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
                    {name: {contains: search, mode: 'insensitive'}},
                    {value: {contains: search, mode: 'insensitive'}},
                    {comment: {contains: search, mode: 'insensitive'}},
                ]
            }

            // ↕️ 3️⃣ Sortierung
            let orderBy: any = {sorting: 'asc'}

            if (Array.isArray(multiSortMeta) && multiSortMeta.length > 0) {
                orderBy = multiSortMeta.map((s) => ({
                    [s.field]: s.order === 1 ? 'asc' : 'desc',
                }))
            } else if (sortField) {
                orderBy = {[sortField]: sortOrder === 1 ? 'asc' : 'desc'}
            }

            console.log('where general: ', where)

            // 📦 4️⃣ Daten + Gesamtanzahl abrufen
            const [totalRecords, items] = await Promise.all([
                prisma.general.count({where}),
                prisma.general.findMany({
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
        createGeneral: async (_: unknown, args: any, {pubsub}: any) => {
            try {
                const general = await prisma.general.create({data: args})
                await pubsub.publish('GENERAL_CREATED', {generalCreated: general})
                console.log('General created successfully.', general)
                return general
            } catch (error) {
                console.error('❌ Created failed:', error)
                throw new Error('Failed to created general')
            }
        },
        updateGeneral: async (_: any, args: any, {pubsub}: any) => {
            try {
                const generalOld = await prisma.general.findUnique({
                    where: {id: args.id}
                })
                const generalUpdated = await prisma.general.update({
                    where: {id: args.id},
                    data: {
                        name: args.name ?? undefined,
                        value: args.value ?? undefined,
                        sorting: args.sorting ?? undefined,
                        comment: args.comment ?? undefined,
                        updatedAt: new Date(),
                    },
                })
                await pubsub.publish('GENERAL_UPDATED', {generalUpdated: generalUpdated})
                console.log('General updated successfully.', generalOld, ' => ', generalUpdated)
                return generalUpdated
            } catch (error) {
                console.error('❌ Updated failed:', error)
                throw new Error('Failed to updated generals')
            }
        },
        deleteGeneral: async (_: any, {ids}: { ids: string[] }, {pubsub}: any) => {
            try {
                // Mehrere Datensätze abrufen (für Rückgabe & Events)
                const generals = await prisma.general.findMany({
                    where: {id: {in: ids}},
                })

                // Löschen aller übergebenen IDs
                await prisma.general.deleteMany({
                    where: {id: {in: ids}},
                })

                // neuen Count berechnen
                const totalCount = await prisma.general.count()

                // Subscription: einzeln broadcasten
                for (const g of generals) {
                    await pubsub.publish('GENERAL_DELETED', {
                        generalDeleted: {deleted: [g], totalCount},
                    })
                    console.log('General deleted successfully.', g)
                }

                return {deleted: generals, totalCount}

            } catch (error) {
                console.error('❌ Delete failed:', error)
                throw new Error('Failed to delete generals')
            }
        },
    },
    Subscription: {
        generalCreated: {
            subscribe: (_: any, __: any, {pubsub}: any) =>
                pubsub.asyncIterator(['GENERAL_CREATED']),
        },
        generalUpdated: {
            subscribe: (_: any, __: any, {pubsub}: any) =>
                pubsub.asyncIterator(['GENERAL_UPDATED']),
        },
        generalDeleted: {
            subscribe: (_: any, __: any, {pubsub}: any) =>
                pubsub.asyncIterator(['GENERAL_DELETED']),
        }
    },
}