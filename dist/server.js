"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("./types");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("./router"));
const passport_1 = __importDefault(require("./auth/passport"));
const login_1 = __importDefault(require("./auth/login"));
const articleRouter_1 = __importDefault(require("./article/articleRouter"));
const commentRouter_1 = __importDefault(require("./comment/commentRouter"));
const compression_1 = __importDefault(require("compression"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
// Middleware
app.use((0, compression_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
app.use(passport_1.default.initialize());
//Production settings
app.disable('x-powered-by');
if (process.env.NODE_ENV === 'production') {
    console.log = function () { };
    console.error = function () { };
}
// Mongoose
mongoose_1.default.connect(process.env.MONGODB || 'mongodb://localhost:27017/myapp');
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});
// Routes
app.use('/', router_1.default);
app.use('/auth', login_1.default);
app.use('/articles', articleRouter_1.default);
app.use('/articles/', commentRouter_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    const message = err.message || 'Internal Server Error';
    return res.status(500).json({ error: message });
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
