import {PrismaClient} from '@prisma/client'
import {buildPrismaWhere} from "./utils/utils.js";

export const typeDefs = /* GraphQL */ `
    type Version {
        id: ID!
        versionNumber: String!
        description: String!
        createdAt: DateTime!
        updatedAt: DateTime
        comment: String
    }

    extend type Query {
        versions: [Version!]!
        version(id: ID!): Version
        versionsPaged(page: DataTablePageInput): VersionPage!
    }

    extend type Mutation {
        createVersion(
            versionNumber: String!
            description: String!
            comment: String
        ): Version!
        updateVersion(
            id: ID!,
            versionNumber: String!
            description: String!
            comment: String
        ): Version!
        deleteVersion(
            ids: [ID!]!
        ): DeleteVersionsPayload!
    }

    extend type Subscription {
        versionCreated: Version!,
        versionUpdated: Version!,
        versionDeleted: DeleteVersionsPayload!
    }

    # 👇 Neuer Typ für Pagination und Count
    type VersionPage {
        totalRecords: Int!
        items: [Version!]!
    }

    type DeleteVersionsPayload {
        deleted: [Version!]!
        totalCount: Int!
    }
`

const prisma = new PrismaClient()

export const resolvers = {
    Query: {
        versions: () =>
            prisma.version.findMany({orderBy: {createdAt: 'desc'}}),

        version: (_: unknown, {id}: { id: string }) =>
            prisma.version.findUnique({where: {id}}),

        versionsPaged: async (_: any, {page}: any) => {
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
                    {versionNumber: {contains: search, mode: 'insensitive'}},
                    {description: {contains: search, mode: 'insensitive'}},
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

            console.log('where version: ', where)

            // 📦 4️⃣ Daten + Gesamtanzahl abrufen
            const [totalRecords, items] = await Promise.all([
                prisma.version.count({where}),
                prisma.version.findMany({
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
        createVersion: async (_: unknown, args: any, {pubsub}: any) => {
            try {
                const version = await prisma.version.create({data: args})
                await pubsub.publish('VERSION_CREATED', {versionCreated: version})
                console.log('Version created successfully.', version)
                return version
            } catch (error) {
                console.error('❌ Created failed:', error)
                throw new Error('Failed to created version')
            }
        },
        updateVersion: async (_: any, args: any, {pubsub}: any) => {
            try {
                const versionOld = await prisma.version.findUnique({
                    where: {id: args.id}
                })
                const versionUpdated = await prisma.version.update({
                    where: {id: args.id},
                    data: {
                        versionNumber: args.versionNumber ?? undefined,
                        description: args.description ?? undefined,
                        comment: args.comment ?? undefined,
                        updatedAt: new Date(),
                    },
                })
                await pubsub.publish('VERSION_UPDATED', {versionUpdated: versionUpdated})
                console.log('Version updated successfully.', versionOld, ' => ', versionUpdated)
                return versionUpdated
            } catch (error) {
                console.error('❌ Updated failed:', error)
                throw new Error('Failed to updated version')
            }
        },
        deleteVersion: async (_: any, {ids}: { ids: string[] }, {pubsub}: any) => {
            try {
                // Mehrere Datensätze abrufen (für Rückgabe & Events)
                const versions = await prisma.version.findMany({
                    where: {id: {in: ids}},
                })

                // Löschen aller übergebenen IDs
                await prisma.version.deleteMany({
                    where: {id: {in: ids}},
                })

                // neuen Count berechnen
                const totalCount = await prisma.version.count()

                // Subscription: einzeln broadcasten
                for (const v of versions) {
                    await pubsub.publish('VERSION_DELETED', {
                        versionDeleted: {deleted: [v], totalCount},
                    })
                    console.log('General deleted successfully.', v)
                }

                return {deleted: versions, totalCount}

            } catch (error) {
                console.error('❌ Delete failed:', error)
                throw new Error('Failed to version generals')
            }
        },
    },
    Subscription: {
        versionCreated: {
            subscribe: (_: any, __: any, {pubsub}: any) =>
                pubsub.asyncIterator(['VERSION_CREATED']),
        },
        versionUpdated: {
            subscribe: (_: any, __: any, {pubsub}: any) =>
                pubsub.asyncIterator(['VERSION_UPDATED']),
        },
        versionDeleted: {
            subscribe: (_: any, __: any, {pubsub}: any) =>
                pubsub.asyncIterator(['VERSION_DELETED']),
        }
    },
}