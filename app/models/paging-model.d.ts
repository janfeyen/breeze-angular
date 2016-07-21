export interface PagedResult<T> {
    inlineCount: number;
    results: Array<T>;
}

export interface Filter {
    matchMode: string;
    value: string;
}