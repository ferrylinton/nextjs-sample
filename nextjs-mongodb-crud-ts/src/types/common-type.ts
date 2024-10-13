export type WithError<T> = {
    errorMessage?: string
} & T;

export type FindResult<T> = {
    todoes?: T[],
    total?: number,
    errorMessage?: string
}
