"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseAPI = void 0;
const axios_1 = __importDefault(require("axios"));
const urlBase = "https://api.planningcenteronline.com";
exports.baseAPI = axios_1.default.create({
    baseURL: urlBase,
    headers: { 'Authorization': `Basic ${process.env.AUTHORIZATION}`,
    }
});
exports.default = exports.baseAPI;
