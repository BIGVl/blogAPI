"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    author: String,
    authorId: String,
    createdAt: Date,
    content: String,
    //We create the properties parentComment and children so each comment can be also commented on
    parentComment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    }
});
const Comment = (0, mongoose_1.model)('Comment', schema);
exports.default = Comment;
