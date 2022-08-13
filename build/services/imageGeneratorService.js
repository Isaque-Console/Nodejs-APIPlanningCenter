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
const writeStickersService_1 = require("./writeStickersService");
const path_1 = __importDefault(require("path"));
// É como se fosse a prancheta que vamos desenhar, deve ter o tamanho final desejado para sua imagem
const canvas = (0, canvas_1.createCanvas)(1920, 1080);
const context = canvas.getContext('2d');
context.quality = 'best';
context.fillStyle = '#000000';
context.textAlign = "center";
function generateImage(sickNames) {
    return __awaiter(this, void 0, void 0, function* () {
        let bigNames = [];
        (0, canvas_1.loadImage)(path_1.default.resolve("./src/assets/wallpaper.png")).then((image) => __awaiter(this, void 0, void 0, function* () {
            context.drawImage(image, 0, 0, 1920, 1080);
            (0, canvas_1.loadImage)(path_1.default.resolve("./src/assets/sticker.png")).then((image) => __awaiter(this, void 0, void 0, function* () {
                // garantir o maximo de 30 nomes
                sickNames.length = sickNames.length > 30 ? 30 : sickNames.length;
                //pegar dimensoes dos adesivos
                let { initialBorder, limitOfColumns, dx, dy, stickersWidth, stickersHeight, horizontalProximityStickers, verticalProximityStickers } = (0, writeStickersService_1.getStickersDimensions)(sickNames);
                // dimensoes dos nomes
                let namesFrontStickers = 220, namesDY = 360, fontSize = 28, namesDYBase;
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
                    context.drawImage(image, dx, dy, stickersWidth, stickersHeight);
                    // Escrever os nomes
                    if (sickNames.length === 1) {
                        namesFrontStickers = 255;
                        if (sickNames[i].length < 15) {
                            fontSize = 37;
                        }
                        else {
                            const splittedArray = sickNames[i].split(" ");
                            // Ex: "fulano de araújo 
                            if (splittedArray.length > 2) {
                                splittedArray[1] += " " + splittedArray[2];
                                splittedArray.pop();
                                bigNames = splittedArray;
                                fontSize = 37;
                                namesDY -= 19;
                                namesFrontStickers = 255;
                            }
                            else {
                                // Ex: Fulano Araújo
                                bigNames = splittedArray;
                                fontSize = 37;
                                namesDY -= 19;
                                namesFrontStickers = 255;
                            }
                        }
                    }
                    else if (sickNames.length < 10) {
                        namesFrontStickers = 255;
                        if (sickNames[i].length < 15) {
                            fontSize = 37;
                            namesDY += 170;
                        }
                        else {
                            const splittedArray = sickNames[i].split(" ");
                            // Ex: "fulano de araújo 
                            if (splittedArray.length > 2) {
                                splittedArray[1] += " " + splittedArray[2];
                                splittedArray.pop();
                                bigNames = splittedArray;
                                fontSize = 37;
                                namesDY += 160;
                                namesFrontStickers = 255;
                            }
                            else {
                                // Ex: Fulano Araújo
                                bigNames = splittedArray;
                                fontSize = 37;
                                namesDY += 160;
                                namesFrontStickers = 255;
                            }
                        }
                    }
                    else if (sickNames.length < 17) {
                        if (sickNames[i].length < 15) {
                            namesFrontStickers = 220;
                            fontSize = 32;
                        }
                        else if (sickNames[i].length === 15 || sickNames[i].length === 16) {
                            namesFrontStickers = 223;
                            fontSize = 30;
                        }
                        else {
                            const splittedArray = sickNames[i].split(" ");
                            // Ex: "fulano de araújo 
                            if (splittedArray.length > 2) {
                                splittedArray[1] += " " + splittedArray[2];
                                splittedArray.pop();
                                bigNames = splittedArray;
                                fontSize = 30;
                                namesDY -= 19;
                                namesFrontStickers = 220;
                            }
                            else {
                                // Ex: Fulano Araújo
                                bigNames = splittedArray;
                                fontSize = 30;
                                namesDY -= 19;
                                namesFrontStickers = 220;
                            }
                        }
                    }
                    else if (sickNames.length < 26) {
                        const splittedArray = sickNames[i].split(" ");
                        // Ex: "fulano de araújo 
                        if (splittedArray.length > 2) {
                            splittedArray[1] += " " + splittedArray[2];
                            splittedArray.pop();
                            bigNames = splittedArray;
                            fontSize = 30;
                            namesDY -= 27;
                            namesFrontStickers = 220;
                        }
                        else {
                            // Ex: Fulano Araújo
                            bigNames = splittedArray;
                            fontSize = 30;
                            namesDY -= 27;
                            namesFrontStickers = 220;
                        }
                        namesFrontStickers = 200;
                        fontSize = 28;
                    }
                    else if (sickNames.length < 31) {
                        namesFrontStickers = 197;
                        if (sickNames[i].length > 14) {
                            const splittedArray = sickNames[i].split(" ");
                            // Ex: "fulano de araújo 
                            if (splittedArray.length > 2) {
                                splittedArray[1] += " " + splittedArray[2];
                                splittedArray.pop();
                                bigNames = splittedArray;
                                fontSize = 30;
                                namesDY -= 20;
                                namesFrontStickers = 198;
                            }
                            else if (splittedArray.length === 2) {
                                // Ex: Fulano Araújo
                                bigNames = splittedArray;
                                fontSize = 30;
                                namesDY -= 20;
                                namesFrontStickers = 198;
                            }
                            else {
                                fontSize = 28;
                            }
                        }
                        else {
                            fontSize = 32;
                        }
                    }
                    if (bigNames.length !== 0) {
                        for (let name of bigNames) {
                            context.font = `${fontSize}px Mont Serrat`;
                            context.fillText(name, (dx + namesFrontStickers), namesDY);
                            namesDY += 40;
                        }
                        bigNames = [];
                    }
                    else {
                        context.font = `${fontSize}px Mont Serrat`;
                        context.fillText(sickNames[i], (dx + namesFrontStickers), namesDY);
                    }
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
        return canvas;
    });
}
exports.default = generateImage;
