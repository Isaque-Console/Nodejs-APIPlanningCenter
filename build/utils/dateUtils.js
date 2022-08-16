"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subtractDate = exports.getDayOfTheWeek = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const getDayOfTheWeek = () => {
    const daysOfTheWeek = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
    const indexOfTheWeek = new Date().getDay();
    if (indexOfTheWeek === 0 || indexOfTheWeek === 2)
        return daysOfTheWeek[indexOfTheWeek];
    return "";
};
exports.getDayOfTheWeek = getDayOfTheWeek;
/**
 * @return Must return the difference in weeks between the current date and the day of the week constant
 */
const subtractDate = (dayOfTheWeek) => {
    const now = (0, dayjs_1.default)();
    if (dayOfTheWeek === "Terça-Feira") {
        const tuesdayDate = (0, dayjs_1.default)(process.env.DATE_TERCA);
        const difference = now.diff(tuesdayDate, 'week');
        return difference;
    }
    else if (dayOfTheWeek === "Domingo") {
        const sundayDate = (0, dayjs_1.default)(process.env.DATE_DOMINGO);
        const difference = now.diff(sundayDate, 'week');
        return difference;
    }
    return -1;
};
exports.subtractDate = subtractDate;
