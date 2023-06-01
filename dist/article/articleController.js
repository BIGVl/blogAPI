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
exports.getArticleById = exports.getArticles = exports.deleteArticle = exports.updateArticle = exports.postArticle = void 0;
const articleModel_1 = __importDefault(require("./articleModel"));
//Post article
const postArticle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, content, published } = req.body;
    const createdAt = new Date();
    const foundArticle = yield articleModel_1.default.findOne({ title });
    if (foundArticle)
        return res.status(400).json({ message: 'The title of the article is already used.' });
    try {
        const newArticle = new articleModel_1.default({ author: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, title, createdAt, content, published, comments: [] });
        yield newArticle.save();
        return res.status(200).json({ message: `Article "${title}" successfully created!` });
    }
    catch (err) {
        return next(err);
    }
});
exports.postArticle = postArticle;
//PUT/Update article
const updateArticle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, published } = req.body;
    const { articleId } = req.params;
    const lastUpdate = new Date();
    try {
        yield articleModel_1.default.findByIdAndUpdate(articleId, {
            title,
            content,
            published,
            lastUpdate
        });
        return res.status(200).json({ message: `Article ${title} updated with success.` });
    }
    catch (err) {
        return next(err);
    }
});
exports.updateArticle = updateArticle;
//Delete an article
const deleteArticle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { articleId } = req.params;
    try {
        const query = yield articleModel_1.default.findByIdAndDelete(articleId);
        console.log(query);
        return res.status(200).json({ message: 'Article deleted .' });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteArticle = deleteArticle;
//Get all articles and filter, sort, paginate
const getArticles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, pageSize, sort, before, after } = req.query;
    const beforeDate = new Date(before);
    const afterDate = new Date(after);
    const projection = {
        _id: 1,
        createdAt: 1,
        author: 1,
        title: 1
    };
    const queryArticle = articleModel_1.default.find({}, projection).populate('author', 'firstName lastName');
    if (page && pageSize) {
        const startIndex = (Number(page) - 1) * Number(pageSize);
        queryArticle.skip(startIndex).limit(Number(pageSize));
    }
    if (sort)
        queryArticle.sort({ createdAt: sort === 'asc' ? 1 : -1 });
    if (before)
        queryArticle.where('createdAt').gte(Number(beforeDate));
    if (after)
        queryArticle.where('createdAt').lte(Number(afterDate));
    try {
        const foundArticles = yield queryArticle.exec();
        return res.status(200).json({ articles: foundArticles });
    }
    catch (err) {
        return next(err);
    }
});
exports.getArticles = getArticles;
//Get one article by it's id
const getArticleById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { articleId } = req.params;
    const article = yield articleModel_1.default.findById(articleId).populate('author', 'firstName lastName').populate('comments');
    if (!article)
        return res.status(404).json({ message: 'Resource not found' });
    return res.status(200).json({ article });
});
exports.getArticleById = getArticleById;
