"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentController_ts_1 = require("./commentController.ts");
const validationMiddleware_ts_1 = require("./validationMiddleware.ts");
const confirmValidation_ts_1 = __importDefault(require("../middleware/confirmValidation.ts"));
const commentRouter = (0, express_1.Router)();
commentRouter.post('/:articleId/comments', validationMiddleware_ts_1.validateCommentBody, confirmValidation_ts_1.default, commentController_ts_1.postComment);
commentRouter.put('/:articleId/comments/:commentId', validationMiddleware_ts_1.validateCommentBody, confirmValidation_ts_1.default, commentController_ts_1.updateComment);
commentRouter.delete('/:articleId/comments/:commentId', validationMiddleware_ts_1.validateCommentToDelete, confirmValidation_ts_1.default, commentController_ts_1.deleteComment);
exports.default = commentRouter;
