"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitialDimensionsOfNames = exports.getInicialDY = exports.formatNames = exports.writeNames = void 0;
const arrayUtils_1 = require("../utils/arrayUtils");
const writeNames = (formattedNames, fontSize, dx, namesDX, namesDY, sickName, lineBreakSize, context) => {
    if (formattedNames.length !== 0) {
        for (let name of formattedNames) {
            // context.font = `500 ${fontSize}px RobotoFlex`;
            context.font = `${fontSize}px Poppins`;
            const fixedName = (0, arrayUtils_1.fixBigStrings)(name);
            context.fillText(fixedName, (dx + namesDX), namesDY);
            namesDY += lineBreakSize;
        }
        formattedNames = [];
    }
    else {
        // context.font = `500 ${fontSize}px RobotoFlex`;
        context.font = `${fontSize}px Poppins`;
        const fixedName = (0, arrayUtils_1.fixBigStrings)(sickName);
        context.fillText(fixedName, (dx + namesDX), namesDY);
    }
};
exports.writeNames = writeNames;
const formatNames = (sickNames, splittedArray, namesDX, namesDY, fontSize) => {
    if (sickNames.length === 1) {
        if (splittedArray.length > 1) {
            splittedArray[1] = (0, arrayUtils_1.getSecondName)(splittedArray);
            splittedArray.length = 2;
            namesDY -= 28;
        }
        else {
            namesDY -= 10;
        }
        fontSize = 37;
        namesDX = 255;
    }
    else if (sickNames.length === 2) {
        if (splittedArray.length > 1) {
            splittedArray[1] = (0, arrayUtils_1.getSecondName)(splittedArray);
            splittedArray.length = 2;
            namesDY += 150;
        }
        else {
            namesDY += 165;
        }
        fontSize = 37;
        namesDX = 255;
    }
    else if (sickNames.length < 10) {
        if (splittedArray.length > 1) {
            splittedArray[1] = (0, arrayUtils_1.getSecondName)(splittedArray);
            splittedArray.length = 2;
            namesDY -= 20;
        }
        else {
            namesDY -= 3;
        }
        namesDX = 225;
        fontSize = 31;
    }
    else if (sickNames.length < 17) {
        if (splittedArray.length > 1) {
            splittedArray[1] = (0, arrayUtils_1.getSecondName)(splittedArray);
            splittedArray.length = 2;
            namesDY -= 19;
        }
        else {
            namesDY -= 7;
        }
        fontSize = 30;
        namesDX = 220;
    }
    else if (sickNames.length < 26) {
        if (splittedArray.length > 1) {
            splittedArray[1] = (0, arrayUtils_1.getSecondName)(splittedArray);
            splittedArray.length = 2;
            namesDY -= 27;
        }
        else {
            namesDY -= 15;
        }
        namesDX = 200;
        fontSize = 26;
    }
    else if (sickNames.length < 31) {
        if (splittedArray.length > 1) {
            splittedArray[1] = (0, arrayUtils_1.getSecondName)(splittedArray);
            splittedArray.length = 2;
            namesDY -= 20;
        }
        else {
            namesDY -= 5;
        }
        namesDX = 198;
        fontSize = 29;
    }
    return {
        formattedNames: splittedArray, namesDX, namesDY, fontSize
    };
};
exports.formatNames = formatNames;
const getInicialDY = (sickNames) => {
    let namesDY;
    if (sickNames.length === 1) {
        namesDY = 640;
    }
    else if (sickNames.length < 10) {
        namesDY = 445;
    }
    else if (sickNames.length < 17) {
        namesDY = 423;
    }
    else {
        namesDY = 365;
    }
    return namesDY;
};
exports.getInicialDY = getInicialDY;
const getInitialDimensionsOfNames = (sickNames) => {
    const namesDX = 220, namesDY = (0, exports.getInicialDY)(sickNames), fontSize = 28;
    const lineBreakSize = sickNames.length > 1 ? 40 : 55;
    return {
        namesDX, namesDY, fontSize, lineBreakSize
    };
};
exports.getInitialDimensionsOfNames = getInitialDimensionsOfNames;
