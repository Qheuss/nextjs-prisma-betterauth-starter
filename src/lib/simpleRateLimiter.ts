import { NextRequest, NextResponse } from 'next/server';
import { logger } from './logger';

const rateLimitMap = new Map();

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  identifier: string;
}

interface RateLimitResult {
  success: boolean;
  headers: Headers;
  response?: NextResponse;
  currentRequests?: number;
  remainingRequests?: number;
}

const defaultConfig: RateLimitConfig = {
  maxRequests: 10,
  windowMs: 60 * 1000, // 1 minute
  identifier: 'default',
};

export async function rateLimit(
  req: NextRequest | Request | undefined,
  config: Partial<RateLimitConfig> = {},
): Promise<RateLimitResult> {
  const { maxRequests, windowMs, identifier } = {
    ...defaultConfig,
    ...config,
  };

  if (!req) {
    return {
      success: false,
      headers: new Headers(),
      response: NextResponse.json(
        { error: 'Missing request object.' },
        { status: 400 },
      ),
    };
  }

  const ip =
    req.headers.get('x-forwarded-for') ||
    req.headers.get('x-real-ip') ||
    'unknown';

  const key = `rate-limit:${identifier}:${ip}`;
  const now = Date.now();

  return inMemoryRateLimit(key, now, windowMs, maxRequests, identifier, ip);
}

function inMemoryRateLimit(
  key: string,
  now: number,
  windowMs: number,
  maxRequests: number,
  identifier: string,
  ip: string,
): RateLimitResult {
  const rateData = rateLimitMap.get(key) || {
    count: 0,
    resetTime: now + windowMs,
  };

  if (now > rateData.resetTime) {
    rateData.count = 1;
    rateData.resetTime = now + windowMs;
  } else {
    rateData.count += 1;
  }

  rateLimitMap.set(key, rateData);

  const remainingTimeMs = Math.max(0, rateData.resetTime - now);
  const remainingTimeSec = Math.ceil(remainingTimeMs / 1000);

  const headers = new Headers();
  headers.set('X-RateLimit-Limit', maxRequests.toString());
  headers.set(
    'X-RateLimit-Remaining',
    Math.max(0, maxRequests - rateData.count).toString(),
  );
  headers.set('X-RateLimit-Reset', remainingTimeSec.toString());

  if (rateData.count > maxRequests) {
    logger.warn(
      `In-memory rate limit exceeded: IP=${ip}, identifier=${identifier}, requests=${rateData.count}, max=${maxRequests}`,
    );

    headers.set('Retry-After', remainingTimeSec.toString());
    return {
      success: false,
      headers,
      response: NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers },
      ),
    };
  }

  return {
    success: true,
    headers,
    currentRequests: rateData.count,
    remainingRequests: Math.max(0, maxRequests - rateData.count),
  };
}

// Clean up older entries every hour to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, data] of rateLimitMap.entries()) {
      if (now > data.resetTime + 3600000) {
        // Keep for an hour after expiry
        rateLimitMap.delete(key);
      }
    }
  }, 3600000); // Run every hour
}
