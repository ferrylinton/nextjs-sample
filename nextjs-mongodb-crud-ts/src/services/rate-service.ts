"use server";

import logger from "@/utils/winston";
import { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_IN_SECONDS, REDIS_PREFIX } from "../utils/env-constant";
import redisClient from "../utils/redis";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export const checkRateLimit = async () => {
    const ip = headers().get("x-forwarded-for") ?? "unknown";

    if (!redisClient.isOpen) {
        await redisClient.connect();
    }

    const id = `${REDIS_PREFIX}:${ip}`;
    const count = await redisClient.incr(id);
    logger.info(`requext count for ${ip} is ${count} `)

    if (count === 1) {
        await redisClient.expire(id, RATE_LIMIT_WINDOW_IN_SECONDS);
    }

    if (count > RATE_LIMIT_MAX) {
        redirect("/ratelimiterror")
    }
}