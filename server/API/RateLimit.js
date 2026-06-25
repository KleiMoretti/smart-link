
//RateLimit.js
import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import { redisClient } from "../redisClient.js";


export const RateLimit = ({ windowMs, max, message, prefix = "Request:" }) => {
    return rateLimit({
        windowMs,
        max,
        message,
        standardHeaders: true,
        legacyHeaders: false,

        keyGenerator: (req) => { return `${prefix}${req.user?.uid || ipKeyGenerator(req)}`; },

        store: new RedisStore({
            sendCommand: (...args) => { return redisClient.sendCommand(args) },
            prefix: "",
        }),
    });
};

export const RequestRL = RateLimit({
    windowMs: 1000 * 60 * 5,
    max: 10,
    message: {
        success: false,
        message: "Too many requests, try again later"
    },
    prefix: "Request:"
})