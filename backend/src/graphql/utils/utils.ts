import type {DataTableFilters, PrismaWhere} from "../types/DataTableTypes.js"

/**
 * Datum „normalisieren“ (Uhrzeit auf 00:00:00 setzen)
 * @param dateStr
 */
function normalizeDate(dateStr: string | number) {
    const d = new Date(dateStr)
    d.setHours(0, 0, 0, 0)
    return d
}

/**
 * Zusammensetzen der Filter
 * @param filters
 */
export const buildPrismaWhere = (filters: DataTableFilters = {}): PrismaWhere => {
    const where: PrismaWhere = {}

    if (!filters) return where

    for (const [field, filter] of Object.entries(filters)) {
        if (field === "global") continue
        if (!filter?.value) continue

        const value = filter.value
        const mode = 'insensitive'

        switch (filter.matchMode) {
            case 'startsWith':
                where[field] = {startsWith: value, mode}
                break
            case 'endsWith':
                where[field] = {endsWith: value, mode}
                break
            case 'contains':
                where[field] = {contains: value, mode}
                break
            case 'equals':
                where[field] = {equals: value, mode}
                break
            case 'notEquals':
                where[field] = {not: value, mode}
                break
            case 'in':
                where[field] = {in: Array.isArray(value) ? value : [value]}
                break
            case 'lt':
                where[field] = {lt: value}
                break
            case 'gt':
                where[field] = {gt: value}
                break
            case 'lte':
                where[field] = {lte: value}
                break
            case 'gte':
                where[field] = {gte: value}
                break
            case 'dateIs':
                { const date = normalizeDate(value)
                where[field] = {
                    gte: date,
                    lt: new Date(date.getTime() + 24 * 60 * 60 * 1000), // nächster Tag
                }
                break }
            case 'dateIsNot':
                where[field] = {not: new Date(value)}
                break
            case 'dateBefore':
                where[field] = {lt: new Date(value)}
                break
            case 'dateAfter':
                where[field] = {gt: new Date(value)}
                break
            default:
                where[field] = {contains: value, mode}
        }
    }

    return where
}
