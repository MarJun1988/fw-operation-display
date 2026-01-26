import {PrismaClient} from '@prisma/client'
import {buildPrismaWhere} from "./utils/utils.js";

export const typeDefs = /* GraphQL */ `
    type SiteStyle {
        id: ID!
        name: String!
        description: String!
        htmlStyle: String
        htmlClass: String
        sorting: Int!
        createdAt: DateTime!
        updatedAt: DateTime
        comment: String
    }

    extend type Query {
        siteStyles: [SiteStyle!]!
        siteStyle(id: ID!): SiteStyle
        siteStylesPaged(page: DataTablePageInput):SiteStylePage!
    }

    extend type Mutation {
        createSiteStyle(
            name: String!
            description: String!
            htmlStyle: String
            htmlClass: String
            sorting: Int!
            comment: String
        ): SiteStyle!
        updateSiteStyle(
            id: ID!,
            name: String!
            description: String!
            htmlStyle: String
            htmlClass: String
            sorting: Int!
            comment: String
        ): SiteStyle!
        deleteSiteStyle(
            ids: [ID!]!
        ): DeleteSiteStylesPayload!
    }

    extend type Subscription {
        siteStyleCreated: SiteStyle!,
        siteStyleUpdated: SiteStyle!,
        siteStyleDeleted: DeleteSiteStylesPayload!
    }

    # 👇 Neuer Typ für Pagination und Count
    type SiteStylePage {
        totalRecords: Int!
        items: [SiteStyle!]!
    }

    type DeleteSiteStylesPayload {
        deleted: [SiteStyle!]!
        totalCount: Int!
    }
`

const prisma = new PrismaClient()

export const resolvers = {
    Query: {
        siteStyles: () =>
            prisma.siteStyle.findMany({orderBy: {sorting: 'asc'}}),

        siteStyle: (_: unknown, {id}: { id: string }) =>
            prisma.siteStyle.findUnique({where: {id}}),

        siteStylesPaged: async (_: any, {page}: any) => {
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
                    {description: {contains: search, mode: 'insensitive'}},
                    {htmlStyle: {contains: search, mode: 'insensitive'}},
                    {htmlClass: {contains: search, mode: 'insensitive'}},
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
                prisma.siteStyle.count({where}),
                prisma.siteStyle.findMany({
                    where,
                    skip: first,
                    take: rows,
                    orderBy,
                }),
            ])

            return {totalRecords, items}
        }
    },
    Mutation: {
        createSiteStyle: async (_: unknown, args: any, {pubsub}: any) => {
            try {
                const style = await prisma.siteStyle.create({data: args})
                await pubsub.publish('SITE_STYLE_CREATED', {siteStyleCreated: style, include: {icon: true}})
                console.log('Site Style created successfully.', style)
                return style
            } catch (error) {
                console.error('❌ Created failed:', error)
                throw new Error('Failed to created Site Style')
            }
        },
        updateSiteStyle: async (_: unknown, args: any, {pubsub}: any) => {
            try {
                const styleOld = await prisma.siteStyle.findUnique({
                    where: {id: args.id}
                })
                const styleUpdated = await prisma.siteStyle.update({
                    where: {id: args.id},
                    data: {
                        name: args.name ?? undefined,
                        description: args.description ?? undefined,
                        htmlStyle: args.htmlStyle ?? undefined,
                        htmlClass: args.htmlClass ?? undefined,
                        sorting: args.sorting ?? undefined,
                        comment: args.comment ?? undefined,
                        updatedAt: new Date(),
                    }
                })
                await pubsub.publish('SITE_STYLE_UPDATED', {siteStyleUpdated: styleUpdated})
                console.log('Site Style updated successfully.', styleOld, ' => ', styleUpdated)
                return styleUpdated
            } catch (error) {
                console.error('❌ Updated failed:', error)
                throw new Error('Failed to updated Site Style')
            }
        },
        deleteSiteStyle: async (_: any, {ids}: { ids: string[] }, {pubsub}: any) => {
            try {
                // Mehrere Datensätze abrufen (für Rückgabe & Events)
                const styles = await prisma.siteStyle.findMany({
                    where: {id: {in: ids}},
                })

                // Löschen aller übergebenen IDs
                await prisma.siteStyle.deleteMany({
                    where: {id: {in: ids}},
                })

                // neuen Count berechnen
                const totalCount = await prisma.siteStyle.count()

                // Subscription: einzeln broadcasten
                for (const style of styles) {
                    await pubsub.publish('SITE_STYLE_DELETED', {
                        siteStyleDeleted: {deleted: [style], totalCount},
                    })
                    console.log('Site Style deleted successfully.', style)
                }

                return {deleted: styles, totalCount}

            } catch (error) {
                console.error('❌ Delete failed:', error)
                throw new Error('Failed to delete Site Style')
            }
        },
    },
    Subscription: {
        siteStyleCreated: {
            subscribe: (_: any, __: any, {pubsub}: any) =>
                pubsub.asyncIterator(['SITE_STYLE_CREATED']),
        },
        siteStyleUpdated: {
            subscribe: (_: any, __: any, {pubsub}: any) =>
                pubsub.asyncIterator(['SITE_STYLE_UPDATED']),
        },
        siteStyleDeleted: {
            subscribe: (_: any, __: any, {pubsub}: any) =>
                pubsub.asyncIterator(['SITE_STYLE_DELETED']),
        },
    },
}