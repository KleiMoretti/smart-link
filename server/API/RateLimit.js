import rateLimit from "express-rate-limit"

const RateLimit = ({
    windowMS: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: "Too many Reqeust"
    },
    standardHeaders: true,
    legacyHeaders: false,
    ipv6Subnet: 56,
})