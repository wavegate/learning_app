"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// connect a database
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.connect(process.env.MONGODB_URI);
// set up middleware
app.use(express_1.default.json());
// add our routes
app.get("*", (req, res) => {
    return res.json({ message: "Request received and returned." });
});
// listen
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on post ${process.env.PORT}`);
});
