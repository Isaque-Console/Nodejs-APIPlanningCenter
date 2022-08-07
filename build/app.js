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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const base_api_planningCenter_1 = require("./services/base.api.planningCenter");
const URLProvider_1 = require("./services/URLProvider");
const server = (0, express_1.default)();
(() => __awaiter(void 0, void 0, void 0, function* () {
    const url = yield (0, URLProvider_1.generateURL)();
    (0, base_api_planningCenter_1.getDescription)(url);
}))();
server.listen(process.env.PORT, () => {
    console.log(`Aplication is running on port ${process.env.PORT}`);
});
