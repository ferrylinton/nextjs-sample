import { RATE_LIMIT_WINDOW_IN_SECONDS, REDIS_PREFIX } from "@/utils/env-constant";
import redisClient from "@/utils/redis";
import logger from "@/utils/winston";
import { NextResponse } from "next/server";


export const GET = async () => {
  return Response.json({ message: "Horas..." });
}

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { ip } = body;

    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

    const id = `${REDIS_PREFIX}:${ip}`;
    const count = await redisClient.incr(id);
    logger.info(`request count for ${ip} is ${count} `)

    if (count === 1) {
      await redisClient.expire(id, RATE_LIMIT_WINDOW_IN_SECONDS);
    }

    return new NextResponse(JSON.stringify({ ip, count }), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in " + error.message, {
      status: 500,
    });
  }
};