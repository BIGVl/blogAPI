"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.postComment = void 0;
const commentModel_1 = __importDefault(require("./commentModel"));
const articleModel_1 = __importDefault(require("../article/articleModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const postComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { author, content, parentCommentId } = req.body;
    const createdAt = new Date();
    const { articleId } = req.params;
    const comment = new commentModel_1.default({ author, content, parentComment: parentCommentId, createdAt });
    bcryptjs_1.default.hash(req.ip, 10, (err, hashedUser) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return res.send({ errors: err });
        comment.authorId = hashedUser;
        try {
            const savedComment = yield comment.save();
            const article = yield articleModel_1.default.findById(articleId);
            article === null || article === void 0 ? void 0 : article.comments.push(savedComment._id);
            yield (article === null || article === void 0 ? void 0 : article.save());
            return res.json({ comment });
        }
        catch (err) {
            next(err);
        }
    }));
});
exports.postComment = postComment;
const updateComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorId, content } = req.body;
    const { commentId } = req.params;
    try {
        const comment = yield commentModel_1.default.findOneAndUpdate({ _id: commentId, authorId }, { content });
        if (!comment)
            return res.status(404).send('Comment not found');
        return res.status(200).json({ message: 'Comment updated successfully' });
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});
exports.updateComment = updateComment;
const deleteComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorId } = req.body;
    const { commentId } = req.params;
    try {
        const comment = yield commentModel_1.default.findOneAndDelete({ authorId, _id: commentId });
        if (!comment)
            return res.status(404).send('Comment not found');
        return res.status(200).send('Message deleted successfully.');
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});
exports.deleteComment = deleteComment;
