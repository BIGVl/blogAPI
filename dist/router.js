"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    console.log('This is the root route');
    res.json("Hi! You've reached the root route");
});
exports.default = router;
