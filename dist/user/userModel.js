"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    isAdmin: Number
});
schema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});
const User = (0, mongoose_1.model)('User', schema);
exports.default = User;
