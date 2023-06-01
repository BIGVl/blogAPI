"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCommentToDelete = exports.validateCommentBody = void 0;
const express_validator_1 = require("express-validator");
exports.validateCommentBody = [
    (0, express_validator_1.body)('author', 'The name cannot be longer than 20 characters').trim().isLength({ min: 2, max: 20 }).escape(),
    (0, express_validator_1.param)('commentId').trim().escape(),
    (0, express_validator_1.body)('content', 'The content needs to be between 3 to 2000 characters long').trim().isLength({ min: 3, max: 2000 }).escape(),
    (0, express_validator_1.body)('parentComment').optional().trim().escape()
];
exports.validateCommentToDelete = [
    (0, express_validator_1.body)('authorId', 'The authorId is required').exists().escape(),
    (0, express_validator_1.param)('commentId', 'The id of the comment is missing').exists().escape()
];
