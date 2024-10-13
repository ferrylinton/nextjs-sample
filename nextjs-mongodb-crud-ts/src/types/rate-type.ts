export type RateLimitResponse = {
    status: number,
    ip?: string,
    count?: number,
    errorMessage?: string
}