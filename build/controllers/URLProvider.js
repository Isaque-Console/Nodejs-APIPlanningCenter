"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateURL = void 0;
const generateURL = () => {
    const daysOfTheWeek = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
    const day = new Date();
    console.log(daysOfTheWeek[day.getDay()]);
};
exports.generateURL = generateURL;
