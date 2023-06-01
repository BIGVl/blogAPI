"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    title: String,
    createdAt: Date,
    content: String,
    published: Boolean,
    lastUpdate: Date,
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Comment' }]
});
const Article = (0, mongoose_1.model)('Article', schema);
exports.default = Article;
