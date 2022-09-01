"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateURL = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const dateUtils_1 = require("../utils/dateUtils");
const todaysServiceTypeGenerator = () => {
    let serviceType = "";
    const dayOfTheWeek = (0, dateUtils_1.getDayOfTheWeek)();
    if (!dayOfTheWeek.length)
        return "";
    // Quarta-feira esta sendo levado em consideracao, pois o horario do servidor no heroku e diferente e pode acusar esse dia, ao inves de terca, dependendo do horario
    if (dayOfTheWeek === "Terça-Feira" || dayOfTheWeek === "Quarta-Feira") {
        serviceType = "CULTO_DE_ENSINO";
    }
    else if (dayOfTheWeek === "Domingo") {
        // hora atual -3, pois o horario do servidor no heroku esta 3 horas adiantado em relacao ao horario do Brasil
        serviceType = ((0, dayjs_1.default)().hour() - 3) > 14 ? "DOMINGO_NOITE" : "DOMINGO_MANHA";
    }
    return serviceType;
};
const todaysPlanIdGenerator = (todaysServiceType) => {
    const dayOfTheWeek = (0, dateUtils_1.getDayOfTheWeek)();
    if (!dayOfTheWeek.length)
        return 0;
    const diffenrenceInWeeks = (0, dateUtils_1.subtractDate)(dayOfTheWeek);
    if (diffenrenceInWeeks === -1)
        return diffenrenceInWeeks;
    const planId = process.env[`PLAN_ID_${todaysServiceType}`] ? process.env[`PLAN_ID_${todaysServiceType}`] : "0";
    const todaysPlanId = diffenrenceInWeeks + Number(planId);
    return todaysPlanId;
};
const generateURL = () => {
    const serviceType = todaysServiceTypeGenerator();
    const todaysPlanId = todaysPlanIdGenerator(serviceType);
    if (!serviceType.length || todaysPlanId === -1)
        return "Hoje não tem nenhum evento.";
    return `/services/v2/service_types/${process.env[`SERVICE_TYPE_${serviceType}`]}/plans/${todaysPlanId}/items`;
};
exports.generateURL = generateURL;
