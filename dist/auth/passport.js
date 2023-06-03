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
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const userModel_ts_1 = __importDefault(require("../user/userModel.ts"));
const secret = process.env.SECRET || 'secret';
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};
passport_1.default.use(new passport_jwt_1.Strategy(opts, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_ts_1.default.findById(payload.id);
    console.log(`payload ${payload.id}`);
    console.log(user);
    if (user) {
        return done(null, user);
    }
    else {
        return done(null, false);
    }
})));
exports.default = passport_1.default;
