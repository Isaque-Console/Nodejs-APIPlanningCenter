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
const canvas_1 = require("canvas");
const canvasConfig_1 = require("../config/canvas/canvasConfig");
const writeStickersService_1 = require("./writeStickersService");
const path_1 = __importDefault(require("path"));
const arrayUtils_1 = require("../utils/arrayUtils");
function writeNames(namesWithWhiteSpace, fontSize, dx, namesFrontStickers, namesDY, sickName, lineBreakSize) {
    if (namesWithWhiteSpace.length !== 0) {
        for (let name of namesWithWhiteSpace) {
            canvasConfig_1.context.font = `500 ${fontSize}px RobotoFlex`;
            const fixedName = (0, arrayUtils_1.fixBigStrings)(name);
            canvasConfig_1.context.fillText(fixedName, (dx + namesFrontStickers), namesDY);
            namesDY += lineBreakSize;
        }
        namesWithWhiteSpace = [];
    }
    else {
        canvasConfig_1.context.font = `500 ${fontSize}px RobotoFlex`;
        const fixedName = (0, arrayUtils_1.fixBigStrings)(sickName);
        canvasConfig_1.context.fillText(fixedName, (dx + namesFrontStickers), namesDY);
    }
}
function generateImage(sickNames) {
    return __awaiter(this, void 0, void 0, function* () {
        let namesWithWhiteSpace = [];
        (0, canvas_1.loadImage)(path_1.default.resolve("./src/assets/wallpaper.png")).then((image) => __awaiter(this, void 0, void 0, function* () {
            canvasConfig_1.context.drawImage(image, 0, 0, 1920, 1080);
            (0, canvas_1.loadImage)(path_1.default.resolve("./src/assets/sticker.png")).then((image) => __awaiter(this, void 0, void 0, function* () {
                // garantir o maximo de 30 nomes
                sickNames.length = sickNames.length > 30 ? 30 : sickNames.length;
                const lineBreakSize = sickNames.length > 1 ? 40 : 55;
                //pegar dimensoes dos adesivos
                let { initialBorder, limitOfColumns, dx, dy, stickersWidth, stickersHeight, horizontalProximityStickers, verticalProximityStickers } = (0, writeStickersService_1.getStickersDimensions)(sickNames);
                // dimensoes dos nomes
                let namesDX = 220, namesDY = 360, fontSize = 28, namesDYBase;
                // atualizar o DY dos nomes de acordo com o tamanho 
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
                namesDYBase = namesDY;
                for (let i = 0; i < sickNames.length; i++) {
                    canvasConfig_1.context.drawImage(image, dx, dy, stickersWidth, stickersHeight);
                    // Escrever os nomes
                    if (sickNames.length === 1) {
                        const splittedArray = sickNames[i].split(" ");
                        if (splittedArray.length > 1) {
                            splittedArray[1] = (0, arrayUtils_1.getSecondName)(splittedArray);
                            splittedArray.length = 2;
                            namesDY -= 19;
                        }
                        else {
                            namesDY -= 10;
                        }
                        namesWithWhiteSpace = splittedArray;
                        fontSize = 37;
                        namesDX = 255;
                    }
                    else if (sickNames.length < 10) {
                        const splittedArray = sickNames[i].split(" ");
                        if (splittedArray.length > 1) {
                            splittedArray[1] = (0, arrayUtils_1.getSecondName)(splittedArray);
                            splittedArray.length = 2;
                            namesDY -= 20;
                        }
                        else {
                            namesDY -= 11;
                        }
                        namesDX = 225;
                        namesWithWhiteSpace = splittedArray;
                        fontSize = 31;
                    }
                    else if (sickNames.length < 17) {
                        const splittedArray = sickNames[i].split(" ");
                        if (splittedArray.length > 1) {
                            splittedArray[1] = (0, arrayUtils_1.getSecondName)(splittedArray);
                            splittedArray.length = 2;
                            namesDY -= 19;
                        }
                        else {
                            namesDY -= 10;
                        }
                        namesWithWhiteSpace = splittedArray;
                        fontSize = 30;
                        namesDX = 220;
                    }
                    else if (sickNames.length < 26) {
                        const splittedArray = sickNames[i].split(" ");
                        if (splittedArray.length > 1) {
                            splittedArray[1] = (0, arrayUtils_1.getSecondName)(splittedArray);
                            splittedArray.length = 2;
                            namesDY -= 27;
                        }
                        else {
                            namesDY -= 18;
                        }
                        namesDX = 200;
                        fontSize = 26;
                        namesWithWhiteSpace = splittedArray;
                    }
                    else if (sickNames.length < 31) {
                        const splittedArray = sickNames[i].split(" ");
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
                        namesWithWhiteSpace = splittedArray;
                    }
                    writeNames(namesWithWhiteSpace, fontSize, dx, namesDX, namesDY, sickNames[i], lineBreakSize);
                    namesDY = namesDYBase;
                    if ((i + 1) % limitOfColumns === 0) {
                        dx = initialBorder;
                        dy += stickersHeight - verticalProximityStickers;
                        namesDY += stickersHeight - verticalProximityStickers;
                        namesDYBase = namesDY;
                        continue;
                    }
                    else {
                        if (sickNames.length === 1) {
                            namesDY = 640;
                        }
                    }
                    dx += stickersWidth - horizontalProximityStickers;
                }
            }));
        }));
        return canvasConfig_1.canvas;
    });
}
exports.default = generateImage;
