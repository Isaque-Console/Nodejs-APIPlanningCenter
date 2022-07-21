"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server = (0, express_1.default)();
const urlPlanningCenter = "https://api.planningcenteronline.com";
const api = axios_1.default.create({
    baseURL: urlPlanningCenter,
    headers: { 'Authorization': `Basic ${process.env.AUTHORIZATION}`,
    }
});
let description;
api.get("services/v2/service_types/963957/plans/59630660/items")
    .then(response => {
    response.data.data.forEach((activity) => {
        if (activity.attributes.title.trim().toLowerCase() === "intercessão") {
            description = activity.attributes.description;
        }
    });
})
    .catch(err => {
    console.error("ops! ocorreu um erro " + err);
});
server.listen(process.env.PORT, () => {
    console.log(`Aplication is running on port ${process.env.PORT}`);
});
