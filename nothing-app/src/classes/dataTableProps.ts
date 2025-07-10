export type SortItem = {
  key: string
  order?: boolean | 'asc' | 'desc'
}
export type DataTableCompareFunction<T = any> = (a: T, b: T) => number
export type SelectItemKey =
  | boolean
  | string
  | (string | number)[]
  | ((item: Record<string, any>, fallback?: any) => any)

export type DataTableHeader = {
  key: string
  value?: SelectItemKey
  title: string
  colspan?: number
  rowspan?: number
  fixed?: boolean
  align?: 'start' | 'end'
  width?: number
  minWidth?: string
  maxWidth?: string
  sortable?: boolean
  checked?: boolean
  toggleable?: boolean
  searchable?: boolean
  sort?: DataTableCompareFunction
}

export interface dataTableProps {
  submittedFilters?: boolean
  totalFilters: number
  hasCreate?: boolean
  hasSearchBy?: boolean
  headers: Array<DataTableHeader>
  icon?: string
  items: Array<any>
  loading?: boolean
  modelValue: string
  showToolbar?: boolean
  searchBy?: string
  sortBy?: Array<SortItem>
  subtitle?: string | undefined
  title?: string | undefined
}
