"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentController_1 = require("./commentController");
const validationMiddleware_1 = require("./validationMiddleware");
const confirmValidation_1 = __importDefault(require("../middleware/confirmValidation"));
const commentRouter = (0, express_1.Router)();
commentRouter.post('/:articleId/comments', validationMiddleware_1.validateCommentBody, confirmValidation_1.default, commentController_1.postComment);
commentRouter.put('/:articleId/comments/:commentId', validationMiddleware_1.validateCommentBody, confirmValidation_1.default, commentController_1.updateComment);
commentRouter.delete('/:articleId/comments/:commentId', validationMiddleware_1.validateCommentToDelete, confirmValidation_1.default, commentController_1.deleteComment);
exports.default = commentRouter;
