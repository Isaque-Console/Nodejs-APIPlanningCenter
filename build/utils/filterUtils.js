"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDescriptionByTitle = void 0;
/**
 * @description filter array of items by title
 *
 * @param request An object that contains event datas
 * @param title The title from activity that i want
 * @returns a string that contains the item description
 */
const getDescriptionByTitle = (request, title) => {
    const description = request.data.data.filter((activity) => {
        if (activity.attributes.title.trim().toLowerCase() === title) {
            return activity.attributes.description;
        }
    });
    return description[0].attributes.description;
};
exports.getDescriptionByTitle = getDescriptionByTitle;
