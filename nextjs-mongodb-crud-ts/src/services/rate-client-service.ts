import { RateLimitResponse } from "@/types/rate-type";
import { RATE_LIMIT_MAX } from "@/utils/env-constant";

export const isExceedRateLimit = async (ip: string) => {

    const response = await fetch(`${process.env.BASE_URL}/api/ratelimit`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ip })
    });

    const data: RateLimitResponse = await response.json();

    if (!data || data.ip !== ip || data.count > RATE_LIMIT_MAX) {
        return true;
    } else {
        return false;
    }
}