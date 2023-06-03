"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = require("express-rate-limit");
const apiLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'You have exceeded the maximum requests, try again later.'
});
exports.default = apiLimiter;
