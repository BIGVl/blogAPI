"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const articleController_ts_1 = require("./articleController.ts");
const passport_1 = __importDefault(require("passport"));
const validationMiddleware_ts_1 = require("./validationMiddleware.ts");
const confirmValidation_ts_1 = __importDefault(require("../middleware/confirmValidation.ts"));
const articleRouter = (0, express_1.Router)();
//Protected routes
articleRouter.post('/', passport_1.default.authenticate('jwt', { session: false }), validationMiddleware_ts_1.validateTransformationOfArticle, confirmValidation_ts_1.default, articleController_ts_1.postArticle);
articleRouter.put('/:articleId', passport_1.default.authenticate('jwt', { session: false }), validationMiddleware_ts_1.validateTransformationOfArticle, confirmValidation_ts_1.default, articleController_ts_1.updateArticle);
articleRouter.delete('/:articleId', passport_1.default.authenticate('jwt', { session: false }), validationMiddleware_ts_1.validateIdParam, confirmValidation_ts_1.default, articleController_ts_1.deleteArticle);
//Unprotected routes
articleRouter.get('/', validationMiddleware_ts_1.validateGetArticles, confirmValidation_ts_1.default, articleController_ts_1.getArticles);
articleRouter.get('/:articleId', validationMiddleware_ts_1.validateIdParam, confirmValidation_ts_1.default, articleController_ts_1.getArticleById);
exports.default = articleRouter;
