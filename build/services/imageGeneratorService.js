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
const writeNamesService_1 = require("./writeNamesService");
// registerFont(path.resolve('../fonts/Poppins-Regular.ttf'), { family: 'Poppins' })
(0, canvas_1.registerFont)(`${__dirname}/../fonts/Poppins-Regular.ttf`, { family: 'Poppins' });
const checkLimitOfColumns = (limitOfColumns, index) => {
    const result = ((index + 1) % limitOfColumns === 0) ? true : false;
    return result;
};
const getDimensionsWhenLineBreak = (dx, dy, verticalProximityStickers, stickersHeight, namesDY, namesDYBase, initialBorder) => {
    dx = initialBorder;
    dy += stickersHeight - verticalProximityStickers;
    namesDY += stickersHeight - verticalProximityStickers;
    namesDYBase = namesDY;
    return { dx, dy, namesDY, namesDYBase };
};
function generateImage(sickNames) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, canvas_1.loadImage)(path_1.default.resolve("./src/assets/wallpaper.png")).then((image) => __awaiter(this, void 0, void 0, function* () {
            canvasConfig_1.context.drawImage(image, 0, 0, 1920, 1080);
            (0, canvas_1.loadImage)(path_1.default.resolve("./src/assets/sticker.png")).then((image) => __awaiter(this, void 0, void 0, function* () {
                sickNames.length = sickNames.length > 30 ? 30 : sickNames.length;
                let { initialBorder, limitOfColumns, dx, dy, stickersWidth, stickersHeight, horizontalProximityStickers, verticalProximityStickers } = (0, writeStickersService_1.getStickersDimensions)(sickNames);
                let { namesDX, namesDY, fontSize, lineBreakSize } = (0, writeNamesService_1.getInitialDimensionsOfNames)(sickNames);
                let namesDYBase = namesDY;
                let splittedArray;
                for (let i = 0; i < sickNames.length; i++) {
                    canvasConfig_1.context.drawImage(image, dx, dy, stickersWidth, stickersHeight);
                    splittedArray = sickNames[i].split(" ");
                    const response = (0, writeNamesService_1.formatNames)(sickNames, splittedArray, namesDX, namesDY, fontSize);
                    const formattedNames = response.formattedNames;
                    namesDX = response.namesDX, namesDY = response.namesDY, fontSize = response.fontSize;
                    (0, writeNamesService_1.writeNames)(formattedNames, fontSize, dx, namesDX, namesDY, sickNames[i], lineBreakSize, canvasConfig_1.context);
                    namesDY = namesDYBase;
                    const isColumnLimit = checkLimitOfColumns(limitOfColumns, i);
                    if (isColumnLimit) {
                        const newDimensions = getDimensionsWhenLineBreak(dx, dy, verticalProximityStickers, stickersHeight, namesDY, namesDYBase, initialBorder);
                        dx = newDimensions.dx;
                        dy = newDimensions.dy;
                        namesDY = newDimensions.namesDY;
                        namesDYBase = newDimensions.namesDY;
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
