import Redis from "ioredis";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { NextRequest, NextResponse } from "next/server";

const redis = new Redis(process.env.REDIS_URL!);

const limiters = {
    contact: new RateLimiterRedis({
        storeClient: redis,
        keyPrefix: "rate_limit:contact",
        points: 5,
        duration: 30,
    }),
    subscriber: new RateLimiterRedis({
        storeClient: redis,
        keyPrefix: "rate_limit:subscriber",
        points: 5,
        duration: 30,
    }),
    property_enquiry: new RateLimiterRedis({
        storeClient: redis,
        keyPrefix: "rate_limit:property_enquiry",
        points: 5,
        duration: 30,
    }),
};

type LimitType = keyof typeof limiters;

export async function checkRateLimit(request: NextRequest, type: LimitType) {
    const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    
    try {
        await limiters[type].consume(ip);
        return null;
    } catch (error: unknown) {
        const rateLimitError = error as {msBeforeNext?: number};
        
        if (typeof rateLimitError?.msBeforeNext === "number") {
            return NextResponse.json({
                error: JSON.stringify([{
                    msg: "Too many requests. Please try again later.",
                }]),
            },
            { status: 429 });
        }
        
        return NextResponse.json(
            { success: false, msg: "Service temporarily unavailable." },
            { status: 503 }
        )
    }
}