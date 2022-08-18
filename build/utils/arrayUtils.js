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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSecondName = exports.fixBigStrings = exports.convertDescriptionToArray = exports.getDescriptionByTitle = void 0;
/**
 * @description filter array of items by title
 *
 * @param request An object that contains event datas
 * @param title The title from activity that i want
 * @returns a string that contains the item description
 */
const getDescriptionByTitle = (request, title) => __awaiter(void 0, void 0, void 0, function* () {
    const description = yield request.data.data.filter((activity) => {
        if (activity) {
            const titleWithoutAccent = activity.attributes.title.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            if (title.includes(titleWithoutAccent)) {
                return activity.attributes.description;
            }
        }
    });
    return description[0].attributes.description;
});
exports.getDescriptionByTitle = getDescriptionByTitle;
const convertDescriptionToArray = (description) => {
    const splittedArray = description.replace(/(\r\n|\n|\r)/gm, "").split("-");
    const arrayOfNames = splittedArray.map(name => name.trim());
    arrayOfNames.shift();
    return arrayOfNames;
};
exports.convertDescriptionToArray = convertDescriptionToArray;
const fixBigStrings = (name) => {
    let fixedString = name;
    if (name.length > 14) {
        fixedString = name.slice(0, 12);
        fixedString += "...";
    }
    return fixedString;
};
exports.fixBigStrings = fixBigStrings;
const getSecondName = (splittedName) => {
    const secondNames = splittedName.slice(1, splittedName.length + 1);
    const secondName = secondNames.join(" ");
    return secondName;
};
exports.getSecondName = getSecondName;
