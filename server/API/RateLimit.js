import rateLimit from "express-rate-limit"

export const RateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: "Too many Reqeust Wait 15 minutes"
    },
    standardHeaders: true,
    legacyHeaders: false,
    ipv6Subnet: 56,
})