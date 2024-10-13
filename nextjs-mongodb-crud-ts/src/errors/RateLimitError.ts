export class RateLimitError extends Error {

    constructor() {
        super("tooManyRequest");

        Object.setPrototypeOf(this, RateLimitError.prototype);
    }
}