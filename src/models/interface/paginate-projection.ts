export interface PaginateProjection {
    content: any[],
    first: number,
    last: number,
    isFirstPage: boolean,
    isLastPage: boolean,
    pageNumber: number,
    pageSize: number,
    totalElements: number
}