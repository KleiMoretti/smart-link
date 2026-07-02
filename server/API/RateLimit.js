// RateLimit.js
import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import { redisClient } from "../redisClient.js";


export const RateLimit = ({ windowMs, max, message, prefix, failOpen = true, }) => {

    if (!prefix) {
        throw new Error("RateLimit: a unique 'prefix' is required to avoid key collisions between limiters");
    }

    return rateLimit({
        windowMs,
        max,
        message,
        standardHeaders: true,
        legacyHeaders: false,
        keyGenerator: (req) => {
            return `${prefix}${req.user?.uid || ipKeyGenerator(req)}`;
        },
        store: new RedisStore({
            sendCommand: async (...args) => {
                try {
                    return await redisClient.sendCommand(args);
                } catch (err) {
                    if (failOpen) {

                        console.error("[RateLimit] Redis error, failing open:", err.message);

                        return null;
                    }
                    throw err;
                }
            },
            prefix: "",
        }),
    });
};

export const RequestRL = RateLimit({
    windowMs: 1000 * 60 * 20,
    max: 30,
    message: {
        success: false,
        message: "Too many requests, try again later",
    },
    prefix: "Request:",
});