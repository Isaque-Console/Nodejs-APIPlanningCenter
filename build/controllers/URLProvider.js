"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateURL = void 0;
const dateUtils_1 = require("../utils/dateUtils");
const generateURL = () => {
    const dayOfTheWeek = (0, dateUtils_1.getDayOfTheWeek)();
    if (dayOfTheWeek === "Terça-Feira") {
        (0, dateUtils_1.subtractDate)("Terça-Feira");
        console.log((0, dateUtils_1.subtractDate)("Terça-Feira"));
    }
    (0, dateUtils_1.subtractDate)("Terça-Feira");
    console.log((0, dateUtils_1.subtractDate)("Terça-Feira"));
    return "Hoje não tem nenhum evento.";
};
exports.generateURL = generateURL;
