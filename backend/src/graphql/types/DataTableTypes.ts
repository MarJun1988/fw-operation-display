// Ein einzelner Filter (ein Feld)
export interface FilterMetaInput {
    value?: string | number | null
    matchMode?: string
}

// Alle Filter in PrimeVue
export interface DataTableFilters {
    global?: FilterMetaInput
    [field: string]: FilterMetaInput | undefined
}

// Paginierung / Sortierung / Filter der DataTable
export interface DataTablePageInput {
    first?: number
    rows?: number
    sortField?: string
    sortOrder?: number
    multiSortMeta?: any
    filters?: DataTableFilters
}

export type PrismaWhere = Record<string, any>