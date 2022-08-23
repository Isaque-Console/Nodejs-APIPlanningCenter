import { loadImage } from 'canvas'
import { canvas, context } from '../config/canvas/canvasConfig';
import { getStickersDimensions } from './writeStickersService'
import path from 'path';
import { fixBigStrings, getSecondName } from '../utils/arrayUtils';

function writeNames(namesWithWhiteSpace: string[], fontSize: number, dx: number, namesFrontStickers: number, namesDY: number, sickName: string, lineBreakSize: number) {
    if (namesWithWhiteSpace.length !== 0) {
        for (let name of namesWithWhiteSpace) {
            context.font = `500 ${fontSize}px RobotoFlex`;
            const fixedName = fixBigStrings(name);
            context.fillText(fixedName, (dx + namesFrontStickers), namesDY);
            namesDY += lineBreakSize;
        }
        namesWithWhiteSpace = [];
    } else {
        context.font = `500 ${fontSize}px RobotoFlex`;
        const fixedName = fixBigStrings(sickName);
        context.fillText(fixedName, (dx + namesFrontStickers), namesDY);
    }
}

async function generateImage(sickNames: string[]) {
    let namesWithWhiteSpace: string[] = []

    loadImage(path.resolve("./src/assets/wallpaper.png")).then(async (image) => {
        context.drawImage(image, 0, 0, 1920, 1080);

        loadImage(path.resolve("./src/assets/sticker.png")).then(async (image) => {
            // garantir o maximo de 30 nomes
            sickNames.length = sickNames.length > 30 ? 30 : sickNames.length;

            //pegar dimensoes dos adesivos
            let { initialBorder,
                limitOfColumns,
                dx, dy,
                stickersWidth, stickersHeight,
                horizontalProximityStickers, verticalProximityStickers } = getStickersDimensions(sickNames);

            // dimensoes dos nomes
            let namesDX = 220, namesDY = 360, fontSize = 28, namesDYBase;
            const lineBreakSize: number = sickNames.length > 1 ? 40 : 55;

            // atualizar o DY dos nomes de acordo com o tamanho 
            if (sickNames.length === 1) { namesDY = 640; }
            else if (sickNames.length < 10) { namesDY = 445; }
            else if (sickNames.length < 17) { namesDY = 423; }
            else { namesDY = 365; }

            namesDYBase = namesDY;

            for (let i = 0; i < sickNames.length; i++) {
                context.drawImage(image, dx, dy, stickersWidth, stickersHeight);

                if (sickNames.length === 1) {
                    const splittedArray = sickNames[i].split(" ");
                    if (splittedArray.length > 1) {
                        splittedArray[1] = getSecondName(splittedArray);
                        splittedArray.length = 2;
                        namesDY -= 28;
                    } else {
                        namesDY -= 10
                    }
                    namesWithWhiteSpace = splittedArray;
                    fontSize = 37;
                    namesDX = 255;
                }  else if (sickNames.length === 2) {
                    const splittedArray = sickNames[i].split(" ");
                    if (splittedArray.length > 1) {
                        splittedArray[1] = getSecondName(splittedArray);
                        splittedArray.length = 2;
                        namesDY += 150;
                    } else {
                        namesDY += 165;
                    }
                    namesWithWhiteSpace = splittedArray;
                    fontSize = 37;
                    namesDX = 255;
                } else if (sickNames.length < 10) {
                    const splittedArray = sickNames[i].split(" ");
                    if (splittedArray.length > 1) {
                        splittedArray[1] = getSecondName(splittedArray);
                        splittedArray.length = 2;
                        namesDY -= 20;
                    } else {
                        namesDY -= 3;
                    }
                    namesDX = 225;
                    namesWithWhiteSpace = splittedArray;
                    fontSize = 31;
                }
                else if (sickNames.length < 17) {
                    const splittedArray = sickNames[i].split(" ");
                    if (splittedArray.length > 1) {
                        splittedArray[1] = getSecondName(splittedArray);
                        splittedArray.length = 2;
                        namesDY -= 19;
                    } else {
                        namesDY -= 7;
                    }
                    namesWithWhiteSpace = splittedArray;
                    fontSize = 30;
                    namesDX = 220;
                } else if (sickNames.length < 26) {
                    const splittedArray = sickNames[i].split(" ");
                    if (splittedArray.length > 1) {
                        splittedArray[1] = getSecondName(splittedArray);
                        splittedArray.length = 2;
                        namesDY -= 27;
                    } else {
                        namesDY -= 15;
                    }
                    namesDX = 200;
                    fontSize = 26;
                    namesWithWhiteSpace = splittedArray;
                }
                else if (sickNames.length < 31) {
                    const splittedArray = sickNames[i].split(" ");
                    if (splittedArray.length > 1) {
                        splittedArray[1] = getSecondName(splittedArray);
                        splittedArray.length = 2;
                        namesDY -= 20;
                    } else {
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
                } else {
                    if (sickNames.length === 1) { namesDY = 640; }
                }

                dx += stickersWidth - horizontalProximityStickers;
            }
        })
    })

    return canvas;
}

export default generateImage;