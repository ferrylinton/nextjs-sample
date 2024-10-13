import { isTokenValid } from "@/libs/jwt";
import { RATE_LIMIT_WINDOW_IN_SECONDS, REDIS_PREFIX } from "@/utils/env-constant";
import redisClient from "@/utils/redis";
import logger from "@/utils/winston";
import { NextRequest, NextResponse } from "next/server";


export const GET = async () => {
  return Response.json({ message: "Horas..." });
}

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { ip, token } = body;

    const result = await isTokenValid(ip, token);

    if(!result){
      return new NextResponse(JSON.stringify({ message: "invalidToken" }), { status: 401 });
    }

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
    const errorMessage = error.message;
    return new NextResponse(JSON.stringify({errorMessage }), { status: 200 });
  }
};