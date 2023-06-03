"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const articleController_1 = require("./articleController");
const passport_1 = __importDefault(require("passport"));
const validationMiddleware_1 = require("./validationMiddleware");
const confirmValidation_1 = __importDefault(require("../middleware/confirmValidation"));
const articleRouter = (0, express_1.Router)();
//Protected routes
articleRouter.post('/', passport_1.default.authenticate('jwt', { session: false }), validationMiddleware_1.validateTransformationOfArticle, confirmValidation_1.default, articleController_1.postArticle);
articleRouter.put('/:articleId', passport_1.default.authenticate('jwt', { session: false }), validationMiddleware_1.validateTransformationOfArticle, confirmValidation_1.default, articleController_1.updateArticle);
articleRouter.delete('/:articleId', passport_1.default.authenticate('jwt', { session: false }), validationMiddleware_1.validateIdParam, confirmValidation_1.default, articleController_1.deleteArticle);
//Unprotected routes
articleRouter.get('/', validationMiddleware_1.validateGetArticles, confirmValidation_1.default, articleController_1.getArticles);
articleRouter.get('/:articleId', validationMiddleware_1.validateIdParam, confirmValidation_1.default, articleController_1.getArticleById);
exports.default = articleRouter;
