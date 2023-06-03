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
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../user/userModel"));
const authRouter = (0, express_1.Router)();
//POST Login
authRouter.post('/login', [
    (0, express_validator_1.body)('username', 'The username needs to be between 3-16 characters and alphanumeric only.')
        .trim()
        .isAlphanumeric()
        .isLength({ min: 3, max: 16 })
        .escape(),
    (0, express_validator_1.body)('password', 'The password needs to be at least 8 characters long.').trim().isLength({ min: 8, max: 32 }).escape(),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        const { username, password } = req.body;
        //If validation does not passs
        if (!errors.isEmpty())
            return res.status(400).send({ error: 'Error occured during authentication.' });
        //The user exists
        const user = yield userModel_1.default.findOne({ username });
        if (!user)
            return res.status(400).send({ error: 'The user does not exist.' });
        bcryptjs_1.default.compare(password, user.password, function (error, resolved) {
            if (error)
                return;
            if (!resolved)
                return res.status(400).send({ error: 'The username or password is incorrect.' });
            const SECRET = process.env.SECRET || 'secret';
            const token = jsonwebtoken_1.default.sign({ username, id: user._id }, SECRET, { expiresIn: '1h' });
            return res.cookie('jwt', token, { httpOnly: true, secure: true }).send({ msg: 'You are logged in .' });
        });
    })
]);
exports.default = authRouter;
