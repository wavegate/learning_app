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
exports.socket = void 0;
const express_1 = __importDefault(require("express"));
const UserModel_1 = __importDefault(require("./models/UserModel"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// connect a database
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.connect(process.env.MONGODB_URI);
// listen
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is listening on post ${process.env.PORT}`);
});
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server(server, {
    cors: {
        origin: [
            "https://elegant-cupcake-589d5a.netlify.app",
            "http://localhost:3000",
        ],
        credentials: true,
    },
});
let socket;
exports.socket = socket;
io.on("connection", (iosocket) => {
    exports.socket = socket = iosocket;
});
// set up middleware
app.use((0, cors_1.default)({
    origin: [
        "https://elegant-cupcake-589d5a.netlify.app",
        "http://localhost:3000",
    ],
    credentials: true,
}));
app.use(express_1.default.json());
// add our routes
app.get("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserModel_1.default.find({});
        return res.json({ users: users });
    }
    catch (error) {
        return res.json({ error: error });
    }
}));
app.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield UserModel_1.default.create({ email: "email@email.com", password: "testpassword" });
        socket.emit("new user");
        socket.broadcast.emit("new user");
        return res.json({ message: "User created." });
    }
    catch (error) {
        return res.json({ error: error });
    }
}));
app.delete("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield UserModel_1.default.deleteMany({});
        socket.emit("new user");
        socket.broadcast.emit("new user");
        return res.json({ message: "Users deleted." });
    }
    catch (error) {
        return res.json({ error: error });
    }
}));
app.get("*", (req, res) => {
    return res.json({ message: "Request received and returned." });
});
