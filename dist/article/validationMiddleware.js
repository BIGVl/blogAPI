"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIdParam = exports.validateGetArticles = exports.validateTransformationOfArticle = void 0;
const express_validator_1 = require("express-validator");
exports.validateTransformationOfArticle = [
    (0, express_validator_1.body)('title', 'Title must be at least 3 characters long.').trim().isLength({ min: 3 }).escape(),
    (0, express_validator_1.body)('createdAt').trim().exists().escape(),
    (0, express_validator_1.body)('content', 'The article must be at least 100 characters long.').trim().isLength({ min: 100 }).escape(),
    (0, express_validator_1.body)('published').trim().exists().escape()
];
exports.validateGetArticles = [
    (0, express_validator_1.query)('page').optional().trim().escape().isInt().withMessage('The page must be a integer.'),
    (0, express_validator_1.query)('pageSize').optional().trim().escape().isInt().withMessage('The page must be a integer.'),
    (0, express_validator_1.query)('sort').optional().trim().isIn(['asc', 'desc']).withMessage('Sort must be "asc" or "desc".').escape(),
    (0, express_validator_1.query)('before').optional().trim().isDate().escape(),
    (0, express_validator_1.query)('after').optional().trim().isDate().escape()
];
exports.validateIdParam = [(0, express_validator_1.param)('articleId').escape()];
